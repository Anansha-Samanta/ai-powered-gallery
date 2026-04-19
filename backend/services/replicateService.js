const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generateImage = async (prompt) => {
  try {
    const output = await replicate.run(
      // ✅ FULL MODEL VERSION (WORKING)
      "stability-ai/sdxl:7762fd07cf82a77d5c88d0fd6b9b1f3f1c6fba58828a741b93d7c5edda6afcfd",
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