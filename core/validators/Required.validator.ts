import { Validator } from "@core/validators/types";

import { FormState } from "@/core";

class _RequiredValidator implements Validator {
  validate(
    message: string,
  ): (value: string, formState: FormState) => [boolean, string] {
    return (value: string) => [value?.trim().length > 0, message];
  }
}

export const RequiredValidator = new _RequiredValidator();
