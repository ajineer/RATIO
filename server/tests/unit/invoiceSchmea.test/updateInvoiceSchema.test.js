import { describe, expect, it } from "vitest";
import { updateInvoiceSchema } from "../../../middleware/schemas";
import {
  updateInvoiceAmountDueCases,
  updateInvoiceDueDateCases,
  updateInvoiceFrequencyCases,
  updateInvoiceRecurringCases,
} from "./cases";

describe("Update invoice schema", () => {
  updateInvoiceRecurringCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = updateInvoiceSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
  updateInvoiceFrequencyCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = updateInvoiceSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
  updateInvoiceDueDateCases.forEach(({ description, data, expectedValue }) => {
    it(description, () => {
      const { error } = updateInvoiceSchema.validate(data);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
  updateInvoiceAmountDueCases.forEach(
    ({ description, data, expectedValue }) => {
      it(description, () => {
        const { error } = updateInvoiceSchema.validate(data);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe(expectedValue);
      });
    }
  );
});
