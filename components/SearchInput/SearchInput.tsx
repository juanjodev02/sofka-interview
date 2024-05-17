import { SearchInputProps, searchInputStyles } from "@components";
import { useThemeColor } from "@hooks";
import { FC, useState } from "react";
import { TextInput } from "react-native";

export const SearchInput: FC<SearchInputProps> = ({
  onSearch,
  placeholder,
  ...props
}) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const borderColor = useThemeColor({}, "border");

  const color = useThemeColor({}, "text");

  const placeholderTextColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "placeholder",
  );

  const [text, setText] = useState("");

  return (
    <TextInput
      style={[searchInputStyles.searchInput, { borderColor, color }, style]}
      placeholderTextColor={placeholderTextColor}
      value={text}
      onChangeText={(value) => {
        setText(value);
        onSearch(value);
      }}
      placeholder={placeholder}
      {...otherProps}
    />
  );
};
