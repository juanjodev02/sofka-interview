import { ScreenContainerProps } from "@components/ScreenContainer/types";
import { useThemeColor } from "@hooks";
import { FC } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Platform,
} from "react-native";

export const ScreenContainer: FC<ScreenContainerProps> = ({
  children,
  scrollable,
  insertBottomInsets = false,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <KeyboardAvoidingView
      testID={props.testID}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 70}
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      {scrollable ? (
        <ScrollView
          contentInset={{ bottom: insertBottomInsets ? 50 : 0 }}
          contentContainerStyle={{
            backgroundColor,
            flexGrow: 1,
            padding: 20,
            gap: 50,
            justifyContent: "flex-start",
          }}
          style={{ backgroundColor }}
        >
          {children}
        </ScrollView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              padding: 20,
              paddingBottom: 50,
              gap: 50,
              justifyContent: "flex-start",
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
};
