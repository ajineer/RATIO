import RecurringBill from "../models/RecurringBill.js";
import models from "../models/index.js";
const { Transaction, Invoice, Account } = models;

export const add_invoice = async (req, res) => {
  const { account_id, recurring, next_due_date, frequency, amount_due } =
    req.body;
  const { id: userId } = req.user;

  if (!userId) {
    return res.status(401).json({ error: "unauthorized" });
  }
  try {
    const account = await Account.findOne({
      where: { id: account_id, user_id: userId },
    });

    if (!account) {
      return res.status(404).json({ error: "account not found" });
    }

    const newInvoice = await Invoice.create({
      account_id: account_id,
      amount_due: amount_due,
      recurring: recurring,
      next_due_date: next_due_date,
      frequency: frequency,
    });

    const invoice = newInvoice.toJSON();

    return res.status(201).json(invoice);
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

export const update_invoice = async (req, res) => {
  const { id } = req.params;
  const invoiceId = id;
  const { id: userId } = req.user;
  const { account_id, amount_due, recurring, next_due_date, frequency } =
    req.body;

  const requiredFields = {
    account_id,
    amount_due,
    recurring,
    next_due_date,
    frequency,
  };

  if (!invoiceId) {
    return res.status(400).json({ error: "invoice id is missing" });
  }

  if (!account_id) {
    return res.status(400).json({ error: "account id is missing" });
  }

  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "" || !value) {
      return res.status(400).json({ error: "missing parameters" });
    }
  }

  try {
    const data = await Invoice.findOne({
      where: { id: invoiceId, account_id: account_id },
      include: { model: Account },
    });

    const invoice = data.toJSON();
    const { account: invoice_account } = invoice;
    const { user_id: account_userId } = invoice_account;

    if (!invoice) {
      return res.status(404).json({ error: "invoice not found" });
    }
    if (account_userId !== userId) {
      return res.status(403).json({ error: "unauthorized access" });
    }

    const [updated_rows] = await Invoice.update(
      { amount_due, recurring, next_due_date, frequency },
      { where: { id: invoiceId } }
    );

    const updated_invoice = await Invoice.findOne({ where: { id: invoiceId } });

    return res.status(202).json({ updated_invoice });
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      console.log("internal server error: ", error);
    }
    return res.status(500).json({ error: `internal server error` });
  }
};

export const pay_invoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findOne({
      where: { id },
      attributes: [
        "id",
        "next_due_date",
        "account_id",
        "amount_due",
        "paid",
        "frequency",
      ],
    });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    if (invoice.paid) {
      return res.status(400).json({
        error:
          "Cannot pay this invoice twice, please submit a transaction instead",
      });
    }

    const new_transaction = await Transaction.create({
      account_id: invoice.account_id,
      amount: invoice.amount_due,
      description: "Automatic",
      status: "paid",
    });
    if (!new_transaction) {
      return res.status(500).json({ error: "Could not post payment" });
    }

    await invoice.update({ paid: true }, { where: { id } });

    return res.status(201).json({ invoice });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const get_future_invoices = async (req, res) => {
  const { account_id } = req.params;

  try {
    const invoice = await Invoice.findOne({ where: { account_id } });
    if (!invoice) {
      return res.status(404).json({ error: "Could not find invoice" });
    }

    const futureBills = new RecurringBill(
      account_id,
      invoice.amount_due,
      invoice.next_due_date,
      invoice.frequency
    );

    if (!futureBills) {
      return res.status(400).json({ error: "Creation error" });
    }
    const invoiceList = futureBills.generateFutureBills();

    if (invoiceList.length === 0) {
      return res.status(400).json({ error: "Could not get future invoices" });
    }

    return res.status(200).json({ invoiceList });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};
