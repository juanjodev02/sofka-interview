import { Validator } from "@core/validators/types";

class _MaxLengthValidator implements Validator {
  validate(
    message: string,
    length: number,
  ): (value: string) => [boolean, string] {
    return (value: string) => [value.trim().length <= length, message];
  }
}

export const MaxLengthValidator = new _MaxLengthValidator();
