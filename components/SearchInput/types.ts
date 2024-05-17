import { TextInputProps } from "react-native";

import { ThemeProps } from "@/theme";

export interface SearchInputProps extends TextInputProps, ThemeProps {
  placeholder: string;
  onSearch: (text: string) => void;
}
