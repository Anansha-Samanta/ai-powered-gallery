// routes/members.js
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const Member  = require('../models/Member');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// POST /api/members
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      name, rollNumber, year, degree,
      aboutProject, hobbies, certificate,
      internship, aboutYourAim,
    } = req.body;

    const member = await Member.create({
      name, rollNumber, year, degree,
      aboutProject, certificate, internship, aboutYourAim,
      hobbies: hobbies ? hobbies.split(',').map(h => h.trim()) : [],
      profileImage: req.file ? req.file.filename : null,
    });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// GET /api/members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/members/:id
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;