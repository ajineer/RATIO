import Account from "./accountModel.js";
import expiredToken from "./expiredToken.js";
import oldPassword from "./oldPassword.js";
import Transaction from "./transactionModel.js";
import User from "./userModel.js";

User.hasMany(oldPassword, { foreignKey: "user_id", onDelete: "CASCADE" });
oldPassword.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(expiredToken, { foreignKey: "user_id", onDelete: "CASCADE" });
expiredToken.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Account, { foreignKey: "user_id", onDelete: "CASCADE" });
Account.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Account.hasMany(Transaction, { foreignKey: "account_id", onDelete: "CASCADE" });
Transaction.belongsTo(Account, { foreignKey: "account_id" });
