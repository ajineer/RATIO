const reset = {
  current_password: "Password123!",
  new_password: "Password123@",
  confirm_password: "Password123@",
};

// current password tests
export const currentPasswordCases = [
  {
    description: "Should fail because current password is an empty string",
    data: {
      ...reset,
      current_password: "",
    },
    expectedValue: "Current password cannot be an empty string",
  },
  {
    description: "Should fail because the current password is not provided",
    data: {
      new_password: reset.new_password,
      confirm_password: reset.confirm_password,
    },
    expectedValue: "Current password must be provided",
  },
  {
    description: "Should fail because current password is not a string type",
    data: {
      ...reset,
      current_password: 1234,
    },
    expectedValue: "Current password must be a string",
  },
];

// new password cases
export const newPasswordCases = [
  {
    description: "should fail because new password is too short",
    expectedValue: "Password must be at least 8 characters long",
    data: {
      ...reset,
      new_password: "Pwd123@",
    },
  },
  {
    description:
      "should fail because new password is missing required capital letter",
    expectedValue: "Password must have at least one uppercase letter",
    data: {
      ...reset,
      new_password: "passwordd123@",
    },
  },
  {
    description:
      "should fail because new password is missing required lowercase letter",
    expectedValue: "Password must have at least one lowercase letter",
    data: {
      ...reset,
      new_password: "PASSWORD123@",
    },
  },
  {
    description: "should fail because new password is missing a symbol",
    expectedValue: "Password must have at least one special character",
    data: {
      ...reset,
      new_password: "Password123",
    },
  },
  {
    description:
      "should fail because new password is missing a required number",
    expectedValue: "Password must have at least one number",
    data: {
      ...reset,
      new_password: "Password!",
    },
  },
];

// confirm new password cases

export const confirmNewPasswordCases = [
  {
    description: "should fail because the confirm password is an empty string",
    expectedValue: "Password must not be an empty string",
    data: {
      ...reset,
      new_password: "",
      confirm_password: "",
    },
  },
  {
    description: "should fail because the confirm password is not provided",
    expectedValue: "Confirm password must be provided",
    data: {
      current_password: reset.current_password,
      new_password: reset.new_password,
    },
  },
  {
    description: "should fail because the passwords do not match",
    expectedValue: "Passwords must match",
    data: {
      ...reset,
      confirm_password: "!321drowssaP",
    },
  },
];
