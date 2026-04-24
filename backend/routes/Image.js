const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

// 🔥 import full controller (safe way)
const imageController = require("../controllers/imageController");

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/search", imageController.searchImages);
router.get("/:userId", imageController.getUserImages);
router.delete("/:id", imageController.deleteImage);

module.exports = router;