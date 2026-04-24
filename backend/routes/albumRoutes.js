const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const Image = require("../models/image");

// GET /api/albums?userId=xxx
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const albums = await Album.find({ userId })
      .populate("images", "imageUrl title aiCaption")
      .sort({ createdAt: -1 });

    res.json(albums);
  } catch (err) {
    console.error("Fetch albums error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/albums/:id
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate("images");

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (err) {
    console.error("Fetch album error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/albums
router.post("/", async (req, res) => {
  try {
    const { title, imageIds, userId } = req.body;
    console.log("Creating album:", { title, imageIds, userId });

    if (!userId) return res.status(400).json({ message: "userId required" });

    const images = await Image.find({
      _id: { $in: imageIds || [] }
    });
    console.log("Found images:", images.length);

    const album = await Album.create({
      userId,
      title: title || "Untitled Album",
      images: images.map(img => img._id),
      coverImage: images[0]?.imageUrl || ""
    });

    res.status(201).json(album);
  } catch (err) {
    console.error("Create album error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/albums/:id
router.patch("/:id", async (req, res) => {
  try {
    const { title, addImageIds, removeImageIds } = req.body;

    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });

    if (title !== undefined) album.title = title;

    if (addImageIds?.length) {
      const toAdd = await Image.find({ _id: { $in: addImageIds } });
      const newIds = toAdd.map(img => img._id.toString());
      const existing = album.images.map(id => id.toString());
      album.images = [
        ...album.images,
        ...newIds.filter(id => !existing.includes(id))
      ];
    }

    if (removeImageIds?.length) {
      album.images = album.images.filter(
        id => !removeImageIds.includes(id.toString())
      );
    }

    if (album.images.length > 0) {
      const firstImg = await Image.findById(album.images[0]);
      album.coverImage = firstImg?.imageUrl || "";
    } else {
      album.coverImage = "";
    }

    await album.save();
    res.json(album);
  } catch (err) {
    console.error("Update album error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/albums/:id
router.delete("/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ message: "Album not found" });
    res.json({ message: "Album deleted" });
  } catch (err) {
    console.error("Delete album error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;