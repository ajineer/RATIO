import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Invoice = sequelize.define(
  "invoices",
  {
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "accounts",
        key: "id",
      },
      unique: true,
    },
    paid: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    amount_due: {
      allowNull: true,
      type: DataTypes.FLOAT,
    },
    recurring: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    next_due_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    frequency: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      attributes: { exclude: ["account_id"] },
    },
  }
);

export default Invoice;
