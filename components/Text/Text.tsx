import { TextProps, textStyles } from "@components";
import { useThemeColor } from "@hooks";
import { TextVariant } from "@theme";
import { FC } from "react";
import { Text as RNText } from "react-native";

const getTextColorByVariant = (variant: TextVariant) => {
  switch (variant) {
    case "title":
      return "tint";
    case "caption":
      return "info";
    default:
      return "text";
  }
};

export const Text: FC<TextProps> = ({ variant = "body", ...props }) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    getTextColorByVariant(variant),
  );

  return (
    <RNText style={[{ color }, textStyles[variant], style]} {...otherProps} />
  );
};
