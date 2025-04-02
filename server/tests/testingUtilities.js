import { expect } from "vitest";

export const evaluate = (schema, data, evalue) => {
  const { error } = schema.validate(data);
  expect(error).toBeDefined();
  expect(error.details[0].message).toBe(evalue);
};
