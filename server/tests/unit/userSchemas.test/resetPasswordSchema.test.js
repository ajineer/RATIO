import { describe, it, expect } from "vitest";
import { resetPaswwordSchema } from "../../../middleware/schemas";
import {
  newPasswordCases,
  confirmNewPasswordCases,
  currentPasswordCases,
} from "./cases/resetPasswordCases";

describe("Reset password schema validation tests", () => {
  newPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = resetPaswwordSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  confirmNewPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = resetPaswwordSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  currentPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = resetPaswwordSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
