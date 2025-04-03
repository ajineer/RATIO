const account = {
  name: "USAA",
  type: "bill",
  description: "Auto insurance for Subaru",
  starting_balance: 37852.76,
  balance: 25482.36,
};

export const newAccountNameCases = [
  {
    description: "Should fail because the new account name is an empty string",
    data: {
      ...account,
      name: "",
    },
    expectedValue: "account_name cannot be an empty string",
  },
  {
    description: "Should fail because the new account name is too long",
    data: {
      ...account,
      name: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    expectedValue: "account_name cannot exceed 50 characters",
  },
  {
    description: "Should fail because the new account name is too short",
    data: {
      ...account,
      name: "a",
    },
    expectedValue: "account_name must be at least 2 characters long",
  },
  {
    description:
      "Should fail because the new account name contains invalid characters",
    data: {
      ...account,
      name: "a@bcd!((%^&}{",
    },
    expectedValue: "account_name can only contain letters and spaces",
  },
  {
    description: "Should fail because the new account name is not a string",
    data: {
      ...account,
      name: 1234567,
    },
    expectedValue: "account_name must be a string",
  },
  {
    description: "Should fail because account name is not provided at all",
    data: {
      type: "bill",
      description: "Auto insurance for Subaru",
      starting_balance: 37852.76,
      balance: 25482.36,
    },
    expectedValue: "account_name is required",
  },
];

export const newAccountTypeCases = [
  {
    description: "Should fail because the account type is not allowed",
    data: {
      ...account,
      type: "IRA",
    },
    expectedValue:
      "account_type must be one of the following: 'checking', 'savings', 'credit', 'loan', 'bill'",
  },
  {
    description: "Should fail because the account type is not a string",
    data: {
      ...account,
      type: 12345,
    },
    expectedValue:
      "account_type must be one of the following: 'checking', 'savings', 'credit', 'loan', 'bill'",
  },
  {
    description: "Should fail because account type is missing",
    data: {
      name: "USAA",
      description: "Auto insurance for Subaru",
      starting_balance: 37852.76,
      balance: 25482.36,
    },
    expectedValue: "account_type is required",
  },
];

export const newAccountDescriptionCases = [
  {
    description: "Should fail because description is not a string",
    data: {
      ...account,
      description: 123456,
    },
    expectedValue: "description must be a string",
  },
];

export const newAccountStartingBalanceCases = [
  {
    description: "Should fail because starting balance not provided at all",
    data: {
      name: "USAA",
      type: "bill",
      description: "Auto insurance for Subaru",
      balance: 25482.36,
    },
    expectedValue: "starting_balance is required",
  },
  {
    description: "Should fail because starting balance not a number",
    data: {
      ...account,
      starting_balance: "OneThousand",
    },
    expectedValue: "starting_balance must be a number",
  },
];
export const newAccountBalanceCases = [
  {
    description: "Should fail because balance not provided at all",
    data: {
      name: "USAA",
      type: "bill",
      description: "Auto insurance for Subaru",
      starting_balance: 25482.36,
    },
    expectedValue: "balance is required",
  },
  {
    description: "Should fail because balance not a number",
    data: {
      ...account,
      balance: "OneThousand",
    },
    expectedValue: "balance must be a number",
  },
];

export const updateAccountNameCases = [
  {
    description:
      "Should fail because the updated account name is an empty string",
    data: {
      ...account,
      name: "",
    },
    expectedValue: "account_name cannot be an empty string",
  },
  {
    description: "Should fail because the updated account name is too long",
    data: {
      ...account,
      name: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    expectedValue: "account_name cannot exceed 50 characters",
  },
  {
    description: "Should fail because the updated account name is too short",
    data: {
      ...account,
      name: "a",
    },
    expectedValue: "account_name must be at least 2 characters long",
  },
  {
    description:
      "Should fail because the updated account name contains invalid characters",
    data: {
      ...account,
      name: "a@bcd!((%^&}{",
    },
    expectedValue: "account_name can only contain letters and spaces",
  },
  {
    description: "Should fail because the updated account name is not a string",
    data: {
      ...account,
      name: 1234567,
    },
    expectedValue: "account_name must be a string",
  },
  {
    description:
      "Should fail because the updated account name is not provided at all",
    data: {
      type: "bill",
      description: "Auto insurance for Subaru",
      starting_balance: 37852.76,
      balance: 25482.36,
    },
    expectedValue: "account_name is required",
  },
];

export const updateAccountTypeCases = [
  {
    description: "Should fail because the updated account type is not allowed",
    data: {
      ...account,
      type: "IRA",
    },
    expectedValue:
      "account_type must be one of the following: 'checking', 'savings', 'credit', 'loan', 'bill'",
  },
  {
    description: "Should fail because the updated account type is not a string",
    data: {
      ...account,
      type: 12345,
    },
    expectedValue:
      "account_type must be one of the following: 'checking', 'savings', 'credit', 'loan', 'bill'",
  },
  {
    description: "Should fail because updated account type is missing",
    data: {
      name: "USAA",
      description: "Auto insurance for Subaru",
      starting_balance: 37852.76,
      balance: 25482.36,
    },
    expectedValue: "account_type is required",
  },
];

export const updatedAccountDescriptionCases = [
  {
    description: "Should fail because updated description is not a string",
    data: {
      ...account,
      description: 123456,
    },
    expectedValue: "description must be a string",
  },
];
