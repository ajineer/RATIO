import Account from "./Account.js";
import expiredToken from "./ExpiredToken.js";
import Invoice from "./Invoice.js";
import oldPassword from "./OldPassword.js";
import Transaction from "./Transaction.js";
import User from "./User.js";

User.hasMany(oldPassword, { foreignKey: "user_id", onDelete: "CASCADE" });
oldPassword.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(expiredToken, { foreignKey: "user_id", onDelete: "CASCADE" });
expiredToken.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Account, { foreignKey: "user_id", onDelete: "CASCADE" });
Account.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Account.hasMany(Transaction, { foreignKey: "account_id", onDelete: "CASCADE" });
Transaction.belongsTo(Account, { foreignKey: "account_id" });

Account.hasOne(Invoice, { foreignKey: "account_id", onDelete: "CASCADE" });
Invoice.belongsTo(Account, { foreignKey: "account_id" });
