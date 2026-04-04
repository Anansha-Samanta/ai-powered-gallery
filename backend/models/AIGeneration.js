const mongoose = require("mongoose");

const aiSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  prompt: String,

  generatedImageUrl: String,

}, { timestamps: true });

module.exports = mongoose.model("AIGeneration", aiSchema);