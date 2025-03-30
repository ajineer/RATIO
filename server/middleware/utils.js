import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import expiredToken from "../models/ExpiredToken.js";
import User from "../models/User.js";

dotenv.config({ path: "../.env" });

const errorMessages = {
  400: "Invalid request parameters",
  401: "Unauthorized",
  404: "Not found",
  409: "Conflict",
  422: "Unprocessable entity",
  500: "Internal server error",
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);
  return password_hash;
};

export const generateToken = (email, id) => {
  try {
    const privateKey = process.env.SECRET_KEY;
    const access_token = jwt.sign({ email: email, id: id }, privateKey, {
      algorithm: "HS256",
      expiresIn: "3d",
    });

    return access_token;
  } catch (err) {
    console.error("error: ", err);
    return "";
  }
};

export const tokenRequired = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, error: errorMessages[401] });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    const id = req.user.id;
    const user = await User.findOne({ where: { id: id } });
    // console.log("look here: ", user.active_token, "\n", token);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (user.active_token !== token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export const revokeToken = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.token;
  const expired_token = await expiredToken.create({
    token: token,
    user_id: id,
  });
  if (!expired_token) {
    return res.status(500).json({ error: "token could not be verified" });
  }

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "Strict",
  });
  res.clearCookie("token");
};
