import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  listItemContent: {
    gap: 10,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
