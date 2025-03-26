import express from "express";
import dotenv from "dotenv";
import {
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/userController.js";
import { tokenRequired, validateRequest } from "../middleware/utils.js";
import {
  loginUserSchema,
  resetPaswwordSchema,
  signupUserSchema,
} from "../middleware/schemas.js";

dotenv.config();

export const router = express.Router();

router.post("/signup", validateRequest(signupUserSchema), signup);
router.post("/login", validateRequest(loginUserSchema), login);
router.post("/logout/:id", tokenRequired, logout);
router.patch(
  "/password_reset/:id",
  tokenRequired,
  validateRequest(resetPaswwordSchema),
  resetPassword
);
