import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  add_invoice,
  get_future_invoices,
  pay_invoice,
  update_invoice,
} from "../../../controllers/invoiceController";
import Invoice from "../../../models/invoice";
import {
  addAccount,
  afterAllCallBack,
  beforeAllCallBack,
  mockRes,
} from "../testUtils";

let userId;
let account;
let accountBody = {
  user_id: "",
  name: "USAA",
  description: "auto insurance for the ru",
  type: "bill",
  starting_balance: 2750,
  balance: 2750,
};

describe("", () => {
  const invoiceBody = {
    account_id: "",
    amount_due: 50,
    recurring: true,
    next_due_date: new Date("2035-01-15"),
    frequency: "monthly",
  };
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
    account = await addAccount({ ...accountBody, user: user });
  });
  it("Should fail because there is no account id", async () => {
    const addInvoiceReq = {
      body: { ...invoiceBody, account_id: account.id },
      user: user,
    };
  });

  afterAll(async () => {
    await afterAllCallBack();
  });
});

describe("", () => {
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
  });
  afterAll(async () => {
    await afterAllCallBack();
  });
});

describe("", () => {
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
  });
  afterAll(async () => {
    await afterAllCallBack();
  });
});

describe("", () => {
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
  });
  afterAll(async () => {
    await afterAllCallBack();
  });
});
