import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { config } from "./config/dbConfig.js";

dotenv.config();

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];
console.log("config: ", dbConfig);
const dialect = {
  test: "sqlite",
  development: "postgres",
};
const testEnv = {
  port: dbConfig.port,
  host: dbConfig.host,
  dialect: "sqlite",
  storage: ":memory",
  logging: console.log,
};

const devEnv =
  (dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    dialect: dialect["test"],
    logging: dbConfig?.logging,
    timezone: dbConfig?.timezone || null,
  });

const sequelize = new Sequelize(testEnv);

sequelize
  .authenticate()
  .then(() => console.log(`Connected to ${dbConfig.dialect}`))
  .catch((err) => console.error("Connection error: ", err));

export default sequelize;
