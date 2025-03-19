import Account from "../models/accountModel.js";

export const get_accounts = async (req, res) => {
  const user = req.user;
  try {
    const accounts = await Account.findAll({
      where: { user_id: user.id },
    });
    if (accounts.length === 0) {
      return res.status(404).json({ error: "No accounts found for this user" });
    }
    return res.status(200).json({ accounts });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const add_account = async (req, res) => {
  const { name, balance, type, description } = req.body;
  const user = req.user;

  try {
    const new_account = await Account.create({
      user_id: user.id,
      name: name,
      balance: balance,
      type: type,
      description: description,
    });

    if (!new_account) {
      return res.status(400).json({ error: "Account could not be created" });
    }
    return res.status(201).json({ new_account });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const update_account = async (req, res) => {
  const { id } = req.params;
  const { name, balance, type, description } = req.body;

  try {
    const [updated_rows] = await Account.update(
      { name, balance, type, description },
      { where: { id } }
    );

    if (!updated_rows) {
      return res.status(404).json({ error: "Account not found" });
    }

    const patched_account = await Account.findOne({ where: { id } });

    return res.status(202).json({ patched_account });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const delete_account = async (req, res) => {
  const { id } = req.params;

  try {
    await Account.destroy({ where: { id } });

    return res.status(202).json({ message: "Account deleted" });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};
