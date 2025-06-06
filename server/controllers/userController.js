import dotenv from "dotenv";
import models from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken, revokeToken } from "../middleware/utils.js";
import expiredToken from "../models/ExpiredToken.js";
const { User, oldPassword } = models;

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
    if (process.env.NODE_ENV === "test") {
      return res.status(201).json({
        message: "user created successfully, please login",
        user: newUser,
      });
    }
    return res.status(201).json({
      message: "user created successfully, please login",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
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
      return res.status(404).json({ error: "user not found" });
    }

    if (!user.password_hash) {
      return res
        .status(500)
        .json({ success: false, error: "password missing" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "incorrect email or password" });
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
    if (process.env.NODE_ENV === "test") {
      return res.status(201).json({
        user: { id: user.id, email: email },
        message: "login successful",
        token: token,
      });
    }
    return res.status(200).json({
      message: "login successful",
      user: { id: user.id, email: email },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

// logout controller
export const logout = async (req, res) => {
  const token = req.cookies.token;

  if (token) {
    try {
      let userId;
      try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        userId = id;
      } catch (error) {
        return res.status(500).json({ error: "invalid signature" });
      }

      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(400).json({ error: "user could not be found" });
      }
      await revokeToken(req, res, userId);

      return res.status(200).json({ message: "user logged out" });
    } catch (error) {
      if (process.env.NODE_ENV === "test") {
        return res.status(500).json({ error: `somthing went wrong: ${error}` });
      } else {
        return res.status(500).json({ error: "internal server error" });
      }
    }
  }
  return res.status(400).json({ error: "unauthorized" });
};

// reset password controller
export const resetPassword = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(400).json({ error: "unauthorized" });
  }
  try {
    let userId;
    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      userId = id;
    } catch (error) {
      return res.status(500).json({ error: "invalid signature" });
    }

    const { current_password, new_password, confirm_password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Check if the current password is correct
    try {
      const isMatch = await bcrypt.compare(
        current_password,
        user.password_hash
      );
      if (!isMatch) {
        return res.status(400).json({ error: "incorrect current password" });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "test") {
        return res.status(500).json({ error: `bcrypt error: ${error}` });
      } else {
        return res.status(500).json({ error: "internal server error" });
      }
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({ error: "passwords must match" });
    }
    const OldPasswords = await oldPassword.findAll({
      where: { user_id: userId },
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
      return res.status(400).json({
        error: "new password cannot be any of your last 10 passwords",
      });
    }
    const oldPasswordHash = user.password_hash;

    // Update the user's password
    await user.update({
      password_hash: new_password,
    });

    const find_old_password = await oldPassword.findOne({
      where: { user_id: userId, old_password: oldPasswordHash },
    });

    if (!find_old_password) {
      await oldPassword.create({
        user_id: userId,
        old_password: user.password_hash,
      });
    }
    revokeToken(req, res, userId);
    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      return res.status(500).json({ error: `internal server error: ${error}` });
    } else {
      return res.status(500).json({ error: "internal server error" });
    }
  }
};
