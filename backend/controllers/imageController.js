const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");
const { generateImageCaption } = require("../services/imageAIService");

// 🔥 UPLOAD IMAGE + AI CAPTION
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "gallery-app",
    });

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
    });

    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json("Upload failed");
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