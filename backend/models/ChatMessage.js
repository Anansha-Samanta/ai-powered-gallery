// models/ChatMessage.js
const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    // For user messages
    text: {
      type: String,
      default: "",
    },
    // For AI messages
    imageUrl: {
      type: String,
      default: "",
    },
    prompt: {
      type: String,
      default: "",
    },
    // Links to the AIGeneration document
    generationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIGeneration",
      default: null,
    },
    // Groups user msg + AI response together
    sessionId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);
