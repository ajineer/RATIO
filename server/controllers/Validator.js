export class Validator {
  static validate(dtoInstance) {
    const fields = { ...dtoInstance };
    const rules = dtoInstance.validationRules;
    const errors = [];

    for (const [fieldName, fieldRules] of Object.entries(rules)) {
      const value = fields[fieldName];
      const type = Validator.detectType(value);

      let fieldErrors = [];

      switch (type) {
        case "string":
          fieldErrors = Validator.evaluateString(fieldName, value, fieldRules);
          break;
        case "number":
          fieldErrors = Validator.evaluateNumber(fieldName, value, fieldRules);
          break;
        case "boolean":
          fieldErrors = Validator.evaluateBoolean(fieldName, value, fieldRules);
          break;
        case "date":
          fieldErrors = Validator.evaluateDate(fieldName, value, fieldRules);
          break;
        case "array":
          fieldErrors = Validator.evaluateArray(fieldName, value, fieldRules);
          break;
        default:
          break;
      }

      if (fieldErrors.length) {
        errors.push(...fieldErrors);
      }
    }

    return errors;
  }

  static detectType(value) {
    if (Array.isArray(value)) return "array";
    if (value instanceof Date) return "date";
    return typeof value;
  }

  static evaluateString(fieldName, value, rules) {
    const errors = [];
    if (rules.notNull && value === null)
      errors.push(`${fieldName} cannot be null`);
  }

  static generateError(fieldName, errorType, type = undefined) {
    switch (errorType) {
      case "null":
        return `${fieldName} cannot be null`;
      case "undefined":
        return `${fieldName} cannot be undefined`;
      case "wrongType":
        return `${fieldName} must be of type ${type}`;
      default:
        return `${fieldName} validation error`;
    }
  }
}
