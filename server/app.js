import express from "express";
import { router as userRoutes } from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import sequelize from "./db.js";
import cookieParser from "cookie-parser";
import "./models/associations.js";
dotenv.config();

const app = express();

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Sync error: ", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  console.log("request: ", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Ratio!");
});

app.use("/api/user", userRoutes);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server is running on port: ", `${PORT}`);
});
