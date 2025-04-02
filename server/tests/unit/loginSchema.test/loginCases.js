// export const loginUserSchema = Joi.object({
//   email: Joi.string().email().lowercase().trim().required().messages({
//     "string.empty": "Email is required",
//     "string.email": "Invalid email format.",
//     "any.required": "Email is required",
//     "string.base": "Email must be a string",
//   }),
//
// });

const login = {
  email: "userone@gmail.com",
  password: "Password123!",
};

export const emailLoginCases = [
  {
    description: "Should fail because email is an empty string",
    data: {
      ...login,
      email: "",
    },
    expected: "Email is required",
  },
  {
    description: "Should fail because email is wrong format",
    data: {
      ...login,
      email: "userone@email",
    },
    expected: "Invalid email format",
  },
  {
    description: "Should fail because email is wrong type",
    data: {
      ...login,
      email: 1234,
    },
    expected: "Email must be a string",
  },
  {
    description: "Should fail because email is not provided",
    data: {
      password: login.password,
    },
    expected: "Email is required",
  },
];

//  password: Joi.string().required().empty("").messages({
//     "string.empty": "Password is required",
//     "any.required": "Password is required",
//     "string.base": "Password must be a string",
//   }),

export const passwordLoginCases = [
  {
    description: "Should fail because password string is empty",
    data: {
      ...login,
      password: "",
    },
    expected: "Password string must not be empty",
  },
  {
    description: "Should fail because password is not a string",
    data: {
      ...login,
      password: 1234,
    },
    expected: "Password must be a string",
  },
  {
    description: "Should fail because password is not provided",
    data: {
      email: login.email,
    },
    expected: "Password is required",
  },
];
