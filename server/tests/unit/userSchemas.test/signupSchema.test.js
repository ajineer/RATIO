import { signupUserSchema } from "../../../middleware/schemas";
import { describe, expect, it } from "vitest";
import { emailCases, nameCases, passwordCases } from "./cases/signupCases";

describe("User signup schema validation tests", () => {
  nameCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = signupUserSchema.validate(data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(expectedValue);
    });
  });

  emailCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = signupUserSchema.validate(data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(expectedValue);
    });
  });

  passwordCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = signupUserSchema.validate(data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
