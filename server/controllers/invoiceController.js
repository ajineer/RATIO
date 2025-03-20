import Invoice from "../models/invoice";
import RecurringBill from "../models/RecurringBill";

export const add_invoice = async (req, res) => {
  const { account_id, recurring, next_due_date, frequency } = req.body;
  try {
    const newInvoice = await Invoice.create({
      account_id: account_id,
      recurring: recurring,
      next_due_date: next_due_date,
      frequency: frequency,
    });

    const futureInvoices = new RecurringBill({
      account_id,
      recurring,
      next_due_date,
      frequency,
    });

    if (!newInvoice) {
      return res.status(500).json({ error: "Could not add invoice" });
    }
    return res.status(201).json({ newInvoice, futureInvoices });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error}` });
  }
};
