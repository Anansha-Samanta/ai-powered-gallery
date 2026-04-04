const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  imageIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image"
  }],

  coverImage: {
    type: String,
    default: ""
  }

}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);