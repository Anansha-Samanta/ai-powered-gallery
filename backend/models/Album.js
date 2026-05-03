const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    default: "Untitled Album"
  },
  images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }],
  coverImage: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.models.Album || mongoose.model("Album", albumSchema);
