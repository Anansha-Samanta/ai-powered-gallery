
const express = require("express");
const router = express.Router();

// 🔥 BACK TO REPLICATE
const { generateImage } = require("../services/replicateService");

console.log("AI FILE LOADED (REPLICATE)");

router.post("/generate", async (req, res) => {
  console.log("🚀 REPLICATE AI HIT");

  const prompt = req.body?.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("🧠 Prompt:", prompt);

    const imageUrl = await generateImage(prompt);

    console.log("✅ IMAGE URL:", imageUrl);

    return res.json({ result: imageUrl });

  } catch (err) {
    console.error("❌ REPLICATE ERROR FULL:", err);

    const fallback = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/400`;

    console.log("⚠️ Using fallback image");

    return res.json({ result: fallback });
  }
});

module.exports = router;
