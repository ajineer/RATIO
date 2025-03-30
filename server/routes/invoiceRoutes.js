import express from "express";
import dotenv from "dotenv";
import {
  add_invoice,
  get_future_invoices,
  pay_invoice,
  update_invoice,
} from "../controllers/invoiceController.js";
import { tokenRequired } from "../middleware/utils.js";
import {
  addInvoiceSchema,
  updateInvoiceSchema,
  validateRequest,
} from "../middleware/schemas.js";

dotenv.config();

export const router = express.Router();

router.post(
  "/add_invoice",
  tokenRequired,
  validateRequest(addInvoiceSchema),
  add_invoice
);
router.post("/get_invoices/:account_id", tokenRequired, get_future_invoices);
router.patch(
  "/update_invoice/:id",
  tokenRequired,
  validateRequest(updateInvoiceSchema),
  update_invoice
);
router.patch("/pay_invoice/:id", tokenRequired, pay_invoice);
