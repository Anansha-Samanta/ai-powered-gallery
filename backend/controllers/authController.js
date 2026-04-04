const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ Normalize input
    email = email?.trim().toLowerCase();
    password = password?.trim();

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // ✅ optional but recommended
    );

    // ✅ Never send password back
    const { password: _, ...userData } = user._doc;

    res.json({ token, user: userData });

  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};