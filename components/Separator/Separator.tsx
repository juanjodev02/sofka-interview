import { View } from "@components";
import { useThemeColor } from "@hooks";
import { FC } from "react";
import { ViewProps } from "react-native";

export const Separator: FC<ViewProps> = (props) => {
  const borderColor = useThemeColor({}, "border");

  return (
    <View
      style={{
        height: 1,
        backgroundColor: borderColor,
      }}
      testID={props.testID}
      {...props}
    />
  );
};
