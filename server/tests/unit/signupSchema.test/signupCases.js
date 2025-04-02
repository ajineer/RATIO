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
    expected: "First name is required and cannot be null",
    data: { ...signup, first_name: null },
  },
  {
    description: "should fail because the first/last name is too short",
    expected: "First name must be at least 2 characters long",
    data: {
      ...signup,
      first_name: "b",
    },
  },
  {
    description: "should fail because the first/last name is too long",
    expected: "First name cannot exceed 50 characters",
    data: {
      ...signup,
      first_name: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
  },
  {
    description: "should fail because the first/last name is a wrong type",
    expected: "First name is required and cannot be null",
    data: {
      ...signup,
      first_name: 200366,
    },
  },
  {
    description:
      "should fail because the first/last name contains invalid chars",
    expected: "First name can only contain letters and spaces",
    data: {
      ...signup,
      first_name: "@dam",
    },
  },
  {
    description:
      "should fail because the first/last name is missing altogether",
    expected: "First name is required and cannot be null",
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
    expected: "Email is required",
    data: {
      first_name: "user",
      last_name: "one",
      password: "Password123!",
      confirm_password: "Password123!",
    },
  },
  {
    description: "should fail because email is missing domain",
    expected: "Invalid email format",
    data: {
      ...signup,
      email: "userone@gmail",
    },
  },
  {
    description: "should fail because email is missing '@'",
    expected: "Invalid email format",
    data: {
      ...signup,
      email: "userone@gmail",
    },
  },
  {
    description: "should fail because email is wrong type",
    expected: "Email must be a string",
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
    expected: "Password is required",
    data: {
      first_name: "user",
      last_name: "one",
      email: "userone@gmail.com",
      confirm_password: "Password123!",
    },
  },
  {
    description: "should fail because password is too short",
    expected: "Password must be at least 8 characters long",
    data: {
      ...signup,
      password: "Pwd123@",
    },
  },
  {
    description:
      "should fail because password is missing required capital letter",
    expected: "Password must have at least one uppercase letter",
    data: {
      ...signup,
      password: "passwordd123@",
    },
  },
  {
    description: "should fail because password is missing a symbol",
    expected: "Password must have at least one special character",
    data: {
      ...signup,
      password: "Password123",
    },
  },
  {
    description: "should fail because password is missing a required number",
    expected: "Password must have at least one number",
    data: {
      ...signup,
      password: "Password!",
    },
  },
  {
    description: "should fail because confirm password is missing",
    expected: "Passwords must match",
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
    expected: "Passwords must match",
    data: {
      first_name: "user",
      last_name: "one",
      email: "userone@gmail.com",
      password: "Password123!",
      confirm_password: "Dassword123!",
    },
  },
];
