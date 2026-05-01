const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../config/emailService");

exports.register = async (req, res) => {
  try {
    console.log("📥 BODY:", req.body);

    const { username, email, password } = req.body;

    // ✅ VALIDATION (VERY IMPORTANT)
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    // basic email check
    if (!email.includes("@")) {
      return res.status(400).json("Enter a valid email");
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashed,
      verificationToken,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    console.log("✅ User created:", user.email);

    // ✅ EMAIL SEND WITH DEBUG
    try {
      console.log("📤 Calling email function...");
      await sendVerificationEmail(user.email, verificationToken);
      console.log("✅ Email function completed");
    } catch (err) {
      console.log("❌ Email error:", err.message);
    }

    res.json({
      message: "Registration successful! Check your email to verify your account.",
      email: user.email,
    });

  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    // ✅ CHECK EMAIL VERIFIED
    if (!user.isVerified) {
      return res.status(403).json("Please verify your email before logging in");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userData } = user._doc;

    res.json({ token, user: userData });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json("Server error");
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    console.log("🔍 Verifying token:", token);

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json("Invalid or expired verification link");
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpires = null;
    await user.save();

    console.log("✅ Email verified:", user.email);

    res.json("Email verified successfully! You can now log in.");

  } catch (err) {
    console.error("❌ Verification error:", err);
    res.status(500).json("Verification failed");
  }
};