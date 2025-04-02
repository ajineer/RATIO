import { signupUserSchema } from "../../../middleware/schemas";
import { describe, expect, it } from "vitest";
import { emailCases, nameCases, passwordCases } from "./signupCases";

describe("User signup schema validation tests", () => {
  nameCases.forEach((nameCase) => {
    it(nameCase.description, () => {
      const { error } = signupUserSchema.validate(nameCase.data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(nameCase.expected);
    });
  });

  emailCases.forEach((emailCase) => {
    it(emailCase.description, () => {
      const { error } = signupUserSchema.validate(emailCase.data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(emailCase.expected);
    });
  });

  passwordCases.forEach((passwordCase) => {
    it(passwordCase.description, () => {
      const { error } = signupUserSchema.validate(passwordCase.data);
      expect(error).toBeDefined(),
        expect(error.details[0].message).toBe(passwordCase.expected);
    });
  });
});
