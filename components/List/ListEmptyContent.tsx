import { Text, View, ListEmptyContentProps, listStyles } from "@components";
import { FC } from "react";

export const ListEmptyContent: FC<ListEmptyContentProps> = ({
  message,
  description,
}) => {
  return (
    <View style={listStyles.emptyContent}>
      <Text variant="header">{message}</Text>
      {description && <Text variant="caption">{description}</Text>}
    </View>
  );
};
