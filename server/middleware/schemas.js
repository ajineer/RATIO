import Joi from "joi";
import validator from "validator";

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
      console.log("schema value: ", value);
      return value;
    })
    .messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "string.pattern.base": "First name can only contain letters and spaces",
      "string.base": "First name is required and cannot be null",
      "any.required": "First name is required and cannot be null",
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
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
    "string.base": "Email must be a string",
  }),
  password: Joi.string()
    .required()
    .custom((value, helpers) => {
      const errors = [];

      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("Password must have at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        errors.push("Password must have at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        errors.push("Password must have at least one number");
      }
      if (!/[\W_]/.test(value)) {
        errors.push("Password must have at least one special character");
      }

      if (errors.length > 0) {
        return helpers.error("password.invalid", {
          message: errors.join(", "),
        });
      }

      return value;
    }, "Password Validation")
    .messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "password.invalid": "{{#message}}",
    }),
  confirm_password: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
    "string.base": "Email must be a string",
  }),
  password: Joi.string().required().empty().messages({
    "string.empty": "Password string must not be empty",
    "any.required": "Password is required",
    "string.base": "Password must be a string",
  }),
});

export const resetPaswwordSchema = Joi.object({
  current_password: Joi.string().required().messages({
    "string.empty": "Current password cannot be an empty string",
    "any.required": "Current password must be provided",
    "string.base": "Current password must be a string",
  }),
  new_password: Joi.string()
    .required()
    .empty()
    .custom((value, helpers) => {
      const errors = [];

      if (value.length < 8) {
        errors.push("Password must be at least 8 characters long");
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("Password must have at least one uppercase letter");
      }
      if (!/[a-z]/.test(value)) {
        errors.push("Password must have at least one lowercase letter");
      }
      if (!/[0-9]/.test(value)) {
        errors.push("Password must have at least one number");
      }
      if (!/[\W_]/.test(value)) {
        errors.push("Password must have at least one special character");
      }

      if (errors.length > 0) {
        return helpers.error("password.invalid", {
          message: errors.join(", "),
        });
      }

      return value;
    }, "Password Validation")
    .messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "string.empty": "Password must not be an empty string",
      "password.invalid": "{{#message}}",
    }),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("new_password"))
    .messages({
      "any.only": "Passwords must match",
      "string.empty": "Confirm password cannot be an empty string",
      "any.required": "Confirm password must be provided",
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
      "string.empty": "Account name cannot be empty",
      "string.min": "Account name must be at least 2 characters long",
      "string.max": "Account name cannot exceed 50 characters",
      "string.pattern.base": "Account name can only contain letters and spaces",
      "string.base": "Account name must be a string",
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
