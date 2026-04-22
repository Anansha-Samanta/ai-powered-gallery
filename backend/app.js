require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");
const aiRoutes = require("./routes/ai");

const app = express();

<<<<<<< HEAD
=======
console.log("🔥 CLEAN BACKEND RUNNING");

// middleware
>>>>>>> 661e8c1dad13b2af32bf15ccbeef29125ec35578
app.use(cors());
app.use(express.json());

// ✅ keep this (helps debugging always)
app.get("/test-direct", (req, res) => {
  res.send("Direct route working");
});

// ✅ mount routes (IMPORTANT ORDER)
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/ai", aiRoutes);

// root
app.get("/", (req, res) => {
  res.send("API running");
});

<<<<<<< HEAD
const startServer = async () => {
  try {
    await connectDB(); // ✅ WAIT here

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
=======
// start server
const start = async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("🚀 Server running on 5000");
    });
  } catch (err) {
    console.error(err);
  }
};

start();  
>>>>>>> 661e8c1dad13b2af32bf15ccbeef29125ec35578
