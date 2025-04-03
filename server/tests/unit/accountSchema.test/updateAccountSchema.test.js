import { expect, describe, it } from "vitest";
import { addAccountSchema } from "../../../middleware/schemas";
import {
  updateAccountNameCases,
  updateAccountTypeCases,
  updatedAccountDescriptionCases,
} from "./cases";

describe("Account update schema tests ", () => {
  updateAccountNameCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  updateAccountTypeCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  updatedAccountDescriptionCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = addAccountSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
});
