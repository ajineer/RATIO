import { expect, describe, it } from "vitest";
import { addAccountSchema } from "../../../middleware/schemas";
import { newAccountNameCases } from "./cases/addAccountCases";

describe("Account creation schema tests ", () => {
  newAccountNameCases.forEach(({ descripton, data, expectedValue }) => {
    it(descripton, () => {
      const { error } = addAccountSchema.validate(data);
      console.log(error.details);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe(expectedValue);
    });
  });
});
