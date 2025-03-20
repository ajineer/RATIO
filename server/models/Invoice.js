import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Invoice = sequelize.define(
  "invoices",
  {
    id: {
      primaryKey: true,
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
  }
);

export default Invoice;
