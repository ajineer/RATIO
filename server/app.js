import express from "express";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as accountRoutes } from "./routes/accountRoutes.js";
import { router as invoiceRoutes } from "./routes/invoiceRoutes.js";
import { router as transactionRoutes } from "./routes/transactionRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import db from "./models/index.js";
const { sequelize, environment, dbConfig } = db;
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

sequelize
  .sync()
  .then(() => {
    console.log(`Connected to ${dbConfig.dialect} database`);
  })
  .catch((error) => console.log("sync error: ", error));

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
app.use("/api/accounts", accountRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT =
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_SERVER_PORT
    : process.env.SQLITE_SERVER_PORT;

app.listen(PORT, () => {
  console.log("Server is running on port: ", `${PORT}`);
});

export default app;
