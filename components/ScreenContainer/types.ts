import { ReactNode } from "react";
import { ViewProps } from "react-native";

export interface ScreenContainerProps extends ViewProps {
  children: ReactNode;
  scrollable?: boolean;
  insertBottomInsets?: boolean;
}
