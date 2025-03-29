import dotenv from "dotenv";

dotenv.config();

export const config = {
  development: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: console.log,
    timezone: "America/Denver",
  },
  test: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "sqlite",
    storage: ":memory",
    logging: console.log,
  },
};
