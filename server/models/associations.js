import expiredToken from "./expiredToken.js";
import oldPassword from "./oldPassword.js";
import User from "./userModel.js";

User.hasMany(oldPassword, { foreignKey: "user_id", onDelete: "CASCADE" });
oldPassword.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(expiredToken, { foreignKey: "user_id", onDelete: "CASCADE" });
expiredToken.belongsTo(User, { foreignKey: "user_id" });
