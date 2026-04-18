const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      size: "512x512",
    });

    // 🔥 FIX: use base64 instead of url
    const imageBase64 = result.data[0].b64_json;

    const imageUrl = `data:image/png;base64,${imageBase64}`;

    res.json({ result: imageUrl });

  } catch (err) {
    console.error("AI ROUTE ERROR:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

module.exports = router;