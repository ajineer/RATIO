import express from "express";
import db from "../db.js";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const router = express.Router();

router.post("/signup", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Req body is missing" });
  }

  const { email } = req.body;

  const token = crypto.randomBytes(20).toString("hex");

  const expires_at = new Date(Date.now() + 3600 * 24000);

  const result = await db.query(
    "INSERT INTO signup_tokens (email, token, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [email, token, expires_at]
  );

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    service: "outlook",
    auth: {
      user: "ratio.app@outlook.com",
      pass: process.env.EMAIL_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendEmail = async (toEmail, subject, text) => {
    try {
      const info = await transporter.sendMail({
        from: "ratio.app@outlook.com",
        to: toEmail,
        subject: subject,
        text: text,
      });
      console.log("Message sent to $s", info.messageId);
    } catch (err) {
      console.error("Error sending email: ", err);
    }
  };

  const confirmationUrl = `http://localhost:5173/verify-email?token=${token}`;
  const subject = "Please confirm your email";
  const text = `Click the link below to confirm your email and complete your registration: \n\n${confirmationUrl}`;

  await sendEmail(email, subject, text);
  res.status(200).json({
    message:
      "Signup successful, Please check your email to confirm your account.",
  });
});

router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const result = await db.query(
      "SELECT * FROM signup_tokens WHERE token = $1 AND is_used = false AND expires_at > NOW()",
      [token]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const signupToken = result.rows[0];
    await db.query("UPDATE signup_tokens SET is_used = true WHERE token = $1", [
      token,
    ]);
    res.status(200).json({
      message: "Email successfully verified. You can now log in.",
    });
  } catch (err) {
    console.error("Error verifying email: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
