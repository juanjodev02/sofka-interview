import { TextStyle, ViewStyle } from "react-native";

export type TextVariant =
  | "heading"
  | "title"
  | "body"
  | "caption"
  | "button"
  | "header";
export type ButtonVariant = "primary" | "secondary" | "danger";

export type DefaultTextProps = {
  text: {
    [key in TextVariant]: TextStyle;
  };
  input: {
    search: TextStyle;
    label: TextStyle;
  };
  border: {
    borderWidth: number;
    borderRadius: number;
  };
  button: {
    [key in ButtonVariant]: ViewStyle & {
      disabled: ViewStyle;
    };
  };
};

export interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}
