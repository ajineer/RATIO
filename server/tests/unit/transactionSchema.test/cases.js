const transaction = {
  account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
  amount: 575.5,
  description: "Monthly payment to USAA",
  status: "pending",
};

export const addTransactionAccountIdCases = [
  {
    description: "Should fail because account id is an empty string",
    data: {
      ...transaction,
      account_id: "",
    },
    expectedValue: "account_id cannot be an empty string",
  },
  {
    description: "Should fail because account id is not a string",
    data: {
      ...transaction,
      account_id: 1234,
    },
    expectedValue: "account_id must be a string",
  },
  {
    description: "Should fail because account id is missing altogether",
    data: {
      amount: 575.5,
      description: "Monthly payment to USAA",
      status: "pending",
    },
    expectedValue: "account_id is required",
  },
  {
    description: "Should fail because account id is not a valid GUID",
    data: {
      account_id: "51",
      amount: 575.5,
      description: "Monthly payment to USAA",
      status: "pending",
    },
    expectedValue: "account_id must be a valid GUID",
  },
];
export const addTransactionAmountCases = [
  {
    description: "Should fail because amount is not a number",
    data: {
      ...transaction,
      amount: true,
    },
    expectedValue: "amount must be a number",
  },
  {
    description: "Should fail because amount is missing altogether",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      description: "Monthly payment to USAA",
      status: "pending",
    },
    expectedValue: "amount is required",
  },
];
export const addTransactionDescriptionCases = [
  {
    description: "Should fail because description is not a string",
    data: {
      ...transaction,
      description: 1234,
    },
    expectedValue: "description must be a string",
  },
];
export const addTransactionStatusCases = [
  {
    description: "Should fail because status is not one of the allowed values",
    data: {
      ...transaction,
      status: 1202305,
    },
    expectedValue:
      "status must be one of the following: 'pending', 'complete', 'reversed'",
  },
  {
    description: "Should fail because status is missing altogether",
    data: {
      account_id: "4f8a2b16-3d9c-4f7d-a89e-2e5c1f5b6a1d",
      amount: 575.5,
      description: "Monthly payment to USAA",
    },
    expectedValue: "status is required",
  },
];
