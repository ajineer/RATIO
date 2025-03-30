import {
  signupUserSchema,
  loginUserSchema,
  resetPaswwordSchema,
  addAccountSchema,
  updateAccountSchema,
  addInvoiceSchema,
  addTransactionSchema,
  getValidationResult,
} from "../../middleware/schemas";

import { describe, expect, it } from "vitest";

export const getErrorMessages = (schema, data) => {
  const { error } = schema.validate(data); // or schema.validateAsync(data) if async validation
  if (error) {
    return error.details;
    // .map((detail) => detail.message); // Return all error messages
  }
  return []; // No errors
};

const signup = {
  first_name: "user",
  last_name: "one",
  email: "userone@gmail.com",
  password: "Password123!",
  confirm_password: "Password123!",
};

describe("User signup schema validation tests", () => {
  // successful signup case
  //   it("should create a valid user", () => {
  //     const validSignup = {
  //       first_name: "user",
  //       last_name: "one",
  //       email: "userone@gmail.com",
  //       password: "Password123!",
  //       confirm_password: "Password123!",
  //     };
  //     const { error, value } = signupUserSchema.validate(validSignup);
  //     expect(error).toBe(undefined);
  //     expect(value).toStrictEqual(validSignup);
  //   });

  // first/last name tests
  it("should fail because the first/last name is null", () => {
    const invalidSignup = {
      ...signup,
      first_name: " ab ",
    };
    const errors = getErrorMessages(signupUserSchema, invalidSignup);
    console.log(errors);
    // expect(error).toBeDefined();
  });
  //   it("should fail because the first/last name is too short");
  //   it("should fail because the first/last name is too long");
  //   it("should fail because the first/last name is a wrong type");
  //   it("should fail because the first/last name contains invalid chars");
  //   it("should fail because the first/last name is missing altogether");
  //   // email tests
  //   it("should fail because email is missing");
  //   it("should fail because email is missing domain");
  //   it("should fail because email is missing '@'");
  //   it("should fail because email is wrong type");
  //   // password tests
  //   it("should fail because password is missing");
  //   it("should fail because password is too short");
  //   it("should fail because password is missing required chars or capitals");
  //   it("should fail because password is missing a required number");
  //   // confirm password tests
  //   it("should fail because confirm password is missing");
  //   it("should fail because confirm password doesn't match password");
});
