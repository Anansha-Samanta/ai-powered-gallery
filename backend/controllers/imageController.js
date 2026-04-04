const cloudinary = require("../config/cloudinary");
const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "gallery-app",
    });

    const image = await Image.create({
      userId: req.body.userId,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      title: req.body.title,
    });

    res.json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json("Upload failed");
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Image.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json("Image not found");
    }

    res.json("Image deleted successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json(err.message);
  }
};