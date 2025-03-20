import Transaction from "../models/Transaction";

export const add_transaction = async (req, res) => {
  const { account_id, amount, description, recurring, due_date, frequency } =
    req.body;

  try {
    const posted_date = new Date();

    const newTransaction = await Transaction.create({
      account_id: account_id,
      amount: amount,
      description: description,
      date_posted: posted_date,
      status: "pending",
    });

    if (!newTransaction) {
      return res.status(500).json({ error: "Could not post transaction" });
    }
    return res.status(201).json({ newTransaction });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

// export const update_transaction = async (req, res) => {};
