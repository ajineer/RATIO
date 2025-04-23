import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  add_invoice,
  get_future_invoices,
  pay_invoice,
  update_invoice,
} from "../../../controllers/invoiceController";
import {
  addAccount,
  afterAllCallBack,
  beforeAllCallBack,
  mockRes,
} from "../testUtils";
import { add_account } from "../../../controllers/accountController";

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

describe("Adding invoice controller tests", () => {
  const invoiceBody = {
    account_id: "",
    amount_due: 50,
    recurring: true,
    next_due_date: new Date("2035-01-15"),
    frequency: "monthly",
  };

  const { amount_due, recurring, next_due_date, frequency } = invoiceBody;

  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
    account = await addAccount({ ...accountBody, user: { id: userId } });
  });

  it("Should fail because there is no account id", async () => {
    const addInvoiceReq = {
      body: { ...invoiceBody },
      user: { id: userId },
    };

    const addInvoiceRes = mockRes();

    const {
      status,
      body: { error },
    } = await add_invoice(addInvoiceReq, addInvoiceRes);

    expect(status).toBe(404);
    expect(error).toBe("account not found");
  });

  it("Should fail because there is no user", async () => {
    const addInvoiceReq = {
      body: { ...invoiceBody, account_id: account.id },
      user: {},
    };
    const addInvoiceRes = mockRes();

    const {
      status,
      body: { error },
    } = await add_invoice(addInvoiceReq, addInvoiceRes);

    expect(status).toBe(401);
    expect(error).toBe("unauthorized");
  });

  it("Should successfully create a new invoice", async () => {
    const addInvoiceReq = {
      body: { ...invoiceBody, account_id: account.id },
      user: { id: userId },
    };
    const addInvoiceRes = mockRes();

    const {
      status,
      body: {
        account_id,
        paid,
        amount_due,
        recurring,
        next_due_date,
        frequency,
      },
    } = await add_invoice(addInvoiceReq, addInvoiceRes);

    expect(status).toBe(201);
    expect(paid).toEqual(false);
    expect(account_id).toBe(account.id);
    expect(amount_due).toBe(invoiceBody.amount_due);
    expect(recurring).toBe(invoiceBody.recurring);
    expect(next_due_date).toEqual(invoiceBody.next_due_date);
    expect(frequency).toBe(invoiceBody.frequency);
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "invoices", "accounts", "users"]);
  });
});

describe("", () => {
  let accountId;
  let invoice;

  beforeAll(async () => {
    // create, login, and return the user
    const user = await beforeAllCallBack();
    userId = user.id;

    // create the request and response for adding and account
    const addAccountReq = { body: { ...accountBody }, user: { id: userId } };
    const addAccountRes = mockRes();
    const add_account_res = await add_account(addAccountReq, addAccountRes);
    const { status, body } = add_account_res;
    account = body;

    // console.log("destructured response: ", status, account);
    accountId = account.id;

    // create the invoice to update
    const invoiceBody = {
      account_id: accountId,
      amount_due: 50,
      recurring: true,
      next_due_date: new Date("2035-01-15"),
      frequency: "monthly",
    };
    const addInvoiceReq = { user: { id: userId }, body: { ...invoiceBody } };
    const addInvoiceRes = mockRes();
    const addInvRes = await add_invoice(addInvoiceReq, addInvoiceRes);
    const { status: invoice_status, body: invoice_res } = addInvRes;
    invoice = invoice_res;
  });

  it("Should fail because the invoice id is not provided", async () => {
    const { recurring, next_due_date, frequency } = invoice;
    const updateInvoiceReq = {
      user: { id: userId },
      body: {
        account_id: accountId,
        amount_due: 100,
        recurring,
        next_due_date,
        frequency,
      },
      params: { id: "" },
    };
    const updateInvoiceRes = mockRes();

    const {
      status,
      body: { error },
    } = await update_invoice(updateInvoiceReq, updateInvoiceRes);

    expect(status).toBe(400);
    expect(error).toBe("invoice id is missing");
  });
  it("Should fail because the account id is not provided", async () => {
    const { recurring, next_due_date, frequency } = invoice;
    const updateInvoiceReq = {
      user: { id: userId },
      body: {
        account_id: "",
        amount_due: 100,
        recurring,
        next_due_date,
        frequency,
      },
      params: { id: invoice.id },
    };
    const updateInvoiceRes = mockRes();

    const {
      status,
      body: { error },
    } = await update_invoice(updateInvoiceReq, updateInvoiceRes);

    expect(status).toBe(400);
    expect(error).toBe("account id is missing");
  });

  it("should fail because the body or required fields is missing", async () => {
    const updateInvoiceReq = {
      params: { id: invoice.id },
      body: { account_id: accountId },
      user: { id: userId },
    };
    const updateInvoiceRes = mockRes();
    const updateRes = await update_invoice(updateInvoiceReq, updateInvoiceRes);
    const {
      status,
      body: { error },
    } = updateRes;
    expect(status).toBe(400);
    expect(error).toBe("missing parameters");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "invoices", "accounts", "users"]);
  });
});

// describe("", () => {
//   beforeAll(async () => {
//     const user = await beforeAllCallBack();
//     userId = user.id;
//   });
//   afterAll(async () => {
//     await afterAllCallBack();
//   });
// });

// describe("", () => {
//   beforeAll(async () => {
//     const user = await beforeAllCallBack();
//     userId = user.id;
//   });
//   afterAll(async () => {
//     await afterAllCallBack();
//   });
// });
