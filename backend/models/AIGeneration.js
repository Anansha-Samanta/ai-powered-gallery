// models/AIGeneration.js  (updated — replaces your existing one)
const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    prompt: String,
    generatedImageUrl: String,
    publicId: String,          // Cloudinary public_id for future deletion
  },
  { timestamps: true }
);

module.exports = mongoose.models.AIGeneration || mongoose.model("AIGeneration", aiSchema);
