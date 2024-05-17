import {
  Button,
  SearchInput,
  List,
  ListFinancialProductItem,
  Text,
  ListEmptyContent,
  ScreenContainer,
  Separator,
} from "@components";
import { Loader } from "@components/Loader";
import { useFinancialProducts, useSearch } from "@hooks";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function MainScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoading, data, error, refetch, isRefetching } =
    useFinancialProducts({
      onError: (error) => {
        Alert.alert("Error", error);
      },
    });
  const [query, setQuery] = useState("");

  const filteredData = useSearch(data, "name", query);

  const onAddPress = () => {
    router.push("/forms/financialProductForm");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScreenContainer testID="MainScreen">
      <SearchInput
        onSearch={(value) => {
          setQuery(value);
        }}
        placeholder={t("home.searchPlaceholder")}
      />
      <List
        onRefresh={refetch}
        refreshing={isRefetching}
        data={filteredData}
        renderItem={({ item }) => <ListFinancialProductItem item={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <ListEmptyContent
            message={t("home.emptyMessage")}
            description={t("home.emptyDescription")}
          />
        }
      />
      <Button variant="primary" title={t("home.button")} onPress={onAddPress} />
    </ScreenContainer>
  );
}
