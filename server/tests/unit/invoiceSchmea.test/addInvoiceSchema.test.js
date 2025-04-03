import { describe, expect, it } from "vitest";
import {
  addInvoiceAmountDueCases,
  addInvoiceDueDateCases,
  addInvoiceFrequencyCases,
  addInvoiceNameCases,
  addInvoiceRecurringCases,
} from "./cases";
import { addInvoiceSchema } from "../../../middleware/schemas";

describe("New invoice schema tests", () => {
  addInvoiceNameCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  addInvoiceAmountDueCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  addInvoiceRecurringCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  addInvoiceDueDateCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  addInvoiceFrequencyCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = addInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
