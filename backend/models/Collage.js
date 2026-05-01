const mongoose = require("mongoose");

const collageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    default: "Untitled Collage"
  },
  // Array of Cloudinary image URLs (max 4 for your 2x2 grid)
  photos: {
    type: [String],
    validate: v => v.length <= 4,
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.models.Collage || mongoose.model("Collage", collageSchema);