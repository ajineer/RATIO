import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { addDays, addMonths, addWeeks, addYears } from "date-fns";

function delta_date(invoice) {
  switch (invoice.frequency) {
    case "monthly":
      return addMonths(invoice.next_due_date, 1);
    case "weekly":
      return addWeeks(invoice.next_due_date, 1);
    case "quarterly":
      return addMonths(invoice.next_due_date, 3);
    case "daily":
      return addDays(invoice.next_due_date, 1);
    case "annually":
      return addYears(invoice.next_due_date, 1);
    default:
      throw new Error("Unknown frequency");
  }
}

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
    hooks: {
      beforeUpdate: async (invoice) => {
        console.log("hook is firing, change and paid not being detected");
        if (invoice.changed("paid")) {
          if (invoice.paid) {
            console.log("before");
            const new_due_date = delta_date(invoice);
            console.log(`after: ${new_due_date}`);
            // invoice.setDataValue("next_due_date", new_due_date);
            invoice.set("next_due_date", new_due_date);
          } else {
            console.log("paid is false");
          }
        } else {
          console.log("invoice due date has not changed ");
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ["account_id"] },
    },
  }
);

export default Invoice;
