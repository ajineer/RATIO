const signup = {
  first_name: "user",
  last_name: "one",
  email: "userone@gmail.com",
  password: "Password123!",
  confirm_password: "Password123!",
};

// name tests
export const nameCases = [
  {
    description: "should fail because the first/last name is null",
    expectedValue: "first_name must be a string",
    data: { ...signup, first_name: null },
  },
  {
    description: "should fail because the first/last name is too short",
    expectedValue: "first_name must be at least 2 characters long",
    data: {
      ...signup,
      first_name: "b",
    },
  },
  {
    description: "should fail because the first/last name is too long",
    expectedValue: "first_name cannot exceed 50 characters",
    data: {
      ...signup,
      first_name: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
  },
  {
    description: "should fail because the first/last name is a wrong type",
    expectedValue: "first_name must be a string",
    data: {
      ...signup,
      first_name: 200366,
    },
  },
  {
    description:
      "should fail because the first/last name contains invalid chars",
    expectedValue: "first_name can only contain letters and spaces",
    data: {
      ...signup,
      first_name: "@dam",
    },
  },
  {
    description:
      "should fail because the first/last name is missing altogether",
    expectedValue: "first_name is required",
    data: {
      email: "userone@gmail.com",
      password: "Password123!",
      confirm_password: "Password123!",
    },
  },
];

// email tests
export const emailCases = [
  {
    description: "should fail because email is missing",
    expectedValue: "email is required",
    data: {
      first_name: "user",
      last_name: "one",
      password: "Password123!",
      confirm_password: "Password123!",
    },
  },
  {
    description: "should fail because email is missing domain",
    expectedValue: "invalid email format",
    data: {
      ...signup,
      email: "userone@gmail",
    },
  },
  {
    description: "should fail because email is missing '@'",
    expectedValue: "invalid email format",
    data: {
      ...signup,
      email: "userone@gmail",
    },
  },
  {
    description: "should fail because email is wrong type",
    expectedValue: "email must be a string",
    data: {
      ...signup,
      email: 1234,
    },
  },
];

// password tests
export const passwordCases = [
  {
    description: "should fail because password is missing",
    expectedValue: "password is required",
    data: {
      first_name: "user",
      last_name: "one",
      email: "userone@gmail.com",
      confirm_password: "Password123!",
    },
  },
  {
    description: "should fail because password is too short",
    expectedValue: "password must be at least 8 characters long",
    data: {
      ...signup,
      password: "Pwd123@",
    },
  },
  {
    description:
      "should fail because password is missing required capital letter",
    expectedValue: "password must have at least one uppercase letter",
    data: {
      ...signup,
      password: "passwordd123@",
    },
  },
  {
    description: "should fail because password is missing a symbol",
    expectedValue: "password must have at least one special character",
    data: {
      ...signup,
      password: "Password123",
    },
  },
  {
    description: "should fail because password is missing a required number",
    expectedValue: "password must have at least one number",
    data: {
      ...signup,
      password: "Password!",
    },
  },
  {
    description: "should fail because confirm password is missing",
    expectedValue: "passwords must match",
    data: {
      first_name: "user",
      last_name: "one",
      email: "userone@gmail.com",
      password: "Password123!",
      confirm_password: null,
    },
  },
  {
    description: "should fail because confirm password doesn't match password",
    expectedValue: "passwords must match",
    data: {
      first_name: "user",
      last_name: "one",
      email: "userone@gmail.com",
      password: "Password123!",
      confirm_password: "Dassword123!",
    },
  },
];
