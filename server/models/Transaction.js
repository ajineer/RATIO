import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Account from "./Account.js";

const Transaction = sequelize.define(
  "transactions",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    account_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "accounts",
        key: "id",
      },
    },
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    date_posted: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      afterCreate: async (transaction) => {
        const account = await Account.findOne({
          where: { id: transaction.account_id },
        });
        if (account) {
          const updatedBalance = account.balance + transaction.amount;
          await account.update({ balance: updatedBalance });
        }
      },
      beforeUpdate: async (transaction) => {
        if (
          transaction.changed("status") &&
          transaction.status === "reversed"
        ) {
          const account = await Account.findOne({
            where: { id: transaction.account_id },
          });
          if (account) {
            await account.update({
              balance: account.balance - transaction.amount,
            });
          }
        }
      },
    },
    // defaultScope: {
    //   attributes: { exclude: "account_id" },
    // },
  }
);

export default Transaction;
