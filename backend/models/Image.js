const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  imageUrl: {
    type: String,
    required: true
  },

  publicId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: ""
  },

  tags: {
    type: [String],
    default: []
  },

  // 🔥 USE THIS FOR AI CAPTION
  aiCaption: {
    type: String,
    default: ""
  },

  isEdited: {
    type: Boolean,
    default: false
  },

  originalImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null
  }

}, { timestamps: true });

// indexes for performance
imageSchema.index({ tags: 1 });
imageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Image", imageSchema);