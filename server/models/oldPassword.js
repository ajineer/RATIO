import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./userModel.js";
import bcrypt from "bcrypt";
import { hashPassword } from "../middleware/utils.js";

const oldPassword = sequelize.define(
  "old_password",
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
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    old_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default oldPassword;
