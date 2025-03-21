import { addDays, addMonths, addWeeks } from "date-fns";

class RecurringBill {
  static listQuantity = {
    monthly: 6,
    weekly: 9,
    quarterly: 4,
    daily: 30,
    annually: 2,
  };

  constructor(accountId, amount, dueDate, frequency) {
    this.accountId = accountId;
    this.amount = amount;
    this.dueDate = dueDate;
    this.frequency = frequency;
  }

  getNextDueDate() {
    switch (this.frequency) {
      case "monthly":
        this.dueDate = addMonths(this.dueDate, 1);
        break;
      case "weekly":
        this.dueDate = addWeeks(this.dueDate, 1);
        break;
      case "quarterly":
        this.dueDate = addMonths(this.dueDate, 3);
        break;
      case "daily":
        this.dueDate = addDays(this.dueDate, 1);
        break;
      case "annually":
        this.dueDate = addYears(this.dueDate, 1);
        break;
      default:
        throw new Error("Unknown frequency");
    }

    return this.dueDate;
  }

  generateFutureBills() {
    let futureBills = [];
    let nextDueDate = this.dueDate;
    const epochs = RecurringBill.listQuantity[this.frequency];

    for (let i = 0; i < epochs; i++) {
      futureBills.push({
        accountId: this.accountId,
        amount: this.amount,
        dueDate: nextDueDate,
        status: "pending",
      });
      nextDueDate = this.getNextDueDate();
    }

    return futureBills;
  }
}

export default RecurringBill;
