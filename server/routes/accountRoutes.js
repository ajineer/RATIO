import express from "express";
import dotenv from "dotenv";
import { tokenRequired, validateRequest } from "../middleware/utils.js";
import {
  add_account,
  delete_account,
  get_accounts,
  update_account,
} from "../controllers/accountController.js";
import {
  addAccountSchema,
  updateAccountSchema,
} from "../middleware/schemas.js";

dotenv.config();

export const router = express.Router();

router.get("/get_accounts", tokenRequired, get_accounts);
router.post(
  "/add_account",
  tokenRequired,
  validateRequest(addAccountSchema),
  add_account
);
router.patch(
  "/update_account/:id",
  tokenRequired,
  validateRequest(updateAccountSchema),
  update_account
);
router.delete("/delete_account/:id", tokenRequired, delete_account);
