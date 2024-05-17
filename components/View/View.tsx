import { ViewProps } from "@components";
import { useThemeColor } from "@hooks";
import { FC } from "react";
import { View as RNView } from "react-native";

export const View: FC<ViewProps> = ({ ...props }) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <RNView style={[{ backgroundColor }, style]} {...otherProps} />;
};
