import { vi } from "vitest";
import { login, signup } from "../../controllers/userController";
import { add_account } from "../../controllers/accountController";
import db from "../../db";
const { sequelize } = db;

export const mockRes = () => {
  const res = { status: null, body: null };

  res.ok = vi.fn().mockImplementation((bool) => {
    res.ok = bool;
    return res;
  });

  res.status = vi.fn().mockImplementation((code) => {
    res.status = code;
    return res;
  });
  res.json = vi.fn().mockImplementation((data) => {
    res.body = data;
    return res;
  });
  res.send = vi.fn().mockImplementation((data) => {
    res.body = data;
    return res;
  });
  res.cookie = vi.fn().mockImplementation((data) => {
    res.cookie = data || undefined;
  });
  return res;
};

export const signUpUser = async (
  data = {
    body: {
      first_name: "test",
      last_name: "user",
      email: "testuser@gmail.com",
      password: "Password123!",
      confirm_password: "Password123!",
    },
  }
) => {
  const signupReq = { ...data };
  const signupRes = mockRes();
  await signup(signupReq, signupRes);
  return signupRes;
};

export const loginUser = async (
  data = { body: { email: "testuser@gmail.com", password: "Password123!" } }
) => {
  const loginReq = { ...data };
  const loginRes = mockRes();

  await login(loginReq, loginRes);
  return loginRes.body;
};

export const addAccount = async (data) => {
  const addAccountReq = { body: { ...data }, user: data.user };
  const addAccountRes = mockRes();

  await add_account(addAccountReq, addAccountRes);
  return addAccountRes.body;
};

export const beforeAllCallBack = async () => {
  await sequelize.sync({ force: true });
  await signUpUser();
  const { user } = await loginUser();
  return user;
};

export const afterAllCallBack = async (tables) => {
  await Promise.all(
    tables.map((table) => sequelize.query(`DELETE FROM ${table}`))
  );
};
