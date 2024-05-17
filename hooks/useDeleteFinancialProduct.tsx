import { FinancialProduct, FinancialProductsService } from "@core";
import { useMutation, UseMutationOptions } from "@hooks/useMutation";

export const useDeleteFinancialProduct = (
  options: UseMutationOptions<void> = {},
) => {
  const { mutate, error, isLoading } = useMutation<string, void>(
    (data) => FinancialProductsService.deleteFinancialProduct(data),
    options,
  );

  return {
    deleteFinancialProduct: mutate,
    error,
    isLoading,
  };
};
