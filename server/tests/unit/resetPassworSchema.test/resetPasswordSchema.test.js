import { describe, it, expect } from "vitest";
import { resetPaswwordSchema } from "../../../middleware/schemas";
import {
  newPasswordCases,
  confirmNewPasswordCases,
  currentPasswordCases,
} from "./resetPasswordCases";
import { evaluate } from "../../testingUtilities";

describe("Reset password schema validation tests", () => {
  newPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, evaluate(resetPaswwordSchema, data, expectedValue));
  });
  confirmNewPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, evaluate(resetPaswwordSchema, data, expectedValue));
  });
  currentPasswordCases.forEach(({ description, data, expectedValue }) => {
    it(description, evaluate(resetPaswwordSchema, data, expectedValue));
  });
});
