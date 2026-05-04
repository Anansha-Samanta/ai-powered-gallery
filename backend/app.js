require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const authRoutes    = require("./routes/auth");
const imageRoutes   = require("./routes/image");
const aiRoutes      = require("./routes/ai");
const membersRoutes = require("./routes/members"); // ← was missing
const albumRoutes   = require("./routes/albumRoutes");
const collageRoutes = require("./routes/collageRoutes");
const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      "http://localhost:5173",
      "https://ai-gallery-eta.vercel.app",
    ];
    // Allow all Vercel preview deployments
    if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.get("/test-direct", (req, res) => res.send("Direct route working"));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes — each registered exactly once
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/collages", collageRoutes);

app.get("/", (req, res) => res.send("API running"));


// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const startServer = async () => {
  try {
    await connectDB();
     console.log("Loading AI model...");
    const { pipeline } = await import("@xenova/transformers");
    global._captioner = await pipeline(
      "image-to-text",
      "Xenova/vit-gpt2-image-captioning",
      { quantized: true }
    );
    console.log("AI model ready ✅");
   
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS);

startServer();