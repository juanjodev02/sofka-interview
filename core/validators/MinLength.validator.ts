import { Validator } from "@core/validators/types";

export class _MinLengthValidator implements Validator {
  validate(
    message: string,
    length: number,
  ): (value: string) => [boolean, string] {
    return (value: string) => {
      return [value.trim().length >= length, message];
    };
  }
}

export const MinLengthValidator = new _MinLengthValidator();
