import { ViewProps } from "react-native";

import { ButtonVariant, Colors } from "@/theme";

export interface ButtonProps extends ViewProps {
  variant: ButtonVariant;
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface BaseButtonProps extends ButtonProps {
  backgroundColorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
  isLoading?: boolean;
  disabled?: boolean;
}
