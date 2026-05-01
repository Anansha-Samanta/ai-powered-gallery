async function generateTagsFromImage(imageUrl) {
  try {
    const { pipeline } = await import("@xenova/transformers");

    if (!global._captioner) {
      console.log("Loading captioning model (first time only)...");
      global._captioner = await pipeline(
        "image-to-text",
        "Xenova/vit-gpt2-image-captioning",
        { quantized: true } // ← faster
      );
    }

    const result = await global._captioner(imageUrl);
    const caption = result[0]?.generated_text || "";

    const stopWords = new Set([
      "a","an","the","of","in","on","at","is","are","with",
      "and","or","to","it","its","this","that","there","some",
      "very","so","has","have","from"
    ]);

    const tags = [...new Set(
      caption.toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(" ")
        .filter(w => w.length > 2 && !stopWords.has(w))
    )];

    console.log("Caption:", caption);
    console.log("Tags:", tags);
    return { caption, tags };

  } catch (err) {
    console.error("Tag generation failed:", err.message);
    return { caption: "", tags: [] };
  }
}

module.exports = { generateTagsFromImage }; // ← removed duplicate