import Transaction from "../models/Transaction.js";

export const get_transactions = async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = await Transaction.findAll({
      where: { account_id: id },
      limit: 25,
    });
    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions found for this account" });
    }
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};
export const add_transaction = async (req, res) => {
  const { account_id, amount, description } = req.body;

  try {
    const new_transaction = await Transaction.create({
      account_id: account_id,
      amount: amount,
      description: description,
      status: "paid",
    });

    if (!new_transaction) {
      return res.status(500).json({ error: "Could not post transaction" });
    }
    return res.status(201).json({ new_transaction });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

// export const update_transaction = async (req, res) => {};
