import dotenv from "dotenv";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(401).json({ error: "Email already in use" });
    }

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password,
    });

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed" });
    }

    return res.status(201).json({
      message: "User created successfully, please login",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) {
    return res.status(401).json({ error: "Incorrect password or email" });
  }

  const token = createToken(user.id);

  return res.status(200).json({ email, token });
};

export const resetPassword = async (req, res) => {
  try {
    const { email, current_password, new_password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(current_password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Update the user's password
    user.password_hash = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
