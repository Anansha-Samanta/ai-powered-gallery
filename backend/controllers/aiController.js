const cloudinary = require("../config/cloudinary");
const ChatMessage = require("../models/ChatMessage");
const Image = require("../models/Image");
const { generateImage } = require("../services/huggingfaceService");
const { generateTagsFromImage } = require("../services/tagService");

const uploadBase64ToCloudinary = (base64DataUrl) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      base64DataUrl,
      { folder: "ai-generated", timeout: 120000 },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
  });
};

// ── GENERATE — return raw image only, nothing saved anywhere
exports.generateAndSave = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const imageDataUrl = await generateImage(prompt);
    return res.json({ result: imageDataUrl, saved: false });
  } catch (err) {
    console.error("❌ HUGGINGFACE ERROR:", err.message);
    const fallback = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/512`;
    return res.json({ result: fallback, saved: false });
  }
};

// ── SAVE — only called when user clicks Save button
// Uploads to Cloudinary, saves to Image table (so home gallery sees it),
// and saves chat messages with the final Cloudinary URL
exports.saveImageToGallery = async (req, res) => {
  const { userId, imageUrl, prompt } = req.body;
  if (!userId || !imageUrl) {
    return res.status(400).json({ error: "userId and imageUrl required" });
  }

  try {
    // Upload to Cloudinary (first and only time this happens)
    const cloudResult = await uploadBase64ToCloudinary(imageUrl);
    const finalUrl = cloudResult.secure_url;
    const finalPublicId = cloudResult.public_id;

    // ✅ Save to Image table — this is what home gallery reads
    const image = await Image.create({
      userId,
      imageUrl: finalUrl,
      publicId: finalPublicId,
      title: prompt || "AI Generated",
      aiCaption: "Processing...",
      tags: ["ai-generated"],
    });

    // Save chat messages now that we have a permanent URL
    await ChatMessage.insertMany([
      { userId, role: "user", text: prompt || "" },
      { userId, role: "ai", imageUrl: finalUrl, prompt: prompt || "" },
    ]);

    // Background: generate AI tags
    setImmediate(async () => {
      try {
        const { caption, tags } = await generateTagsFromImage(finalUrl);
        await Image.findByIdAndUpdate(image._id, {
          aiCaption: caption || "AI generated image",
          tags: [...new Set(["ai-generated", ...tags])],
        });
      } catch (e) {
        console.error("Background tag gen failed:", e.message);
      }
    });

    res.json({ _id: image._id, imageUrl: finalUrl });

  } catch (err) {
    console.error("saveImageToGallery failed:", err.message);
    res.status(500).json({ error: "Save failed" });
  }
};

// ── GET CHAT HISTORY
exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId required" });
    const messages = await ChatMessage.find({ userId })
      .sort({ createdAt: 1 }).lean();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};

// ── CLEAR CHAT HISTORY
exports.clearChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    await ChatMessage.deleteMany({ userId });
    res.json({ message: "Chat history cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear history" });
  }
};