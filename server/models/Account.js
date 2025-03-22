import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Account = sequelize.define(
  "accounts",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    starting_balance: {
      allowNull: true,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    balance: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: (account) => {
        account.set("balance", account.starting_balance);
      },
    },
    defaultScope: {
      attributes: { exclude: ["user_id"] },
    },
  }
);

export default Account;
