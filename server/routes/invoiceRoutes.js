import express from "express";
import dotenv from "dotenv";
import {
  add_invoice,
  get_future_invoices,
  pay_invoice,
  update_invoice,
} from "../controllers/invoiceController.js";
import { tokenRequired, verifyData } from "../middleware/utils.js";

dotenv.config();

export const router = express.Router();

router.post("/add_invoice", tokenRequired, verifyData, add_invoice);
router.post("/get_invoices", tokenRequired, verifyData, get_future_invoices);
router.patch("/update_invoice/:id", tokenRequired, verifyData, update_invoice);
router.patch("/pay_invoice/:id", tokenRequired, pay_invoice);
