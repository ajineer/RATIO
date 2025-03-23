import express from "express";
import dotenv from "dotenv";
import {
  add_transaction,
  get_transactions,
  reverse_transaction,
} from "../controllers/transactionController.js";
import { tokenRequired, verifyData } from "../middleware/utils.js";

dotenv.config();

export const router = express.Router();

router.get("/get_transactions/:id", tokenRequired, get_transactions);
router.post("/add_transaction", tokenRequired, verifyData, add_transaction);
router.patch("/reverse_transaction/:id", tokenRequired, reverse_transaction);
