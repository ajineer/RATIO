import express from "express";
import dotenv from "dotenv";
import {
  add_invoice,
  get_future_invoices,
} from "../controllers/invoiceController.js";
import { tokenRequired, verifyData } from "../middleware/utils.js";

dotenv.config();

export const router = express.Router();

router.post("/add_invoice", tokenRequired, verifyData, add_invoice);
router.post("/get_invoices", tokenRequired, verifyData, get_future_invoices);
