const generics = (field) => ({
  "string.empty": `${field} cannot be an empty string`,
  "string.min": `${field} must be at least 2 characters long`,
  "string.max": `${field} cannot exceed 50 characters`,
  "string.pattern.base": `${field} can only contain letters and spaces`,
  "string.base": `${field} must be a string`,
  "any.required": `${field} is required`,
  "number.base": `${field} must be a number`,
});
//   name: Joi.string()
//     .trim()
//     .min(2)
//     .max(50)
//     .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
//     .required()
//     .messages(message_bodies.name_body("account_name")),
//   type: Joi.string()
//     .valid("checking", "savings", "credit", "loan", "bill")
//     .required()
//     .messages(),
//   description: Joi.string().optional().messages(),
//   starting_balance: Joi.number().precision(2).min(0).required().messages(),
//   balance: Joi.number().precision(2).min(0).required().messages(),

const generic_messages = (key, field) => generics(field)[key];
export const message_bodies = {
  name_body: (field) => ({
    "string.empty": generic_messages("string.empty", field),
    "string.min": generic_messages("string.min", field),
    "string.max": generic_messages("string.max", field),
    "string.pattern.base": generic_messages("string.pattern.base", field),
    "string.base": generic_messages("string.base", field),
    "any.required": generic_messages("any.required", field),
  }),
  email_body: {
    "string.email": "invalid email format",
    "string.empty": generic_messages("string.empty", "email"),
    "any.required": generic_messages("any.required", "email"),
    "string.base": generic_messages("string.base", "email"),
  },

  password_body: (field) => ({
    "string.base": generic_messages("string.base", field),
    "any.required": generic_messages("any.required", field),
    "string.empty": generic_messages("string.empty", field),
    "password.invalid": "{{#message}}",
  }),

  account_type: {
    "string.base": generic_messages("string.base", "account_type"),
    "any.required": generic_messages("any.required", "account_type"),
    "any.only":
      "account_type must be one of the following: 'checking', 'savings', 'credit', 'loan', 'bill'",
  },
  description_body: {
    "string.base": generic_messages("string.base", "description"),
  },

  balance_body: (field) => ({
    "any.required": generic_messages("any.required", field),
    "number.base": generic_messages("number.base", field),
  }),
};
