import request from "supertest";
import app from "../../app.js";
import { config } from "dotenv";
import { describe, expect, it } from "vitest";
import { generateInvalidCases } from "../../middleware/utils.js";
import Joi from "joi";

config();

const validUser = {
  first_name: "user",
  last_name: "one",
  email: "userone@gmail.com",
  password: "Password123!",
  confirm_password: "Password123!",
};

const emails = {
  1: "userOne@gmail.com",
  2: "userTwo@gmail.com",
  3: "userThree@gmail.com",
  4: "userFour@gmail.com",
  5: "userFive@gmail.com",
  6: "userSix@gmail.com",
  7: "userSeven@gmail.com",
  8: "userEight@gmail.com",
  9: "userNine@gmail.com",
};

const signupTransformations = [
  (value) => "", // Empty string
  (value) => null, // Null value
  (value) => (typeof value === "string" ? 12345 : "wrong_type"), // Wrong data type
  (value) =>
    typeof value === "string"
      ? { id: 1, user: ["one", "two", "three"] }
      : "wrong_type", // Wrong data type
  (value) => (typeof value === "string" ? value.repeat(50) : value), // Exceed max length (if applicable)
];

const invalidUsers = generateInvalidCases(validUser, signupTransformations);

invalidUsers.push(
  {
    description: "empty first name",
    data: { ...validUser, email: emails[1], first_name: "" },
    expectedStatus: 400,
  },
  {
    description: "empty last name",
    data: { ...validUser, email: emails[2], last_name: "" },
    expectedStatus: 400,
  },
  {
    description: "empty password with confirm password",
    data: {
      ...validUser,
      email: emails[3],
      password: "",
      confirm_password: "Password123!",
    },
    expectedStatus: 400,
  },
  {
    description: "empty password and empty confirm password",
    data: {
      ...validUser,
      email: emails[4],
      password: "",
      confirm_password: "Password123!",
    },
    expectedStatus: 400,
  },
  {
    description: "invalid email format",
    data: { ...validUser, email: "notanemail" },
    expectedStatus: 400,
  },
  {
    description: "passwords do not match",
    data: {
      ...validUser,
      email: emails[5],
      confirm_password: "WrongPass123!",
    },
    expectedStatus: 400,
  },
  {
    description: "wrong data in body entirley",
    data: {
      spouse: "Alex",
      linkedin: "www.LinkedIn.com/Eve",
      gender: "female",
      ...validUser,
    },
    expectedStatus: 400,
  },
  { description: "missing request body", data: {}, expectedStatus: 400 },
  {
    description: "missing password and confirmation password",
    data: {
      ...validUser,
      email: emails[6],
      password: null,
      confirm_password: null,
    },
    expectedStatus: 400,
  }
  // {
  //   description: "Successfully create user",
  //   data: {
  //     ...validUser,
  //   },
  //   expectedStatus: 201,
  // }
);

describe("User API Signup Tests", () => {
  invalidUsers.forEach(({ description, data, expectedStatus }, epoch) => {
    it(`Should fail to register new user (${description})`, async () => {
      const res = await request(app).post("/api/user/signup").send(data);
      console.log(
        epoch,
        "first_name: ",
        `${data.first_name}`,
        "last_name: ",
        `${data.last_name}`,
        "password: ",
        `${data.confirm_password}`,
        "email: ",
        `${data.email}`,
        "password: ",
        `${data.password}`,
        "confirm_password: ",
        `${data.confirm_password}`,
        "\n",
        `Expected: ${expectedStatus}`,
        "\n",
        `Got: ${res.status}`
      );
      expect(res.status).toBe(expectedStatus);
    });
  });
});

const validLogin = {
  email: "userone@gmail.com",
  password: "Password123!",
};

const stripATemail = (string) => {
  string.replace("@", "");
  return string;
};

const stripDOMAINemail = (string) => {
  string.replace(/\..+$/, "");
  return string;
};

const loginTransformations = [
  (value) => "", // Empty string
  (value) => null, // Null value
  (value) =>
    typeof value === Joi.string().email() ? stripATemail(value) : "missing @", // Wrong data type
  (value) =>
    typeof value === Joi.string().email()
      ? stripDOMAINemail(value)
      : "missing domain (ex: '.com')", // Wrong data type
];

const invalidLogins = generateInvalidCases(validLogin, loginTransformations);

invalidLogins.push({
  description: "Invalid email format",
  data: { ...validLogin, email: "userTwo@gmail.com" },
  expectedStatus: 404,
});

describe("User API login Tests", () => {
  invalidLogins.forEach(({ description, data, expectedStatus }, epoch) => {
    it(`Should fail to login user (${description})`, async () => {
      const res = await request(app).post("/api/user/login").send(data);
      console.log(
        epoch,
        "email: ",
        `${data.email}`,
        "password: ",
        `${data.password}`,
        "\n",
        `Expected: ${expectedStatus}`,
        "\n",
        `Got: ${res.status}`
      );
      expect(res.status).toBe(expectedStatus);
    });
  });
});
