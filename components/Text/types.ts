import { TextProps as RNTextProps } from "react-native";

import { TextVariant, ThemeProps } from "@/theme";

export interface TextProps extends RNTextProps, ThemeProps {
  variant?: TextVariant;
}
