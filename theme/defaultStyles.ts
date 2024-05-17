import { DefaultTextProps } from "@theme/types";
import { ViewStyle } from "react-native";

const borderWidth = 1;
const borderRadius = 8;

const baseButtonStyle: ViewStyle = {
  paddingVertical: 15,
  borderRadius,
  justifyContent: "center",
  alignItems: "center",
  elevation: 2,
};

const disabledButtonStyle: ViewStyle = {
  opacity: 0.5,
};

export const defaultStyles: DefaultTextProps = {
  text: {
    heading: {
      fontSize: 32,
      fontWeight: "700",
      fontFamily: "PreloSlab",
    },
    header: {
      fontSize: 16,
      fontWeight: "600",
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "PreloSlab",
    },
    body: {
      fontSize: 16,
      fontWeight: "400",
    },
    caption: {
      fontSize: 13,
      fontWeight: "400",
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "PreloSlab",
    },
  },
  input: {
    search: {
      fontSize: 14,
      fontWeight: "400",
      fontFamily: "PreloSlab",
      borderStyle: "solid",
      borderWidth,
      borderRadius,
      alignSelf: "stretch",
      padding: 8,
      paddingVertical: 15,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
    },
  },
  border: {
    borderWidth,
    borderRadius,
  },
  button: {
    primary: {
      ...baseButtonStyle,
      disabled: {
        ...disabledButtonStyle,
      },
    },
    secondary: {
      ...baseButtonStyle,
      disabled: {
        ...disabledButtonStyle,
      },
    },
    danger: {
      ...baseButtonStyle,
      disabled: {
        ...disabledButtonStyle,
      },
    },
  },
};
