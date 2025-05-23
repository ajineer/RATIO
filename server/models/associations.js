export default function setupAssociations(models) {
  const { Account, Invoice, Transaction, oldPassword, User, expiredToken } =
    models;

  User.hasMany(oldPassword, { foreignKey: "user_id", onDelete: "CASCADE" });
  oldPassword.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(expiredToken, { foreignKey: "user_id", onDelete: "CASCADE" });
  expiredToken.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Account, { foreignKey: "user_id", onDelete: "CASCADE" });
  Account.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

  Account.hasMany(Transaction, {
    foreignKey: "account_id",
    onDelete: "CASCADE",
  });
  Transaction.belongsTo(Account, { foreignKey: "account_id" });

  Account.hasOne(Invoice, { foreignKey: "account_id", onDelete: "CASCADE" });
  Invoice.belongsTo(Account, { foreignKey: "account_id" });
}
