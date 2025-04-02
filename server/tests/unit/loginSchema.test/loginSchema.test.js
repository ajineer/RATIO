import { loginUserSchema } from "../../../middleware/schemas";
import { describe, expect, it } from "vitest";
import { emailLoginCases, passwordLoginCases } from "./loginCases";

describe("User login schema tests", () => {
  emailLoginCases.forEach((emailLoginCase) => {
    it(emailLoginCase.description, () => {
      const { error } = loginUserSchema.validate(emailLoginCase.data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(emailLoginCase.expected);
    });
    passwordLoginCases.forEach((passwordLoginCase) => {
      it(passwordLoginCases.description, () => {
        const { error } = loginUserSchema.validate(passwordLoginCase.data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(passwordLoginCase.expected);
      });
    });
  });
});
