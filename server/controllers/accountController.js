import Account from "../models/Account.js";
import Invoice from "../models/invoice.js";
import jwt from "jsonwebtoken";

export const get_accounts = async (req, res) => {
  let userId;
  const user = req.body?.user;
  userId = user.id;
  if (!user || !userId) {
    return res.status(400).json({ error: `user not found` });
  }
  try {
    const accounts = await Account.findAll({
      where: { user_id: userId },
    });
    if (accounts.length === 0) {
      return res.status(404).json({ error: "no accounts found for this user" });
    }
    return res.status(200).json({ accounts });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

export const add_account = async (req, res) => {
  const { name, starting_balance, balance, type, description } = req.body;
  const user = req.user;

  const userId = user.id;

  console.log("userId: ", userId);
  if (!user || Object.keys(user).length === 0) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const new_account = await Account.create({
      user_id: userId,
      name: name,
      starting_balance: starting_balance,
      balance: balance,
      type: type,
      description: description,
    });

    if (!new_account) {
      return res.status(400).json({ error: "account could not be created" });
    }
    return res.status(201).json({ ...new_account });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

export const update_account = async (req, res) => {
  const { id } = req.params;
  const accountId = id;
  const { name, type, description } = req.body;
  if (!accountId) {
    return res.status(400).json({ error: "account id missing" });
  }

  try {
    const [updated_rows] = await Account.update(
      { name, type, description },
      { where: { id: accountId } }
    );

    if (!updated_rows) {
      return res.status(404).json({ error: "account not found" });
    }

    const patched_account = await Account.findOne({
      where: { id },
      attributes: [
        "id",
        "name",
        "description",
        "type",
        "balance",
        "starting_balance",
      ],
    });
    return res.status(202).json({
      account: patched_account.get(),
    });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

export const delete_account = async (req, res) => {
  const { id } = req.params;
  const accountId = id;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  if (!accountId) {
    return res.status(400).json({ error: "no account id provided" });
  }

  try {
    await Account.destroy({ where: { id, user_id: userId } });

    return res.status(202).json({ message: "account deleted" });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};
