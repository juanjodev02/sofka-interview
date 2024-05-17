import { FieldType } from "@components";
import { TFunction } from "i18next";

export interface FormState {
  [key: string]: string;
}

export interface FormField {
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validators?: ((value: string, formState: FormState) => [boolean, string])[];
  asyncValidators?: ((
    value: string,
    formState: FormState,
  ) => Promise<[boolean, string]>)[];
  disabled?: boolean;
  initialValue?: string;
  computedValue?: {
    field: string;
    compute: (value: string) => string;
  };
  caption?: string;
}

export type GetFormFieldsOptions = {
  initValues: Record<string, string>;
  isEditing: boolean;
  t: TFunction;
};

export interface Form {
  getFields: (options: GetFormFieldsOptions) => FormField[];
}
