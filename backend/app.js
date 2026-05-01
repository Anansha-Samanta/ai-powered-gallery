require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");
const aiRoutes = require("./routes/ai");
const albumRoutes = require("./routes/albumRoutes");
const collageRoutes = require("./routes/collageRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test-direct", (req, res) => res.send("Direct route working"));

app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/collages", collageRoutes);

app.get("/", (req, res) => res.send("API running"));

const startServer = async () => {
  try {
    await connectDB();

    // ✅ Pre-load model so first upload is fast
    console.log("Loading AI model...");
    const { pipeline } = await import("@xenova/transformers");
    global._captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning",
      { quantized: true }
    );
    console.log("AI model ready ✅");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();