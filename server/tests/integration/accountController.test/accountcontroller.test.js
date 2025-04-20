import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  get_accounts,
  add_account,
  update_account,
  delete_account,
} from "../../../controllers/accountController";
import {
  addAccount,
  afterAllCallBack,
  beforeAllCallBack,
  mockRes,
} from "../testUtils";
import Account from "../../../models/Account";

let userId;

describe("Retrieving accounts tests", () => {
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
  });

  it("should fail because there is no user", async () => {
    const getAccountsReq = {
      body: {
        user: {},
      },
    };

    const getAccountsRes = mockRes();
    await get_accounts(getAccountsReq, getAccountsRes);
    expect(getAccountsRes.status).toBe(400);
    expect(getAccountsRes.body.error).toBe("user not found");
  });

  it("should fail because there are no accounts for the user", async () => {
    const getAccountsReq = {
      body: {
        user: { id: userId },
      },
    };
    const getAccountsRes = mockRes();

    await get_accounts(getAccountsReq, getAccountsRes);

    expect(getAccountsRes.status).toBe(404);
    expect(getAccountsRes.body.error).toBe("no accounts found for this user");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "users"]);
  });
});

describe("Adding accounts test", () => {
  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
  });

  it("should fail because the user is not attached to the request", async () => {
    const addAccountReq = {
      body: {
        name: "USAA",
        starting_balance: 1300,
        balance: 1000,
        type: "bill",
        description: "car insurance for the ru",
      },
      user: {},
    };
    const addAccountRes = mockRes();

    await add_account(addAccountReq, addAccountRes);

    expect(addAccountRes.status).toBe(401);
    expect(addAccountRes.body.error).toBe("unauthorized");
  });

  afterAll(async () => {
    await afterAllCallBack([
      "old_passwords",
      "expired_tokens",
      "accounts",
      "users",
    ]);
  });
});

describe("Updating account tests", () => {
  let account;
  const addAccountBody = {
    user_id: userId,
    name: "USAA",
    description: "auto insurance for the ru",
    starting_balance: 2375,
    balance: 2375,
    type: "bill",
  };

  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;

    account = await addAccount({ ...addAccountBody, user: user });
  });

  it("should fail because the account id is not provided", async () => {
    const updateAccountReq = {
      params: {},
      body: { ...account },
    };

    const updateAccountRes = mockRes();
    await update_account(updateAccountReq, updateAccountRes);

    expect(updateAccountRes.status).toBe(400);
    expect(updateAccountRes.body.error).toBe("account id missing");
  });

  it("should fail because account was deleted", async () => {
    await Account.destroy({ where: { id: account.id } });
    const updateAccountReq = {
      params: { id: account.id },
      body: { balance: 1300, ...account },
    };
    const updateAccountRes = mockRes();

    await update_account(updateAccountReq, updateAccountRes);

    expect(updateAccountRes.status).toBe(404);
    expect(updateAccountRes.body.error).toBe("account not found");
  });

  it("should successfully update the account", async () => {
    const addAccountReq2 = {
      user: { id: userId },
      body: {
        name: "ascent",
        description: "BIG mistake",
        starting_balance: 25000,
        balance: 25000,
        type: "bill",
      },
    };
    const addAccountRes2 = mockRes();

    await add_account(addAccountReq2, addAccountRes2);

    const account2 = addAccountRes2.body.dataValues;
    const updateAccountReq = {
      params: { id: account2.id },
      body: { ...account2, description: "Flatiron loan" },
    };
    const updateAccountRes = mockRes();

    await update_account(updateAccountReq, updateAccountRes);
    const { description } = updateAccountRes.body.account;

    expect(updateAccountRes.status).toBe(202);
    expect(description).toBe("Flatiron loan");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "accounts", "users"]);
  });
});

describe("Delete account tests", () => {
  let account;
  let addAccountBody = {
    user_id: userId,
    name: "USAA",
    description: "auto insurance for the ru",
    starting_balance: 2375,
    balance: 2375,
    type: "bill",
  };

  beforeAll(async () => {
    const user = await beforeAllCallBack();
    userId = user.id;
    account = await addAccount({ ...addAccountBody, user: user });
  });

  it("Should fail because the account id is not provided", async () => {
    const deleteReq = { user: { id: userId }, params: {} };
    const deleteRes = mockRes();

    await delete_account(deleteReq, deleteRes);

    expect(deleteRes.status).toBe(400);
    expect(deleteRes.body.error).toBe("no account id provided");
  });

  it("Should fail because the user id is not provided", async () => {
    const deleteReq = { user: {}, params: { id: account.id } };
    const deleteRes = mockRes();

    await delete_account(deleteReq, deleteRes);

    expect(deleteRes.status).toBe(401);
    expect(deleteRes.body.error).toBe("unauthorized");
  });

  it("Should successfully delete the account", async () => {
    const deleteReq = { user: { id: userId }, params: { id: account.id } };
    const deleteRes = mockRes();

    await delete_account(deleteReq, deleteRes);

    expect(deleteRes.status).toBe(202);
    expect(deleteRes.body.message).toBe("account deleted");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "accounts", "users"]);
  });
});
