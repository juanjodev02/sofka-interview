import { View } from "@components";
import { useThemeColor } from "@hooks";
import { FC } from "react";
import { ActivityIndicator, ViewProps } from "react-native";

export const Loader: FC<ViewProps> = (props) => {
  const color = useThemeColor({}, "text");
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      {...props}
    >
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};
