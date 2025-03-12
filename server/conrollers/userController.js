import dotenv from "dotenv";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const timeout = setTimeout(() => {
      return res.status(408).json({ error: "Request timeout" });
    }, 10000);

    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      clearTimeout(timeout);
      return res.status(400).json({ error: "missing fields" });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      clearTimeout(timeout);
      return res.status(401).json({ error: "Email already in use" });
    }

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password,
    });

    if (!newUser) {
      clearTimeout(timeout);
      return res.status(400).json({ error: "User creation failed" });
    }

    clearTimeout(timeout);
    return res.status(201).json({
      message: "User created successfully, please login",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};
