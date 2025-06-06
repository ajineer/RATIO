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
      user: {},
    };

    const getAccountsRes = mockRes();
    const {
      status,
      body: { error },
    } = await get_accounts(getAccountsReq, getAccountsRes);
    expect(status).toBe(400);
    expect(error).toBe("user not found");
  });

  it("should fail because there are no accounts for the user", async () => {
    const getAccountsReq = {
      user: { id: userId },
    };
    const getAccountsRes = mockRes();

    const {
      status,
      body: { error },
    } = await get_accounts(getAccountsReq, getAccountsRes);

    expect(status).toBe(404);
    expect(error).toBe("no accounts found for this user");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "users"]);
  });
});

describe("Adding accounts test", () => {
  const addAccountBody = {
    name: "USAA",
    description: "car insurance for the ru",
    type: "bill",
    starting_balance: 3400,
    balance: 3400,
  };
  let accountArr = [];
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

    const {
      status,
      body: { error },
    } = await add_account(addAccountReq, addAccountRes);

    expect(status).toBe(401);
    expect(error).toBe("unauthorized");
  });

  it("Should fail because the body is invalid", async () => {
    const addAccountReq = {
      body: {},
      user: { id: userId },
    };

    const addAccountRes = mockRes();

    const {
      status,
      body: { error },
    } = await add_account(addAccountReq, addAccountRes);

    expect(status).toBe(400);
    expect(error).toBe("null or undefined body");
  });

  it("Should successfully create a new account for the user", async () => {
    const addAccountReq = {
      body: { ...addAccountBody },
      user: { id: userId },
    };

    const addAccountRes = mockRes();

    const { status, body } = await add_account(addAccountReq, addAccountRes);

    const { name, description, type, starting_balance, balance } = body;

    expect(status).toBe(201);
    expect(name).toBe(addAccountBody.name);
    expect(description).toBe(addAccountBody.description);
    expect(type).toBe(addAccountBody.type);
    expect(starting_balance).toBe(addAccountBody.starting_balance);
    expect(balance).toBe(addAccountBody.balance);
    accountArr.push(body);
  });

  it("Should successfully retrieve the accounts for the user", async () => {
    const getAccountsReq = { user: { id: userId } };
    const getAccountRes = mockRes();
    const { status, body: accounts } = await get_accounts(
      getAccountsReq,
      getAccountRes
    );
    const { name, description, type, starting_balance, balance } = accounts[0];

    expect(status).toBe(200);
    expect(accounts.length).toEqual(accountArr.length);
    expect(name).toBe(accountArr[0].name);
    expect(description).toBe(accountArr[0].description);
    expect(type).toBe(accountArr[0].type);
    expect(starting_balance).toBe(accountArr[0].starting_balance);
    expect(balance).toBe(accountArr[0].balance);
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
    console.log("before account: ", account);
  });

  it("should fail because the account id is not provided", async () => {
    const updateAccountReq = {
      params: {},
      body: { ...account },
    };

    const updateAccountRes = mockRes();
    const {
      status,
      body: { error },
    } = await update_account(updateAccountReq, updateAccountRes);

    expect(status).toBe(400);
    expect(error).toBe("account id missing");
  });

  it("should fail because account was deleted", async () => {
    console.log("Account, id: ", account);
    await Account.destroy({ where: { id: account.id } });
    const updateAccountReq = {
      params: { id: account.id },
      body: { balance: 1300, ...account },
    };
    const updateAccountRes = mockRes();

    const {
      status,
      body: { error },
    } = await update_account(updateAccountReq, updateAccountRes);

    expect(status).toBe(404);
    expect(error).toBe("account not found");
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

    // const accountRes =
    const { body } = await add_account(addAccountReq2, addAccountRes2);
    const account2 = body;

    const updateAccountReq = {
      params: { id: account2.id },
      body: { ...account2, description: "Flatiron loan" },
    };
    const updateAccountRes = mockRes();

    const {
      status,
      body: {
        account: { description },
      },
    } = await update_account(updateAccountReq, updateAccountRes);

    expect(status).toBe(202);
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

    const {
      status,
      body: { error },
    } = await delete_account(deleteReq, deleteRes);

    expect(status).toBe(400);
    expect(error).toBe("no account id provided");
  });

  it("Should fail because the user id is not provided", async () => {
    const deleteReq = { user: {}, params: { id: account.id } };
    const deleteRes = mockRes();

    const {
      status,
      body: { error },
    } = await delete_account(deleteReq, deleteRes);

    expect(status).toBe(401);
    expect(error).toBe("unauthorized");
  });

  it("Should successfully delete the account", async () => {
    const deleteReq = { user: { id: userId }, params: { id: account.id } };
    const deleteRes = mockRes();

    const {
      status,
      body: { message },
    } = await delete_account(deleteReq, deleteRes);

    expect(status).toBe(202);
    expect(message).toBe("account deleted");
  });

  afterAll(async () => {
    await afterAllCallBack(["expired_tokens", "accounts", "users"]);
  });
});
