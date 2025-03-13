import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const errorMessages = {
  400: "Invalid request parameters",
  401: "Unauthorized",
  404: "Not found",
  409: "Conflict",
  422: "Unprocessable entity",
  500: "Internal server error",
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

export const tokenRequired = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // req.headers["authorization"].split(" ")[1] ||
  // req.token.cookies?.access_token.split(" ")[1] ||

  if (!token) {
    return res.status(401).json({ error: errorMessages[401] });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Expired or invalid token" });
  }
};
