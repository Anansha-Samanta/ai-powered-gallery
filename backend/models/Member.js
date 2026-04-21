// models/Member.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  aboutProject: {
    type: String,
    default: '',
  },
  hobbies: {
    type: [String],   // stored as array; split on comma before saving
    default: [],
  },
  certificate: {
    type: String,
    default: '',
  },
  internship: {
    type: String,
    default: '',
  },
  aboutYourAim: {
    type: String,
    default: '',
  },
  profileImage: {
    type: String,   // filename stored; served from /uploads/
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);