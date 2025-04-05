import dotenv from "dotenv";
import User from "../models/User.js";
import oldPassword from "../models/OldPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, revokeToken } from "../middleware/utils.js";
import expiredToken from "../models/ExpiredToken.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirm_password } =
      req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ error: "email already in use" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ error: "passwords must match" });
    }

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password_hash: password,
    });

    await oldPassword.create({
      user_id: newUser.id,
      old_password: newUser.password_hash,
    });

    return res.status(201).json({
      message: "user created successfully, please login",
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    if (!user.password_hash) {
      return res
        .status(500)
        .json({ success: false, error: "password missing" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res
        .status(401)
        .json({ success: false, error: "incorrect email or password" });
    }

    if (user.active_token) {
      await expiredToken.create({
        token: user.active_token,
        user_id: user.id,
      });
    }

    const token = generateToken(user.email, user.id);
    user.active_token = token;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24860 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "login successful",
      user: { id: user.id, email: email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const userID = jwt.verify(token, process.env.SECRET_KEY);
      if (!userID) {
        return res.status(400).json({ error: "User could not be found" });
      }
      await revokeToken(req, res);

      return res.status(200).json({ message: "User logged out" });
    } catch (error) {
      return res.status(500).json({ error: `Somthing went wrong: ${error}` });
    }
  }
  return res.status(400).json({ error: "No token found" });
};

export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { current_password, new_password, confirm_password } = req.body;
    // Find the user by email
    const user = await User.findOne({ where: { id } });

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
    revokeToken(req, res);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
