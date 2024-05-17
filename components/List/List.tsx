import { ListProps, listStyles } from "@components";
import { useThemeColor } from "@hooks";
import { defaultStyles } from "@theme";
import { FlatList } from "react-native";

export const List = <T extends { id: string }>(props: ListProps<T>) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const borderColor = useThemeColor({}, "border");

  const isEmpty = !props.data || props.data.length === 0;

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor,
        ...(isEmpty && listStyles.emptyContentContainer),
      }}
      style={{
        borderWidth: isEmpty ? 0 : defaultStyles.border.borderWidth,
        borderRadius: defaultStyles.border.borderRadius,
        borderColor: isEmpty ? "transparent" : borderColor,
      }}
      keyExtractor={(item) => item.id.toString()}
      {...otherProps}
    />
  );
};
