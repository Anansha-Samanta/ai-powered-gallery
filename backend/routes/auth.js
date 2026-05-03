const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { register, login, verifyEmail, getProfile, updateProfile, uploadProfilePic, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:userId", getProfile);
router.put("/profile/:userId", updateProfile);
router.post("/profile/:userId/picture", upload.single("image"), uploadProfilePic);

router.get("/verify-email/:token", verifyEmail);  // ADD THIS
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;