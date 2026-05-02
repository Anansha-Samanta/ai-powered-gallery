// routes/ai.js
const express = require("express");
const router = express.Router();

const { generateAndSave, getChatHistory, clearChatHistory, saveImageToGallery } = require("../controllers/aiController");

console.log("AI FILE LOADED (HUGGINGFACE SDXL)");
router.use((req, res, next) => {
  console.log("AI ROUTER HIT:", req.method, req.url);
  next();
});

// POST /api/ai/generate — generate image, save to Cloudinary + DB, save chat msgs
router.post("/generate", generateAndSave);

// POST /api/ai/save-image — manually save an image to gallery
router.post("/save-image", saveImageToGallery);

// GET /api/ai/history/:userId — fetch full chat history with timestamps
router.get("/history/:userId", getChatHistory);

// DELETE /api/ai/history/:userId — clear all chat history for user
router.delete("/history/:userId", clearChatHistory);

module.exports = router;
