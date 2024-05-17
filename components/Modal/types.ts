import { ReactNode } from "react";
import { ViewProps } from "react-native";

export interface ModalProps extends ViewProps {
  visible: boolean;
  children: ReactNode;
  onBackdropPress?: () => void;
}
