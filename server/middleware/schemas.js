import Joi from "joi";
import validator from "validator";
import { message_bodies } from "./messages.js";

// user controller schemas

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body || req.params, {
    abortEarly: false,
  });

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }
  next();
};

export const getValidationErrors = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) {
    return result.error.details[0].message;
  }
  return "pass";
};

export const signupUserSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .custom((value, helpers) => {
      if (value === null) {
        return helpers.error("any.required");
      }
      return value;
    })
    .messages(message_bodies.name_body("first_name")),
  last_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages(message_bodies.name_body("last_name")),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages(message_bodies.email_body),
  password: Joi.string()
    .required()
    .custom((value, helpers) => {
      const errors = [];

      if (value.length < 8) {
        errors.push("password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("password must have at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        errors.push("password must have at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        errors.push("password must have at least one number");
      }
      if (!/[\W_]/.test(value)) {
        errors.push("password must have at least one special character");
      }

      if (errors.length > 0) {
        return helpers.error("password.invalid", {
          message: errors.join(", "),
        });
      }

      return value;
    }, "password validation")
    .messages(message_bodies.password_body("password")),
  // .messages({
  //   "string.base": "password must be a string",
  //   "any.required": "password is required",
  //   "password.invalid": "{{#message}}",
  // }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .messages({
      ...message_bodies.password_body("confirm_password"),
      "any.only": "passwords must match",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .required()
    .messages(message_bodies.email_body),
  password: Joi.string().required().empty().messages({
    "string.empty": "password string must not be empty",
    "any.required": "password is required",
    "string.base": "password must be a string",
  }),
});

export const resetPaswwordSchema = Joi.object({
  current_password: Joi.string()
    .required()
    .messages(message_bodies.password_body("current_password")),
  new_password: Joi.string()
    .required()
    .empty()
    .custom((value, helpers) => {
      const errors = [];

      if (value.length < 8) {
        errors.push("password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("password must have at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        errors.push("password must have at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        errors.push("password must have at least one number");
      }
      if (!/[\W_]/.test(value)) {
        errors.push("password must have at least one special character");
      }

      if (errors.length > 0) {
        return helpers.error("password.invalid", {
          message: errors.join(", "),
        });
      }

      return value;
    }, "password Validation")
    .messages(message_bodies.password_body("new_password")),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      ...message_bodies.password_body("confirm_password"),
      "any.only": "passwords must match",
    }),
});

//account controller schemas

export const addAccountSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages(message_bodies.name_body("account_name")),
  type: Joi.string()
    .valid("checking", "savings", "credit", "loan", "bill")
    .required()
    .messages(message_bodies.account_type),
  description: Joi.string()
    .optional()
    .messages(message_bodies.description_body),
  starting_balance: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages(message_bodies.balance_body("starting_balance")),
  balance: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages(message_bodies.balance_body("balance")),
});

export const updateAccountSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages(message_bodies.name_body("account_name")),
  type: Joi.string()
    .valid("checking", "savings", "credit", "loan", "bill")
    .required(),
  description: Joi.string().optional(),
});

// invoice controller schema

export const addInvoiceSchema = Joi.object({
  account_id: Joi.string()
    .uuid()
    .required()
    .messages({
      ...message_bodies.name_body("account_id"),
      "string.guid": "account_id must be a valid GUID",
    }),
  amount_due: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages(message_bodies.balance_body("amount_due")),
  recurring: Joi.boolean()
    .required()
    .strict()
    .messages(message_bodies.boolean_body("recurring")),
  next_due_date: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .strict()
    .messages(message_bodies.date_body("next_due_date")),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "annually")
    .required()
    .messages(message_bodies.frequency_body),
});

export const updateInvoiceSchema = Joi.object({
  amount_due: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages(message_bodies.balance_body("amount_due")),
  recurring: Joi.boolean()
    .required()
    .strict()
    .messages(message_bodies.boolean_body("recurring")),
  next_due_date: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .strict()
    .messages(message_bodies.date_body("next_due_date")),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "annually")
    .required()
    .messages(message_bodies.frequency_body),
});

// transaction controller schemas

export const addTransactionSchema = Joi.object({
  account_id: Joi.string()
    .uuid()
    .required()
    .messages({
      ...message_bodies.name_body("account_id"),
      "string.guid": "account_id must be a valid GUID",
    }),
  amount: Joi.number()
    .required()
    .precision(2)
    .min(0)
    .required()
    .messages(message_bodies.balance_body("amount")),
  description: Joi.string()
    .optional()
    .messages(message_bodies.description_body),
  status: Joi.string()
    .valid("pending", "completed", "reversed")
    .required()
    .messages(message_bodies.transaction_status_body),
});
