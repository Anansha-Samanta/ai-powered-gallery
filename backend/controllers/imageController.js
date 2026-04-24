const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const { generateImageCaption } = require("../services/imageAIService");
const { generateTagsFromImage } = require("../services/tagService");
// 🔥 UPLOAD IMAGE + AI CAPTION
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "gallery-app",
    });

    const { caption: initialCaption, tags } = await generateTagsFromImage(result.secure_url);

    const imageUrl = result.secure_url;

    // 🤖 AI caption (with debug)
    let caption = "";
    try {
      caption = await generateImageCaption(imageUrl);
      console.log("AI Caption:", caption);
    } catch (aiErr) {
      console.error("AI ERROR:", aiErr.message);
    }

    // 💾 Save to DB
    const image = await Image.create({
      userId: req.body.userId,
      imageUrl: imageUrl,
      publicId: result.public_id,
      title: req.body.title,
      aiCaption: caption || "No caption generated",
      tags: tags,
    });

    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json("Upload failed");
  }
};


// GET /api/images/search?userId=xxx&q=flower
exports.searchImages = async (req, res) => {
  try {
    const { userId, q } = req.query;
    if (!userId || !q) return res.status(400).json({ message: "userId and q required" });

    const searchTerm = q.toLowerCase().trim();

    const images = await Image.find({
      userId,
      $or: [
        { tags: { $in: [searchTerm] } },             // exact tag match
        { tags: { $regex: searchTerm, $options: "i" } }, // partial tag match
        { aiCaption: { $regex: searchTerm, $options: "i" } }, // caption match
        { title: { $regex: searchTerm, $options: "i" } },     // title match
      ]
    }).sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// 🗑️ DELETE IMAGE  (✅ MUST EXIST)
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json("Image not found");
    }

    await cloudinary.uploader.destroy(image.publicId);
    await Image.findByIdAndDelete(id);

    res.json("Image deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json("Delete failed");
  }
};

// 📂 GET USER IMAGES  (✅ MUST EXIST — EXACT NAME)
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