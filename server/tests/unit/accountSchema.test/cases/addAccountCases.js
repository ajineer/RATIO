const account = {
  name: "USAA",
  type: "bill",
  descripton: "Auto insurance for Subaru",
  starting_balance: 37852.76,
  balance: 25482.36,
};

export const newAccountNameCases = [
  {
    descripton: "Should fail because the new account name is an empty string",
    data: {
      ...account,
      name: "",
    },
    expectedValue: "account_name cannot be an empty string",
  },
  //   {},
  //   {},
  //   {},
];
