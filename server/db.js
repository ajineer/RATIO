import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { config } from "./config/dbConfig.js";

dotenv.config();

const environment = process.env.NODE_ENV;
const dbConfig = config[environment];
const sequelize = new Sequelize(config[environment]);
sequelize
  .authenticate()
  .then(() => console.log(`Connected to ${dbConfig.dialect} database`))
  .catch((err) => console.error("Connection error: ", err));

// if (environment === "development") {
//   sequelize
//     .authenticate()
//     .then(() => console.log(`Connected to ${dbConfig.dialect}`))
//     .catch((err) => console.error("Connection error: ", err));
// } else {
//   console.log(`Connected to ${dbConfig.dialect}`);
// }

export default sequelize;
