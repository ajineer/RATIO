import { DTO } from "../DTO";

class TransactionDTO extends DTO {
  constructor(data) {
    super(data);
  }

  get validationRules() {
    return {
      account_id: {
        notNull: true,
        isString: true,
        isUUID: true,
        notUND: true,
        stringLength: 1,
      },
      // amount: {},
      // description: {},
      // status: {}
    };
  }
}
