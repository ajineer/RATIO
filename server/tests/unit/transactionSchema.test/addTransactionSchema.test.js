import { describe, it, expect } from "vitest";
import { addTransactionSchema } from "../../../middleware/schemas";
import {
  addTransactionAccountIdCases,
  addTransactionAmountCases,
  addTransactionDescriptionCases,
  addTransactionStatusCases,
} from "./cases";

describe("New transaction schema tests", () => {
  addTransactionAccountIdCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = addTransactionSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
  addTransactionAmountCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addTransactionSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  addTransactionDescriptionCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = addTransactionSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
  addTransactionStatusCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addTransactionSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
