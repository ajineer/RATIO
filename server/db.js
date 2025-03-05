import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  host: "localhost",
  port: process.env.DB_PORT,
  user: "postgres",
  password: process.env.DB_PASS,
  database: "postgres",
});

client
  .connect()
  .then(() => console.log("connected to  postgresql"))
  .catch((err) => console.error("connection error", err));

export default client;
