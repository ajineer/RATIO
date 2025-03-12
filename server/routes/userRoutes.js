import express from "express";
import db from "../db.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { signup } from "../conrollers/userController.js";

dotenv.config();

export const router = express.Router();

router.post("/signup", signup);
