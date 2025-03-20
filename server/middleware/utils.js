import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import expiredToken from "../models/ExpiredToken.js";

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

export const verifyData = (req, res, next) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: errorMessages[400] });
  }

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      return res.status(400).json({ error: `key: ${key} is required` });
    }
  }

  req.data = data;
  next();
};

export const tokenRequired = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, error: errorMessages[401] });
  }

  try {
    const isExpired = await expiredToken.findOne({ where: { token } });
    if (isExpired) {
      return res.status(401).json({ error: "Token has expired" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
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
