const axios = require("axios");
 
/**
 * Hugging Face Inference API — FREE tier
 * Uses the NEW 2025 router endpoint:
 *   https://router.huggingface.co/hf-inference/models/{model}
 *
 * Primary model : black-forest-labs/FLUX.1-schnell  (fastest, best free model in 2025)
 * Fallback models tried automatically if primary fails.
 *
 * HOW TO GET YOUR FREE API KEY:
 *  1. Go to https://huggingface.co → Sign Up
 *  2. Avatar → Settings → Access Tokens → New token
 *  3. Name: anything | Token type: Fine-grained
 *  4. Under Inference → check "Make calls to Inference Providers"
 *  5. Create token → copy hf_... value
 *  6. Add to backend .env:  HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
 */
 
const MODELS = [
  "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-3.5-medium",
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
];
 
const tryModel = async (url, prompt) => {
  const response = await axios.post(
    url,
    {
      inputs: prompt,
      parameters: {
        num_inference_steps: 4,  // FLUX.1-schnell is optimised for 4 steps
        guidance_scale: 3.5,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      responseType: "arraybuffer",
      timeout: 120000,
    }
  );
  return response;
};
 
const generateImage = async (prompt, modelIndex = 0) => {
  if (modelIndex >= MODELS.length) {
    throw new Error("All HuggingFace models failed");
  }
 
  const url = MODELS[modelIndex];
  const modelName = url.split("/").slice(-2).join("/");
  console.log(`🎨 Trying model [${modelIndex}]: ${modelName}`);
 
  try {
    const response = await tryModel(url, prompt);
 
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
 
    console.log(`✅ HuggingFace image ready from ${modelName}!`);
    return dataUrl;
 
  } catch (err) {
    const status = err.response?.status;
 
    // 503 = model cold-starting → wait and retry same model
    if (status === 503) {
      let wait = 30;
      try {
        const body = JSON.parse(Buffer.from(err.response.data).toString("utf8"));
        wait = body.estimated_time || 30;
      } catch (_) {}
      console.warn(`⏳ Model loading, waiting ${wait}s then retrying...`);
      await new Promise((r) => setTimeout(r, Math.min(wait * 1000, 60000)));
      return generateImage(prompt, modelIndex);
    }
 
    // Any other error (404, 500, etc.) → try next model
    console.warn(`⚠️ Model [${modelIndex}] failed (${status || err.message}), trying next model...`);
    return generateImage(prompt, modelIndex + 1);
  }
};
 
module.exports = { generateImage };