import express from "express";
import dotenv from "dotenv";
import { tokenRequired, verifyData } from "../middleware/utils.js";
import {
  add_account,
  delete_account,
  get_accounts,
  update_account,
} from "../controllers/accountController.js";

dotenv.config();

export const router = express.Router();

router.get("/get_accounts", tokenRequired, get_accounts);
router.post("/add_account", tokenRequired, verifyData, add_account);
router.patch("/update_account/:id", tokenRequired, verifyData, update_account);
router.delete("/delete_account/:id", tokenRequired, delete_account);
