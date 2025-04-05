import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  afterAll,
  beforeAll,
} from "vitest";
import { login, signup } from "../../../controllers/userController.js";
import { loginCases, userSignupCases } from "./cases.js";
import { mockRes } from "../testUtils.js";
import sequelize from "../../../db.js";

describe("User signup/login test cases", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    //   await sequelize.query('DELETE FROM "users"')
  });
  userSignupCases.forEach(({ description, data, expectedValue }) => {
    it(description, async () => {
      const req = { body: data };
      const res = mockRes();
      await signup(req, res);
      expect(res.status).toBe(expectedValue.status);
      expect(res.body).toEqual(expectedValue.body);
    });
  });

  loginCases.forEach(({ description, data, expectedValue }) => {
    it(description, async () => {
      const req = { body: data };
      const res = mockRes();
      await login(req, res);
      console.log("response: ", res.body);
      expect(res.status).toBe(expectedValue.status);
      expect(res.body).toEqual(expectedValue.body);
    });
  });
  afterAll(async () => {
    await sequelize.query('DELETE FROM "users"');
  });
});
