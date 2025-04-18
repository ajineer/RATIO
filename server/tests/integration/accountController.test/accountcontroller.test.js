import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  get_accounts,
  add_account,
  update_account,
  delete_account,
} from "../../../controllers/accountController";
import { login, signup } from "../../../controllers/userController";
import { mockRes } from "../testUtils";
import sequelize from "../../../db";

let token;
const signupBody = {
  body: {
    first_name: "user",
    last_name: "one",
    email: "userone@gmail.com",
    password: "Password123!",
    confirm_password: "Password123!",
  },
};

const loginBody = {
  body: {
    email: "userone@gmail.com",
    password: "Password123!",
  },
};

describe("Retrieving accounts tests", () => {
  const signupReq = {
    ...signupBody,
  };

  const signupRes = mockRes();

  const loginReq = {
    ...loginBody,
  };

  const loginRes = mockRes();

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await signup(signupReq, signupRes);
    await login(loginReq, loginRes);
    token = loginRes.body.token;
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
    const user = loginRes.body.user;
    const userId = user.id;
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
    await sequelize.query("DELETE FROM old_passwords");
    await sequelize.query("DELETE FROM expired_tokens");
    await sequelize.query("DELETE FROM users");
  });
});

describe("Adding accounts test", () => {
  const signupReq = {
    ...signupBody,
  };

  const signupRes = mockRes();

  const loginReq = {
    ...loginBody,
  };

  const loginRes = mockRes();
  let user;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await signup(signupReq, signupRes);
    await login(loginReq, loginRes);
    user = loginRes.body.user;
    token = loginRes.body.token;
  });

  it("should fail because the user is not attached to the request", async () => {
    const id = user.id;
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

  it("should successfully add the account associated with the logged in user", async () => {
    const id = user.id;
    const newAccount = {
      name: "USAA",
      starting_balance: 1300,
      balance: 1300,
      type: "bill",
      description: "car insurance for the ru",
    };
    const addAccountReq = {
      body: {
        ...newAccount,
      },
      user: { id: id },
    };
    const addAccountRes = mockRes();

    await add_account(addAccountReq, addAccountRes);

    console.log("successful add account res: ", addAccountRes);
    const { name, starting_balance, balance, type, description } =
      addAccountRes.body.dataValues;
    expect(addAccountRes.status).toBe(201);
    expect(name).toBe(newAccount.name);
    expect(starting_balance).toBe(newAccount.starting_balance);
    expect(balance).toBe(newAccount.starting_balance);
    expect(type).toBe(newAccount.type);
    expect(description).toBe(newAccount.description);
  });

  afterAll(async () => {
    await sequelize.query("DELETE FROM old_passwords");
    await sequelize.query("DELETE FROM expired_tokens");
    await sequelize.query("DELETE FROM accounts");
    await sequelize.query("DELETE FROM users");
  });
});
