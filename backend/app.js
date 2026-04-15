require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/images", require("./routes/image"));

app.get("/", (req, res) => {
  res.send("API running");
});

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