import {
  Button,
  InformationSummary,
  ScreenContainer,
  Text,
  View,
  Modal,
  Separator,
} from "@components";
import { Loader } from "@components/Loader";
import { FinancialProduct, QueryKeys } from "@core";
import {
  useDeleteFinancialProduct,
  useFinancialProduct,
  useQueryContext,
} from "@hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function Details() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<FinancialProduct>();
  const { isLoading: itemLoading, financialProduct } = useFinancialProduct(
    String(params.id),
    {
      onError: (error) => errorHandling(error),
    },
  );
  const [visible, setVisible] = useState(false);
  const { invalidateQuery } = useQueryContext();
  const { isLoading, deleteFinancialProduct } = useDeleteFinancialProduct({
    onError: (error) => errorHandling(error),
    onSuccess: () => {
      invalidateQuery(QueryKeys.financialProducts);
      router.dismissAll();
    },
  });

  const errorHandling = (error: string) => {
    Alert.alert("Error", error);
  };

  const fields = useMemo(() => {
    return [
      {
        label: t("details.nameLabel"),
        value: String(financialProduct?.name),
        type: "text" as const,
      },
      {
        label: t("details.descriptionLabel"),
        value: String(financialProduct?.description),
        type: "text" as const,
      },
      {
        label: t("details.logoLabel"),
        value: String(financialProduct?.logo),
        type: "image" as const,
      },
      {
        label: t("details.dateReleaseLabel"),
        value: String(financialProduct?.dateRelease),
        type: "date" as const,
      },
      {
        label: t("details.dateRevisionLabel"),
        value: String(financialProduct?.dateRevision),
        type: "date" as const,
      },
    ];
  }, [financialProduct]);

  const onEdit = () => {
    router.push({
      pathname: "/forms/financialProductForm",
      params: financialProduct,
    });
  };

  const onDelete = () => {
    setVisible(true);
  };

  const onConfirmDelete = () => {
    deleteFinancialProduct(String(financialProduct?.id));
  };

  const onModalClose = () => {
    if (isLoading) return;
    setVisible(false);
  };

  if (itemLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScreenContainer scrollable>
        <View style={{ marginBottom: 50 }}>
          <Text variant="heading">
            {t("details.id")} {financialProduct?.id}
          </Text>
          <Text variant="body">{t("details.description")}</Text>
        </View>
        <View style={{ flex: 6 }}>
          <InformationSummary fields={fields} />
        </View>
        <View style={{ gap: 10, flex: 2 }}>
          <Button
            variant="secondary"
            title={t("details.editButton")}
            onPress={onEdit}
          />
          <Button
            variant="danger"
            title={t("details.deleteButton")}
            onPress={onDelete}
          />
        </View>
      </ScreenContainer>
      <Modal visible={visible} onBackdropPress={onModalClose}>
        <View style={{ gap: 20 }}>
          <Separator />
          <Text style={{ textAlign: "center" }}>
            {t("details.deleteMessage", { name: financialProduct?.name })}
          </Text>
          <Separator />
          <Button
            variant="primary"
            title="Confirmar"
            onPress={onConfirmDelete}
            isLoading={isLoading}
          />
          <Button variant="secondary" title="Cancelar" onPress={onModalClose} />
        </View>
      </Modal>
    </>
  );
}
