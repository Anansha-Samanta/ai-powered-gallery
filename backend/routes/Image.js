const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadImage, getUserImages } = require("../controllers/imageController");
const { deleteImage } = require("../controllers/imageController");

router.delete("/:id", deleteImage);
router.post("/upload", upload.single("image"), uploadImage);
router.get("/:userId", getUserImages);

module.exports = router;