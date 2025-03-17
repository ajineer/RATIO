import oldPassword from "./oldPassword.js";
import User from "./userModel.js";

User.hasMany(oldPassword, { foreignKey: "user_id", onDelete: "CASCADE" });
oldPassword.belongsTo(User, { foreignKey: "user_id" });
