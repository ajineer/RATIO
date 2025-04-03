const invoice = {
  account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
  amount_due: 50.0,
  recurring: true,
  next_due_date: new Date("2025-07-07"),
  frequency: "monthly",
};

export const addInvoiceNameCases = [
  {
    description: "Should fail because account id is an empty string",
    data: {
      ...invoice,
      account_id: "",
    },
    expectedValue: "account_id cannot be an empty string",
  },
  {
    description: "Should fail because account id is not a string",
    data: {
      ...invoice,
      account_id: 1234,
    },
    expectedValue: "account_id must be a string",
  },
  {
    description: "Should fail because account id is missing altogether",
    data: {
      amount_due: 50.0,
      recurring: true,
      next_due_date: "2025-05-03T14:02:11.709Z",
      frequency: "monthly",
    },
    expectedValue: "account_id is required",
  },
  {
    description: "Should fail because account id is not a valid GUID",
    data: {
      account_id: "51",
      amount_due: 50.0,
      recurring: true,
      next_due_date: "2025-05-03T14:02:11.709Z",
      frequency: "monthly",
    },
    expectedValue: "account_id must be a valid GUID",
  },
];
export const addInvoiceAmountDueCases = [
  {
    description: "Should fail because amount due is not a number",
    data: {
      ...invoice,
      amount_due: true,
    },
    expectedValue: "amount_due must be a number",
  },
  {
    description: "Should fail because amount due is missing altogether",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      recurring: true,
      next_due_date: "2025-05-03T14:02:11.709Z",
      frequency: "monthly",
    },
    expectedValue: "amount_due is required",
  },
];

export const addInvoiceRecurringCases = [
  {
    description: "Should fail because recurring is not a boolean (string)",
    data: {
      ...invoice,
      recurring: "Trrruuuue",
    },
    expectedValue: "recurring must be a boolean",
  },
  {
    description: "Should fail because recurring is missing altogether",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      amount_due: 50.0,
      next_due_date: "2025-05-03T14:02:11.709Z",
      frequency: "monthly",
    },
    expectedValue: "recurring is required",
  },
  {
    description: "Should fail because recurring is not a boolean (number = 1)",
    data: {
      ...invoice,
      recurring: 1,
    },
    expectedValue: "recurring must be a boolean",
  },
  {
    description: "Should fail because recurring is not a boolean (number = 0)",
    data: {
      ...invoice,
      recurring: 0,
    },
    expectedValue: "recurring must be a boolean",
  },
];

export const addInvoiceDueDateCases = [
  {
    description: "Should fail because date is missing",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      amount_due: 50.0,
      recurring: true,
      frequency: "monthly",
    },
    expectedValue: "next_due_date is required",
  },
  {
    description: "Should fail because date is wrong type (string of nonesense)",
    data: {
      ...invoice,
      next_due_date: "itsLiKE due TodaY or som3thin.... !",
    },
    expectedValue: "next_due_date must be a valid date",
  },
  {
    description: "Should fail because date is wrong type (number)",
    data: {
      ...invoice,
      next_due_date: 2023112,
    },
    expectedValue: "next_due_date must be a valid date",
  },
  {
    description: "Should fail because date is a past date",
    data: {
      ...invoice,
      next_due_date: new Date("2021-01-06"),
    },
    expectedValue: "next_due_date must be today or future date",
  },
];

export const addInvoiceFrequencyCases = [
  {
    description:
      "Should fail because frequency is not one of the allowed values",
    data: {
      ...invoice,
      frequency: 1202305,
    },
    expectedValue:
      "frequency must be one of the following: 'daily', 'weekly', 'monthly', 'annually'",
  },
  {
    description: "Should fail because frequency is missing altogether",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      amount_due: 50.0,
      recurring: true,
      next_due_date: new Date(2025, 12, 12),
    },
    expectedValue: "frequency is required",
  },
];
