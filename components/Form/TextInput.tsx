import { Text, View } from "@components";
import { TextInputStyles } from "@components/Form/styles";
import { InputProps } from "@components/Form/types";
import { useThemeColor } from "@hooks";
import { FC, useState } from "react";
import { ActivityIndicator, TextInput as RNTextInput } from "react-native";

export const TextInput: FC<InputProps> = ({
  value,
  onChange,
  label,
  error,
  disabled,
  isLoading,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const disabledBackgroundColor = useThemeColor({}, "disabledBackground");
  const color = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const errorColor = useThemeColor({}, "danger");
  const focusColor = useThemeColor({}, "primaryContent");
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={TextInputStyles.label}>{label}</Text>
      <View style={{ position: "relative" }}>
        {isLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: 10,
              top: 0,
              bottom: 0,
            }}
            size="small"
            color={color}
          />
        )}
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
          value={value}
          onChange={(e) => {
            onChange(e.nativeEvent.text);
          }}
          keyboardType="default"
        />
      </View>
      {error && (
        <Text style={{ color: errorColor, fontSize: 10 }}>{error}</Text>
      )}
    </View>
  );
};
