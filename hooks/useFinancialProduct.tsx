import { useFinancialProducts } from "@hooks/useFinancialProducts";
import { UseQueryOptions } from "@hooks/useQuery";

export const useFinancialProduct = (id: string, options?: UseQueryOptions) => {
  const {
    data: financialProducts,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useFinancialProducts(options);

  const financialProduct = financialProducts.find(
    (product) => product.id === id,
  );

  return {
    financialProduct,
    isLoading,
    error,
    refetch,
    isRefetching,
  };
};
