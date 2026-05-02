const express = require("express");
const router = express.Router();
 
// ✅ Using Hugging Face free SDXL API
const { generateImage } = require("../services/huggingfaceService");
 
console.log("AI FILE LOADED (HUGGINGFACE SDXL)");
 
router.post("/generate", async (req, res) => {
  console.log("🚀 HuggingFace AI HIT");
 
  const prompt = req.body?.prompt;
 
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
 
  try {
    console.log("🧠 Prompt:", prompt);
 
    const imageDataUrl = await generateImage(prompt);
 
    console.log("✅ IMAGE READY");
 
    return res.json({ result: imageDataUrl });
  } catch (err) {
    console.error("❌ HUGGINGFACE ERROR:", err.message);
 
    // Fallback: return a placeholder (still keeps UI working)
    const fallback = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/512`;
    console.log("⚠️ Using fallback image");
 
    return res.json({ result: fallback });
  }
});
 
module.exports = router;
 