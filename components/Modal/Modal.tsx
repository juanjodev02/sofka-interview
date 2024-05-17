import { View } from "@components";
import { ModalProps } from "@components/Modal/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@hooks";
import { FC } from "react";
import { Dimensions, TouchableWithoutFeedback } from "react-native";
import RNModal from "react-native-modal";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const Modal: FC<ModalProps> = ({
  children,
  visible,
  onBackdropPress,
  ...props
}) => {
  const iconColor = useThemeColor({}, "text");

  return (
    <RNModal
      scrollOffsetMax={500}
      supportedOrientations={["portrait", "landscape"]}
      onModalHide={onBackdropPress}
      avoidKeyboard
      deviceWidth={deviceWidth}
      deviceHeight={deviceHeight}
      animationIn="slideInUp"
      swipeDirection="down"
      propagateSwipe
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      useNativeDriverForBackdrop
      isVisible={visible}
      backdropOpacity={0.8}
      style={{ margin: 0, justifyContent: "flex-end" }}
      testID={props.testID}
      {...props}
    >
      <View
        style={{
          paddingBottom: 40,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: "hidden",
          maxHeight: "70%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            paddingVertical: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <AntDesign name="close" size={24} color={iconColor} />
          </TouchableWithoutFeedback>
        </View>
        {children}
      </View>
    </RNModal>
  );
};
