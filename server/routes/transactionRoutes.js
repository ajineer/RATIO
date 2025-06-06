import express from "express";
import dotenv from "dotenv";
import {
  add_transaction,
  get_transactions,
  reverse_transaction,
} from "../controllers/transactionController.js";
import { tokenRequired } from "../middleware/utils.js";
import {
  addTransactionSchema,
  validateRequest,
} from "../middleware/schemas.js";

dotenv.config();

export const router = express.Router();

router.get("/get_transactions/:id", tokenRequired, get_transactions);
router.post(
  "/add_transaction",
  tokenRequired,
  validateRequest(addTransactionSchema),
  add_transaction
);
router.patch("/reverse_transaction/:id", tokenRequired, reverse_transaction);
