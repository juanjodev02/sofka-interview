import { Button, ScreenContainer, Text, View } from "@components";
import { Form } from "@components/Form";
import {
  FinancialProduct,
  FinancialProductForm as FormConfigService,
  FormState,
  QueryKeys,
} from "@core";
import {
  useCreateFinancialProduct,
  useQueryContext,
  useUpdateFinancialProduct,
} from "@hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function FinancialProductForm() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [isEditing] = useState(() => !!item?.id);
  const { t } = useTranslation();
  const { invalidateQuery } = useQueryContext();

  const formConfig = useCallback(
    () =>
      FormConfigService.getFields({
        initValues: item as Record<string, string>,
        isEditing,
        t,
      }),
    [item, isEditing, t],
  );

  const { isLoading: updateLoading, updateFinancialProduct } =
    useUpdateFinancialProduct({
      onError: (error) => errorHandling(error),
      onSuccess: () => successHandler(),
    });

  const { isLoading: createLoading, createFinancialProduct } =
    useCreateFinancialProduct({
      onError: (error) => errorHandling(error),
      onSuccess: () => successHandler(),
    });

  const successHandler = () => {
    invalidateQuery(QueryKeys.financialProducts);
    router.replace({
      pathname: "/utils/success",
      params: { description: t("form.successMessage") },
    });
  };

  const errorHandling = (error: string) => {
    Alert.alert(t("form.error"), error);
  };

  const onCreate = (values: FormState) => {
    createFinancialProduct(values as FinancialProduct);
  };

  const onUpdate = (values: FormState) => {
    updateFinancialProduct(values as FinancialProduct);
  };

  const handleButtonPress = (values: FormState) => {
    if (isEditing) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };

  return (
    <ScreenContainer scrollable insertBottomInsets>
      <Text variant="heading">
        {isEditing ? t("form.editHeader") : t("form.createHeader")}
      </Text>

      <Form fields={formConfig()}>
        {({ formState, isValid, reset }) => (
          <View style={{ gap: 20 }}>
            <Button
              isLoading={updateLoading || createLoading}
              disabled={updateLoading || createLoading || !isValid}
              variant="primary"
              title={t("form.submitButton")}
              onPress={() => handleButtonPress(formState)}
            />
            <Button
              variant="secondary"
              disabled={updateLoading || createLoading}
              title={t("form.resetButton")}
              onPress={reset}
            />
          </View>
        )}
      </Form>
    </ScreenContainer>
  );
}
