import { Text, View } from "@components";
import { TextInputStyles } from "@components/Form/styles";
import { DateInputProps } from "@components/Form/types";
import { DateUtils } from "@core";
import { useThemeColor } from "@hooks";
import { FC, useState } from "react";
import { TextInput as RNTextInput } from "react-native";

export const DateInput: FC<DateInputProps> = ({
  label,
  value,
  onChange,
  disabled,
  error,
  caption,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const disabledBackgroundColor = useThemeColor({}, "disabledBackground");
  const color = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const errorColor = useThemeColor({}, "danger");
  const focusColor = useThemeColor({}, "primaryContent");

  return (
    <View style={{ marginBottom: 10, gap: 10 }}>
      <Text style={TextInputStyles.label}>{label}</Text>
      {caption && <Text variant="caption">{caption}</Text>}
      <RNTextInput
        testID="input-text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        style={[
          {
            height: 50,
            borderWidth: 1,
            borderRadius: 8,
            marginVertical: 10,
            padding: 10,
            color,
            borderColor,
          },
          isFocused && { borderColor: focusColor },
          !!error && {
            borderColor: errorColor,
          },
          disabled && {
            backgroundColor: disabledBackgroundColor,
            opacity: 0.7,
          },
        ]}
        value={DateUtils.formatString(value)}
        onChange={(e) => {
          onChange(DateUtils.formatString(e.nativeEvent.text));
        }}
        keyboardType="number-pad"
      />
      {error && (
        <Text style={{ color: errorColor, fontSize: 10 }}>{error}</Text>
      )}
    </View>
  );
};
