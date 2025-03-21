import Account from "../models/Account.js";
import Invoice from "../models/invoice.js";
import RecurringBill from "../models/RecurringBill.js";

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
