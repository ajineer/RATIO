import { expect, describe, it } from "vitest";
import { addAccountSchema } from "../../../middleware/schemas";
import {
  newAccountBalanceCases,
  newAccountDescriptionCases,
  newAccountNameCases,
  newAccountStartingBalanceCases,
  newAccountTypeCases,
} from "./cases";

describe("Account creation schema tests ", () => {
  //   [
  //     newAccountBalanceCases,
  //     newAccountDescriptionCases,
  //     newAccountNameCases,
  //     newAccountStartingBalanceCases,
  //     newAccountTypeCases,
  //   ].forEach((caseArray) => {
  //     caseArray.forEach(({ description, data, expectedValue }) => {
  //       it(description, () => {
  //         const { error } = addAccountSchema.validate(data);
  //         expect(error).toBeDefined();
  //         expect(error.details[0].message).toBe(expectedValue);
  //       });
  //     });
  //   });
  newAccountNameCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  newAccountTypeCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  newAccountDescriptionCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  newAccountStartingBalanceCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = addAccountSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
  newAccountBalanceCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addAccountSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
