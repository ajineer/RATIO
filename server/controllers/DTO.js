export class DTO {
  constructor(data) {
    Object.assign(this, data);
  }

  idUUID(value) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  get validationRules() {
    throw new Error("validationRules must be implemented by subclass");
  }
}
