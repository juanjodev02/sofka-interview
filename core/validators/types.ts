import { FormState } from "@core";

export interface Validator {
  validate: (
    message: string,
    ...args: any[]
  ) => (value: string, formState: FormState) => [boolean, string];
}
