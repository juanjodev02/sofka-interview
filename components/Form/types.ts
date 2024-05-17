import { FormField } from "@core";

export type FieldType = "text" | "date";

export interface InputProps extends FormField {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export interface DateInputProps extends FormField {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  caption?: string;
}

export type FormRenderFunctionProps = {
  fields: FormField[];
  formState: Record<string, string>;
  isValid: boolean;
  reset: () => void;
};

export interface FormProps {
  fields: FormField[];
  children: (options: FormRenderFunctionProps) => JSX.Element;
  testID?: string;
}
