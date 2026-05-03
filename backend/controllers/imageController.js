const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const { generateTagsFromImage } = require("../services/tagService");
const streamifier = require("streamifier");

// ── Cloudinary upload via stream (no base64 bloat) ──────────────────────────
const uploadToCloudinary = (buffer, retries = 3) => {
  const attempt = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "gallery-app",
          timeout: 120000,
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

  const retry = async (n) => {
    try {
      return await attempt();
    } catch (err) {
      console.error(`Cloudinary attempt ${4 - n} failed:`, err.message);
      if (n <= 1) throw err;
      await new Promise(res => setTimeout(res, 2000));
      return retry(n - 1);
    }
  };

  return retry(retries);
};

// ── UPLOAD IMAGE ─────────────────────────────────────────────────────────────
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadToCloudinary(file.buffer);
    const imageUrl = result.secure_url;

    const quickTags = (req.body.title || file.originalname || "")
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/[\s_-]+/)
      .filter(w => w.length > 2);

    const image = await Image.create({
      userId: req.body.userId,
      imageUrl,
      publicId: result.public_id,
      title: req.body.title,
      aiCaption: "Processing...",
      tags: quickTags,
    });

    res.json(image);

setImmediate(async () => {
  try {
    const { caption, tags } = await generateTagsFromImage(imageUrl);

    // if AI returned tags, use them; otherwise fall back to quickTags
    const finalTags = tags.length > 0
      ? [...new Set([...tags, ...quickTags])]
      : quickTags;

    await Image.findByIdAndUpdate(image._id, {
      aiCaption: caption || "No caption",
      tags: finalTags,
    });
    console.log("✅ AI tags saved:", finalTags);
  } catch (err) {
    console.error("Background AI failed:", err.message);
  }
});

  } catch (err) {
    console.error("Upload failed:", err.message);
    res.status(500).json({ error: "Upload failed, please try again" });
  }
};

exports.saveMeta = async (req, res) => {
  try {
    const { userId, imageUrl, publicId, title } = req.body;

    const quickTags = (title || "")
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(/[\s_-]+/)
      .filter(w => w.length > 2);

    const image = await Image.create({
      userId,
      imageUrl,
      publicId,
      title: title || "",
      aiCaption: "Processing...",
      tags: quickTags,
    });

    res.json(image);

    setImmediate(async () => {
      try {
        const { caption, tags } = await generateTagsFromImage(imageUrl);
        const allTags = [...new Set([...quickTags, ...tags])];
        await Image.findByIdAndUpdate(image._id, {
          aiCaption: caption || "No caption",
          tags: allTags,
        });
        console.log("✅ AI tags saved:", allTags);
      } catch (err) {
        console.error("Background AI failed:", err.message);
      }
    });

  } catch (err) {
    console.error("saveMeta failed:", err.message);
    res.status(500).json({ error: "Save failed" });
  }
};

// ── UPDATE IMAGE (save edited) ───────────────────────────────────────────────
exports.updateImage = async (req, res) => {
  try {
    console.log("📝 updateImage called, id:", req.params.id);
    console.log("📁 file received:", req.file ? `${req.file.size} bytes` : "NO FILE");

    const { id } = req.params;

    if (!req.file) return res.status(400).json({ error: "No file received" });

    const image = await Image.findById(id);
    console.log("🔍 image found:", image ? "yes" : "NO");
    if (!image) return res.status(404).json({ error: "Image not found" });

    console.log("🗑️ deleting old cloudinary:", image.publicId);
    await cloudinary.uploader.destroy(image.publicId);

    console.log("⬆️ uploading new image...");
    const result = await uploadToCloudinary(req.file.buffer);
    console.log("✅ upload done:", result.secure_url);

    const updated = await Image.findByIdAndUpdate(
      id,
      {
        imageUrl: result.secure_url,
        publicId: result.public_id,
        isEdited: true,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update failed:", err.message);
    res.status(500).json({ error: "Update failed" });
  }
};

// ── SEARCH IMAGES ────────────────────────────────────────────────────────────
exports.searchImages = async (req, res) => {
  try {
    const { userId, q } = req.query;
    if (!userId || !q) return res.json([]);

    const searchTerm = q.toLowerCase().trim();

    const images = await Image.find({
      userId,
      $or: [
        { tags: { $in: [searchTerm] } },
        { tags: { $regex: searchTerm, $options: "i" } },
        { aiCaption: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

// ── DELETE IMAGE ─────────────────────────────────────────────────────────────
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // ← validate ObjectId format before querying
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json("Invalid image ID");
    }

    const image = await Image.findById(id);
    if (!image) return res.status(404).json("Image not found");

    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(id);

    res.json("Image deleted successfully");
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json("Delete failed");
  }
};

// ── GET USER IMAGES ──────────────────────────────────────────────────────────
exports.getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};