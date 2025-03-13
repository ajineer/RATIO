import express from "express";
import db from "../db.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { login, resetPassword, signup } from "../controllers/userController.js";
import { tokenRequired, verifyData } from "../middleware/utils.js";

dotenv.config();

export const router = express.Router();

router.post("/signup", verifyData, signup);
router.post("/login", verifyData, login);
router.patch("/password_reset", verifyData, tokenRequired, resetPassword);
