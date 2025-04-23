import dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";
import { config } from "./config/dbConfig.js";
// import AccountModel from "./models/Account.js";
// import expiredTokenModel from "./models/ExpiredToken.js";
// import InvoiceModel from "./models/invoice.js";
// import oldPasswordModel from "./models/OldPassword.js";
// import TransactionModel from "./models/Transaction.js";
// import UserModel from "./models/User.js";
// import setupAssociations from "./models/associations.js";
// import db from "./models/index.js";
dotenv.config();

const environment = process.env.NODE_ENV;
const dbConfig = config[environment];
const sequelize = new Sequelize(config[environment]);
const db = { sequelize, environment, dbConfig };

// const Account = AccountModel(sequelize, DataTypes);
// const Invoice = InvoiceModel(sequelize, DataTypes);
// const Transaction = TransactionModel(sequelize, DataTypes, Account);
// const User = UserModel(sequelize, DataTypes);
// const expiredToken = expiredTokenModel(sequelize, DataTypes);
// const oldPassword = oldPasswordModel(sequelize, DataTypes);

// const models = {
//   Account,
//   Invoice,
//   Transaction,
//   User,
//   expiredToken,
//   oldPassword,
// };

// setupAssociations(models);
// sequelize
//   .authenticate()
//   .then(() => console.log(`Connected to ${dbConfig.dialect} database`))
//   .catch((err) => console.error("Connection error: ", err));

// if (environment === "development") {
//   sequelize
//     .authenticate()
//     .then(() => console.log(`Connected to ${dbConfig.dialect}`))
//     .catch((err) => console.error("Connection error: ", err));
// } else {
//   console.log(`Connected to ${dbConfig.dialect}`);
// }

export default db;
