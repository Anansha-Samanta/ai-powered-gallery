const mongoose = require("mongoose");

const editSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  originalImageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  },

  editedImageUrl: String,

  editType: [String]

}, { timestamps: true });

module.exports = mongoose.models.Edit || mongoose.model("Edit", editSchema);


