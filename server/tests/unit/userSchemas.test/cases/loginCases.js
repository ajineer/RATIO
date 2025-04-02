const login = {
  email: "userone@gmail.com",
  password: "password123!",
};

export const emailLoginCases = [
  {
    description: "Should fail because email is an empty string",
    data: {
      ...login,
      email: "",
    },
    expectedValue: "email cannot be an empty string",
  },
  {
    description: "Should fail because email is wrong format",
    data: {
      ...login,
      email: "userone@email",
    },
    expectedValue: "invalid email format",
  },
  {
    description: "Should fail because email is wrong type",
    data: {
      ...login,
      email: 1234,
    },
    expectedValue: "email must be a string",
  },
  {
    description: "Should fail because email is not provided",
    data: {
      password: login.password,
    },
    expectedValue: "email is required",
  },
];

export const passwordLoginCases = [
  {
    description: "Should fail because password string is empty",
    data: {
      ...login,
      password: "",
    },
    expectedValue: "password string must not be empty",
  },
  {
    description: "Should fail because password is not a string",
    data: {
      ...login,
      password: 1234,
    },
    expectedValue: "password must be a string",
  },
  {
    description: "Should fail because password is not provided",
    data: {
      email: login.email,
    },
    expectedValue: "password is required",
  },
];
