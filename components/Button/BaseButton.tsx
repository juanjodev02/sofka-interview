import { BaseButtonProps, ButtonStyles, Text } from "@components";
import { useThemeColor } from "@hooks";
import * as Haptics from "expo-haptics";
import { FC } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

export const BaseButton: FC<BaseButtonProps> = ({
  disabled,
  isLoading,
  ...props
}) => {
  const backgroundColor = useThemeColor(
    {},
    props.backgroundColorName ?? "primary",
  );
  const color = useThemeColor({}, props.colorName ?? "primaryContent");

  const onPress = async () => {
    if (disabled || isLoading) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    props.onPress();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        ButtonStyles.primary,
        { backgroundColor },
        props.style,
        isLoading && ButtonStyles.disabled,
        disabled && ButtonStyles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator testID="button:loader" color={color} />
      ) : (
        <Text variant="button" style={{ color }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
