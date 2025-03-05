import express from "express";
import { router as userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv";
import pkg from "pg";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
const { Pool } = pkg;

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log("request: ", req.method, req.url);
  next();
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW();");
    res.json({ message: "Connected to DB!", time: result.rows[0].now });
  } catch (err) {
    res
      .status(500)
      .json({ error: "DB Connection Failed", details: err.message });
  }
});

app.get("/api/test", async (req, res) => {
  try {
    return res.status(200).json({
      message:
        "successfully queried your server! I don't know why it is not/was not working!!!! >:(",
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Ratio!");
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server is running on port: ", `${process.env.SERVER_PORT}`);
});
