import Joi from "joi";
import validator from "validator";

// user controller schemas

export const signupUserSchema = Joi.object({
  first_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
    }),
  last_name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
    }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .custom((value, helpers) => {
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Password Validation")
    .required()
    .messages({
      anyinvalid:
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
    }),
  confirm_password: Joi.string().valid(Joi.ref("password")),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().empty("").messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format.",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().empty("").messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

export const resetPaswwordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string()
    .custom((value, helpers) => {
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Password Validation")
    .required()
    .messages({
      anyinvalid:
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref("new_password"))
    .required()
    .messages({
      "any.only": "Passwords must match.",
      "any.required": "Confirm password is required.",
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
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
    }),
  type: Joi.string()
    .valid("checking", "savings", "credit", "loan", "bill")
    .required(),
  description: Joi.string().optional(),
  starting_balance: Joi.number().precision(2).min(0).required(),
  balance: Joi.number().precision(2).min(0).required(),
});

export const updateAccountSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .required()
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
    }),
  type: Joi.string()
    .valid("checking", "savings", "credit", "loan", "bill")
    .required(),
  description: Joi.string().optional(),
});

// invoice controller schema

export const addInvoiceSchema = Joi.object({
  account_id: Joi.string().uuid().required(),
  amount_due: Joi.number().precision(2).min(0).required(),
  recurring: Joi.boolean().required(),
  next_due_date: Joi.date().required(),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "annually")
    .required(),
});

export const updateInvoiceSchema = Joi.object({
  amount_due: Joi.number().precision(2).min(0).required(),
  recurring: Joi.boolean().required(),
  next_due_date: Joi.date().required(),
  frequency: Joi.string()
    .valid("daily", "weekly", "monthly", "annually")
    .required(),
});

// transaction controller schemas

export const addTransactionSchema = Joi.object({
  account_id: Joi.string().uuid().required(),
  amount: Joi.number().required().precision(2).min(0).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid("pending", "completed", "reversed").required(),
});
