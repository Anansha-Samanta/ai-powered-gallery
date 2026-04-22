const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateImageCaption = async (imageUrl) => {
  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Describe this image in one short sentence",
            },
            {
              type: "input_image",
              image_url: imageUrl,
            },
          ],
        },
      ],
    });

    // extract text safely
    return response.output_text || "No caption generated";
  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message);
    return "Caption generation failed";
  }
};

module.exports = { generateImageCaption };