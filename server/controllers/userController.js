import dotenv from "dotenv";
import User from "../models/userModel.js";
import oldPassword from "../models/oldPassword.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/utils.js";

dotenv.config();

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

    await oldPassword.create({
      user_id: newUser.id,
      old_password: newUser.password_hash,
    });

    return res.status(201).json({
      message: "User created successfully, please login",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!user.password_hash) {
      return res
        .status(500)
        .json({ success: false, error: "Password missing" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect email or password" });
    }

    const token = generateToken(user.email, user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24860 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: email },
    });
  } catch (error) {
    console.error("Login error: ", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
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

    const OldPasswords = await oldPassword.findAll({
      where: { user_id: user.id },
      limit: 3,
      order: [["created_at", "DESC"]],
    });

    if (OldPasswords.length > 2) {
      await oldPassword.destroy({
        where: { id: OldPasswords[OldPasswords.length - 1].id },
      });
    }
    const isOldPassword = await Promise.all(
      OldPasswords.map(async (oldPasswordRecord) => {
        return await bcrypt.compare(
          new_password,
          oldPasswordRecord.old_password
        );
      })
    );
    if (isOldPassword.includes(true)) {
      return res.status(401).json({
        error: "New password cannot be any of your last 10 passwords",
      });
    }

    const matchOldPassword = await bcrypt.compare(
      new_password,
      user.password_hash
    );
    if (matchOldPassword) {
      return res.status(401).json({
        error: "New password cannot be your current password",
      });
    }

    // Update the user's password
    await user.update({
      password_hash: new_password,
    });

    const find_old_password = await oldPassword.findOne({
      where: { user_id: user.id, old_password: user.password_hash },
    });

    if (!find_old_password) {
      await oldPassword.create({
        user_id: user.id,
        old_password: user.password_hash,
      });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// 1: password123 *
// 2: password234 *
// 3: password456 *
// 4: password567 *
// 5: password678 *
// 6: password789 *
// 7: password8910 *
// 8: password91011 *
// 9: password101112 *
// 10: password111213 *
// 11: password121314 *
// 12: password123 *
