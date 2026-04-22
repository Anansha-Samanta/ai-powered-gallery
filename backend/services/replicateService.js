
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generateImage = async (prompt) => {
  try {
    const output = await replicate.run(
      // ⚠️ Use model WITHOUT version (safer)
      "stability-ai/sdxl",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    console.log("✅ REPLICATE OUTPUT:", output);

    return output[0];

  } catch (err) {
    console.error("❌ REPLICATE SERVICE ERROR:", err);
    throw err;
  }
};

module.exports = { generateImage };
