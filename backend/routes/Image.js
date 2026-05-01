const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const imageController = require("../controllers/imageController");
const fetch = require("node-fetch");

router.get("/proxy", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "No URL provided" });
    const response = await fetch(url);
    const buffer = await response.buffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";
    res.set("Content-Type", contentType);
    res.set("Access-Control-Allow-Origin", "*");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed" });
  }
});

router.post("/save-meta", imageController.saveMeta);         // ← new
router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/search", imageController.searchImages);
router.put("/:id", upload.single("image"), imageController.updateImage);
router.get("/:userId", imageController.getUserImages);
router.delete("/:id", imageController.deleteImage);

module.exports = router;