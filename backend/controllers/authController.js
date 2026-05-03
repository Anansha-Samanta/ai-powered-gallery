// Add these at the TOP of authController.js with the other requires:
const Image = require("../models/Image");
const Album = require("../models/Album");
const Collage = require("../models/Collage");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendVerificationEmail, sendResetEmail } = require("../config/emailService");
const cloudinary = require("../config/cloudinary");

// Add this new controller:
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const streamifier = require("streamifier");
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile-pics", timeout: 60000 },
        (error, result) => { if (error) reject(error); else resolve(result); }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    // Save to user only — NOT to Image collection
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { profilePic: result.secure_url },
      { new: true }
    ).select("-password -verificationToken");

    res.json({ profilePic: result.secure_url, user });
  } catch (err) {
    console.error("uploadProfilePic error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

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

// GET /api/auth/profile/:userId
// Then replace getProfile with this:
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password -verificationToken");
    if (!user) return res.status(404).json({ error: "User not found" });

    const [photoCount, albumCount, collageCount] = await Promise.all([
      Image.countDocuments({ userId: user._id }),
      Album.countDocuments({ userId: user._id }),
      Collage.countDocuments({ userId: user._id }),
    ]);

    res.json({ ...user.toObject(), photoCount, albumCount, collageCount });
  } catch (err) {
    console.error("getProfile error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/auth/profile/:userId
exports.updateProfile = async (req, res) => {
  try {
    const { username, password, profilePic } = req.body;
    const update = {};
    if (username) update.username = username;
    if (profilePic) update.profilePic = profilePic;
    if (password) {
      const bcrypt = require("bcryptjs");
      update.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.userId, update, { new: true })
      .select("-password -verificationToken");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json("User not found");

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    await sendResetEmail(user.email, token);

    res.json("Reset email sent");

  } catch (err) {
    console.error("❌ Forgot password error:", err);
    res.status(500).json("Error sending reset email");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json("Invalid or expired token");
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    res.json("Password reset successful");

  } catch (err) {
    console.error("❌ Reset error:", err);
    res.status(500).json("Reset failed");
  }
};