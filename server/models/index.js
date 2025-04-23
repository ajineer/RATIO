import { DataTypes, Sequelize } from "sequelize";
import db from "../db.js";
import AccountModel from "./Account.js";
import expiredTokenModel from "./ExpiredToken.js";
import InvoiceModel from "./invoice.js";
import oldPasswordModel from "./OldPassword.js";
import TransactionModel from "./Transaction.js";
import UserModel from "./User.js";
import dotenv from "dotenv";
import setupAssociations from "./associations";

dotenv.config();

const { sequelize } = db;

const Account = AccountModel(sequelize, Sequelize.DataTypes);
const Invoice = InvoiceModel(sequelize, Sequelize.DataTypes);
const Transaction = TransactionModel(sequelize, Sequelize.DataTypes, Account);
const User = UserModel(sequelize, Sequelize.DataTypes);
const expiredToken = expiredTokenModel(sequelize, Sequelize.DataTypes);
const oldPassword = oldPasswordModel(sequelize, Sequelize.DataTypes);

const models = {
  Account,
  Invoice,
  Transaction,
  User,
  expiredToken,
  oldPassword,
};

setupAssociations(models);

export default models;
