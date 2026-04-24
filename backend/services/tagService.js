const fetch = require("node-fetch");

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY; // same token you already have

// Converts image URL to buffer for HF API
async function urlToBuffer(imageUrl) {
  const res = await fetch(imageUrl);
  return await res.buffer();
}

// Generates a caption and extracts tags from it
async function generateTagsFromImage(imageUrl) {
  try {
    const imageBuffer = await urlToBuffer(imageUrl);
    const HF_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";

    console.log("Calling URL:", HF_URL);
    // BLIP image captioning — free on HF
    const response = await fetch(
      HF_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/octet-stream",
        },
        body: imageBuffer,
      }
    );

    console.log("Response URL:", response.url);

    if (!response.ok) {
  const text = await response.text();
  console.error("HF RAW ERROR:", text);
  throw new Error("HF request failed");
}

    const result = await response.json();
    console.log("BLIP result:", result);

    // result looks like: [{ generated_text: "a dog sitting on a beach" }]
    const caption = result[0]?.generated_text || "";

    // Extract tags from caption words (filter short/common words)
    const stopWords = new Set([
      "a", "an", "the", "of", "in", "on", "at", "is", "are",
      "with", "and", "or", "to", "it", "its", "this", "that",
      "there", "some", "very", "so", "has", "have", "from",
    ]);

    const tags = caption
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(" ")
      .filter(word => word.length > 2 && !stopWords.has(word));

    // Deduplicate
    const uniqueTags = [...new Set(tags)];

    console.log("Generated caption:", caption);
    console.log("Extracted tags:", uniqueTags);

    return { caption, tags: uniqueTags };
  } catch (err) {
    console.error("Tag generation failed:", err.message);
    return { caption: "", tags: [] }; // fail silently, don't block upload
  }
}

module.exports = { generateTagsFromImage };