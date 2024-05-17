import { ListItemProps, Text, View, listStyles } from "@components";
import { FinancialProduct } from "@core";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@hooks";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { FC, memo } from "react";
import { TouchableOpacity } from "react-native";

export const ListFinancialProductItem: FC<ListItemProps<FinancialProduct>> =
  memo(({ item, ...props }) => {
    const iconColor = useThemeColor({}, "icon");
    const router = useRouter();

    const OnPress = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.push({
        pathname: "/details/[id]",
        params: item,
      });
    };

    return (
      <TouchableOpacity
        style={listStyles.listItemContainer}
        onPress={OnPress}
        testID={props.testID}
      >
        <View style={listStyles.listItemContent}>
          <Text variant="header">{item.name}</Text>
          <Text variant="caption">ID: {item.id}</Text>
        </View>
        <AntDesign name="right" size={18} color={iconColor} />
      </TouchableOpacity>
    );
  });
