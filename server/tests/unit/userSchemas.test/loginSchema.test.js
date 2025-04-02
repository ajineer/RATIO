import { loginUserSchema } from "../../../middleware/schemas";
import { describe, expect, it } from "vitest";
import { emailLoginCases, passwordLoginCases } from "./cases/loginCases.js";

describe("User login schema tests", () => {
  emailLoginCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = loginUserSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
    passwordLoginCases.forEach(({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = loginUserSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    });
  });
});
