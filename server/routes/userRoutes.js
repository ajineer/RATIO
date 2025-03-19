import express from "express";
import dotenv from "dotenv";
import {
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/userController.js";
import { tokenRequired, verifyData } from "../middleware/utils.js";

dotenv.config();

export const router = express.Router();

router.post("/signup", verifyData, signup);
router.post("/login", verifyData, login);
router.post("/logout", tokenRequired, logout);
router.patch("/password_reset/:id", verifyData, tokenRequired, resetPassword);
