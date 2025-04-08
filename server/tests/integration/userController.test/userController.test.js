import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  afterAll,
  beforeAll,
  vi,
} from "vitest";
import { login, logout, signup } from "../../../controllers/userController.js";
import { loginCases, logoutCases, userSignupCases } from "./cases.js";
import { mockRes } from "../testUtils.js";
import sequelize from "../../../db.js";
import User from "../../../models/User.js";

describe("User signup test cases", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  userSignupCases.forEach(({ description, data, expectedValue }) => {
    it(description, async () => {
      const req = { body: data };
      const res = mockRes();
      await signup(req, res);
      const user = res.body.user;
      expect(res.status).toBe(expectedValue.status);
      if (res.status === 201) {
        expect(res.message).toEqual(expectedValue.message);
        expect(res.body.user.email).toEqual(expectedValue.body.user.email);
        expect(res.body.user.id).toEqual(user.id);
      } else {
        expect(res.body).toEqual(expectedValue.body);
      }
    });
  });
  afterAll(async () => {
    await sequelize.query('DELETE FROM "users"');
  });
});

describe("User login test cases", async () => {
  let user = { id: null, email: null };
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const req = {
      body: {
        first_name: "user",
        last_name: "one",
        email: "userone@gmail.com",
        password: "Password123!",
        confirm_password: "Password123!",
      },
    };
    const res = mockRes();
    await signup(req, res);
    user.id = res.body.user.id;
    user.email = res.body.user.email;
  });
  loginCases.forEach(({ description, data, expectedValue }) => {
    it(description, async () => {
      const req = { body: data };
      const res = mockRes();
      await login(req, res);
      if (res.status === 201) {
        expect(res.body.user).toEqual({
          id: user.id,
          email: user.email,
        });
      } else {
        expect(res.body).toEqual(expectedValue.body);
      }
    });
  });
  afterAll(async () => {
    await sequelize.query('DELETE FROM "users"');
  });

  it("Should fail because user doesn't exist", async () => {
    const req = {
      body: { email: "usertwo@outlook.com", password: "does not matter" },
    };
    const res = mockRes();
    await login(req, res);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("user not found");
  });
});

describe("User logout cases", () => {
  let token;
  let user_id;
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    const signupReq = {
      body: {
        first_name: "user",
        last_name: "one",
        email: "userone@yahoo.com",
        password: "Password123!",
        confirm_password: "Password123!",
      },
    };
    const signupRes = mockRes();
    await signup(signupReq, signupRes);
    const user = await User.findOne({ where: { email: "userone@yahoo.com" } });
    user_id = user.id;
    const loginReq = {
      body: {
        email: "userone@yahoo.com",
        password: "Password123!",
      },
    };
    const loginRes = mockRes();
    await login(loginReq, loginRes);
    token = loginRes.body.token;
  });

  it("Should fail to logout user because the token is fake", async () => {
    const logoutReq = {
      cookies: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjg1NzY4MDB9.dQw4w9WgXcQJkS0g9W1h4fH9ZxX1OQqUj4tV9d4PzXU",
      },
      user_id: user_id,
    };
    const logoutRes = mockRes();
    await logout(logoutReq, logoutRes);
    expect(logoutRes.status).toBe(500);
    expect(logoutRes.body.error).toBe("invalid signature");
  });
  it("Should successfully logout the user", async () => {
    const logoutReq = {
      cookies: { token },
      user_id: user_id,
    };
    const logoutRes = mockRes();
    await logout(logoutReq, logoutRes);
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body.message).toEqual("user logged out");
  });

  it("Should fail because user and token don't exist any more", async () => {
    let token;
    const signupReq = {
      body: {
        first_name: "user",
        last_name: "two",
        email: "usertwo@yahoo.com",
        password: "Password123@",
        confirm_password: "Password123@",
      },
    };
    const signupRes = mockRes();
    await signup(signupReq, signupRes);
    const loginReq = {
      body: {
        email: "usertwo@yahoo.com",
        password: "Password123@",
      },
    };
    const loginRes = mockRes();
    await login(loginReq, loginRes);
    token = loginRes.body.token;
    const user = await User.findOne({ where: { email: "usertwo@yahoo.com" } });
    await User.destroy({ where: { id: user.id } });
    const logoutReq = {
      cookies: { token },
      user_id: user.id,
    };
    const logoutRes = mockRes();
    await logout(logoutReq, logoutRes);
    console.log("res: ", logoutRes);
    expect(logoutRes.status).toBe(400);
    expect(logoutRes.body.error).toBe("user could not be found");
  });
  it("Should fail because there is no token", async () => {
    let token;
    const signupReq = {
      body: {
        first_name: "user",
        last_name: "three",
        email: "userthree@yahoo.com",
        password: "Password123@",
        confirm_password: "Password123@",
      },
    };
    const signupRes = mockRes();
    await signup(signupReq, signupRes);
    const loginReq = {
      body: {
        email: "userthree@yahoo.com",
        password: "Password123@",
      },
    };
    const loginRes = mockRes();
    await login(loginReq, loginRes);
    const user = await User.findOne({
      where: { email: "userthree@yahoo.com" },
    });
    const logoutReq = {
      cookies: { token },
      user_id: user.id,
    };
    const logoutRes = mockRes();
    await logout(logoutReq, logoutRes);
    expect(logoutRes.status).toBe(400);
    expect(logoutRes.body.error).toBe("No token found");
  });
  afterAll(async () => {
    await sequelize.query('DELETE FROM "expired_tokens"');
    await sequelize.query('DELETE FROM "users"');
  });
});
