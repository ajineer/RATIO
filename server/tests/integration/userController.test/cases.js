const user1 = {
  first_name: "user",
  last_name: "one",
  email: "userone@gmail.com",
  password: "Password123!",
  confirm_password: "Password123!",
};

const login = {
  email: "userone@gmail.com",
  password: "Password123!",
};
export const userSignupCases = [
  {
    description: "Should successfully create a new user",
    data: { ...user1 },
    expectedValue: {
      status: 201,
      body: {
        message: "user created successfully, please login",
      },
    },
  },
  {
    description: "Should fail because user is already signed up",
    data: { ...user1 },
    expectedValue: {
      status: 409,
      body: {
        error: "email already in use",
      },
    },
  },
  {
    description: "Should fail because passwords do not match",
    data: {
      ...user1,
      email: "usertwo@gmail.com",
      confirm_password: "Pasword123!",
    },
    expectedValue: {
      status: 400,
      body: {
        error: "passwords must match",
      },
    },
  },
  {
    description: "Should fail because the new user could not be registered",
    data: new Date(),
    expectedValue: {
      status: 500,
      body: {
        error: "internal server error",
      },
    },
  },
];

export const loginCases = [
  {
    description: "Should successfully log user in",
    data: { ...login },
    expectedValue: {
      status: 200,
      body: {
        user: { id: 1, email: login.email },
        message: "login successful",
      },
    },
  },
  {
    description: "Should fail because there is no email or password",
    data: {},
    expectedValue: {
      status: 401,
      body: {
        error: "unauthorized",
      },
    },
  },
];
