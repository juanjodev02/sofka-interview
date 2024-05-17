import { Validator } from "@core/validators/types";
import { DateTime } from "luxon";

import { FormState } from "@/core";

export class _DateGraterThanNowValidator implements Validator {
  validate(
    message: string,
  ): (value: string, formState: FormState) => [boolean, string] {
    return (value: string) => {
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!pattern.test(value)) {
        return [false, message];
      }
      try {
        const date = DateTime.fromFormat(value, "dd/MM/yyyy");
        return [date > DateTime.now(), message];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return [false, message];
      }
    };
  }
}

export const DateGraterThanNowValidator = new _DateGraterThanNowValidator();
