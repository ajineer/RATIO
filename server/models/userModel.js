import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db.js";

const User = sequelize.define(
  "user",
  {
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
        const salt = await bcrypt.genSalt(10);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
        console.log("password hashed");
      },
    },
  }
);

User.prototype.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password_hash);
};

export default User;
