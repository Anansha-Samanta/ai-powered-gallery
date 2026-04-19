const express = require("express");
const router = express.Router();

// 🔥 Import Replicate service
const { generateImage } = require("../services/replicateService");

console.log("AI FILE LOADED (REPLICATE)");

// ✅ TEST GET ROUTE
router.get("/test", (req, res) => {
  console.log("AI TEST ROUTE HIT");
  res.send("AI route working");
});

// ✅ TEST POST ROUTE
router.post("/testpost", (req, res) => {
  console.log("TEST POST HIT");
  res.json({ message: "POST working" });
});

// 🔥 MAIN AI IMAGE GENERATION ROUTE
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

    if (!imageUrl) {
      throw new Error("No image generated");
    }

    return res.json({ result: imageUrl });

  } catch (err) {
    console.error("❌ REPLICATE ERROR FULL:", err);

    // 🔥 SAFE fallback (always works)
    const fallback = `https://picsum.photos/seed/${encodeURIComponent(prompt)}/400`;

    console.log("⚠️ Using fallback image");

    return res.json({ result: fallback });
  }
});

module.exports = router;