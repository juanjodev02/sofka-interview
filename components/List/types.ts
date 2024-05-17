import { FlatListProps, ListRenderItem } from "react-native";

import { ViewProps } from "@/components";
import { ThemeProps } from "@/theme";

export interface ListProps<T extends { id: string }>
  extends FlatListProps<T>,
    ThemeProps {
  renderItem: ListRenderItem<T>;
  data: T[];
}

export interface ListItemProps<T extends { id: string }> extends ViewProps {
  item: T;
}

export interface ListEmptyContentProps extends ViewProps {
  message: string;
  description?: string;
}
