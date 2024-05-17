import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@hooks";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, ViewProps } from "react-native";

export const Back: FC<ViewProps> = (props) => {
  const router = useRouter();
  const color = useThemeColor({}, "tint");

  const onPress = async () => {
    router.back();
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 5,
      }}
      {...props}
    >
      <AntDesign name="left" size={18} color={color} />
    </Pressable>
  );
};
