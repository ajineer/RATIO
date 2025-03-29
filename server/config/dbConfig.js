import dotenv from "dotenv";

dotenv.config();

export const config = {
  development: {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.POSTGRES_DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: console.log,
    timezone: "America/Denver",
  },
  test: {
    dialect: "sqlite",
    host: process.env.DB_HOST,
    port: process.env.SQLITE_DB_PORT,
    storage: "./ratio.db",
    logging: console.log,
  },
};
