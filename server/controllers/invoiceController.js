import Transaction from "../models/Transaction.js";
import RecurringBill from "../models/RecurringBill.js";
import Invoice from "../models/invoice.js";
import { addDays, addMonths, addWeeks } from "date-fns";

export const add_invoice = async (req, res) => {
  const { account_id, recurring, next_due_date, frequency, amount_due } =
    req.body;
  try {
    const newInvoice = await Invoice.create({
      account_id: account_id,
      amount_due: amount_due,
      recurring: recurring,
      next_due_date: next_due_date,
      frequency: frequency,
    });

    if (!newInvoice) {
      return res.status(500).json({ error: "Could not add invoice" });
    }
    return res.status(201).json({ newInvoice });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const update_invoice = async (req, res) => {
  const { id } = req.params;
  const { amount_due, recurring, next_due_date, frequency } = req.body;

  try {
    const [updated_rows] = await Invoice.update(
      { amount_due, recurring, next_due_date, frequency },
      { where: { id } }
    );

    if (!updated_rows) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    const updated_invoice = await Invoice.findOne({ where: { id } });
    return res.status(202).json({ updated_invoice });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error ${error}` });
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
  const { account_id } = req.body;

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
