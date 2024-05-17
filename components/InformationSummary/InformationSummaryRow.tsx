import { Text, View, InformationSummaryRowProps } from "@components";
import { FC } from "react";
import { Image } from "react-native";

const getRowComponent = (props: InformationSummaryRowProps) => {
  switch (props.type) {
    case "text":
      return (
        <Text
          style={{
            flex: 3,
            flexWrap: "wrap",
            textAlign: "right",
          }}
          variant="header"
        >
          {props.value as string}
        </Text>
      );

    case "date":
      return (
        <Text variant="header">
          {new Date(props.value).toLocaleDateString()}
        </Text>
      );

    case "image":
      return (
        <View
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: props.value as string }}
            style={{ width: 250, height: 160 }}
          />
        </View>
      );

    default:
      return null;
  }
};

export const InformationSummaryRow: FC<InformationSummaryRowProps> = (
  props,
) => {
  const isImage = props.type === "image";
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        },
        isImage && {
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        },
      ]}
    >
      <Text
        style={[
          { flex: 4 },
          isImage && { flex: 0, textAlign: "left", marginBottom: 10 },
        ]}
      >
        {props.label}
      </Text>
      {getRowComponent(props)}
    </View>
  );
};
