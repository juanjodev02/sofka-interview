import { FinancialProduct, FinancialProductsService } from "@core";
import { useMutation, UseMutationOptions } from "@hooks/useMutation";

export const useUpdateFinancialProduct = (
  options: UseMutationOptions<FinancialProduct> = {},
) => {
  const { mutate, error, isLoading } = useMutation<
    FinancialProduct,
    FinancialProduct
  >(
    (data) => FinancialProductsService.updateFinancialProduct(data.id, data),
    options,
  );

  return {
    updateFinancialProduct: mutate,
    error,
    isLoading,
  };
};
