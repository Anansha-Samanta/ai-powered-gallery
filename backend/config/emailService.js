const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  console.log("📤 Sending email to:", email);

  try {
    const info = await transporter.sendMail({
      from: `"ANDROMEDA" <${process.env.EMAIL_USER}>`,   // ✅ FIXED
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Email Verification</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    console.log("✅ Email sent:", info.response);   // ✅ IMPORTANT LOG
  } catch (err) {
    console.log("❌ Email send failed:", err.message); // ✅ DEBUG
    throw err; // optional (since you already handle in controller)
  }
};