const Collage = require("../models/Collage");

// POST /api/collages
exports.createCollage = async (req, res) => {
  try {
    const { userId, title, photos } = req.body;

    if (!userId) return res.status(400).json({ message: "userId required" });
    if (!photos || photos.length === 0)
      return res.status(400).json({ message: "At least one photo required" });
    if (photos.length > 4)
      return res.status(400).json({ message: "Max 4 photos allowed" });

    const collage = await Collage.create({
      userId,
      title: title || "Untitled Collage",
      photos,
    });

    res.status(201).json({ message: "Collage saved successfully", id: collage._id });
  } catch (err) {
    console.error("Create collage error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/collages?userId=xxx
exports.getUserCollages = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const collages = await Collage.find({ userId }).sort({ createdAt: -1 });
    res.json(collages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/collages/:id
exports.getCollageById = async (req, res) => {
  try {
    const collage = await Collage.findById(req.params.id);
    if (!collage) return res.status(404).json({ message: "Collage not found" });
    res.json(collage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/collages/:id
exports.updateCollage = async (req, res) => {
  try {
    const { title, photos } = req.body;
    if (photos && photos.length > 4)
      return res.status(400).json({ message: "Max 4 photos allowed" });

    const collage = await Collage.findByIdAndUpdate(
      req.params.id,
      { ...(title && { title }), ...(photos && { photos }) },
      { new: true }
    );
    if (!collage) return res.status(404).json({ message: "Collage not found" });
    res.json(collage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/collages/:id
exports.deleteCollage = async (req, res) => {
  try {
    const collage = await Collage.findByIdAndDelete(req.params.id);
    if (!collage) return res.status(404).json({ message: "Collage not found" });
    res.json({ message: "Collage deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};