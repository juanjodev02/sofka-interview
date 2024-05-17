import { FinancialProduct, FinancialProductsService } from "@core";
import { useMutation, UseMutationOptions } from "@hooks/useMutation";

export const useCreateFinancialProduct = (
  options: UseMutationOptions<FinancialProduct> = {},
) => {
  const { mutate, error, isLoading } = useMutation<
    FinancialProduct,
    FinancialProduct
  >((data) => FinancialProductsService.createFinancialProduct(data), options);

  return {
    createFinancialProduct: mutate,
    error,
    isLoading,
  };
};
