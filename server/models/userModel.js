import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { hashPassword } from "../middleware/utils.js";

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (user) => {
        console.log("hashing password for user: ", user.email);
        user.password_hash = await hashPassword(user.password_hash);
        console.log("password hashed");
      },
      beforeUpdate: async (user) => {
        console.log("hashing password for user: ", user.email);
        user.password_hash = await hashPassword(user.password_hash);
        console.log("password hashed");
      },
    },
  }
);

export default User;
