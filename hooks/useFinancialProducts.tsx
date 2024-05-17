import { useQuery, UseQueryOptions } from "@hooks/useQuery";

import { FinancialProduct, FinancialProductsService, QueryKeys } from "@/core";

export const useFinancialProducts = (
  options?: UseQueryOptions,
): {
  isLoading: boolean;
  error: string;
  data: FinancialProduct[];
  refetch: () => void;
  isRefetching: boolean;
} => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    QueryKeys.financialProducts,
    () => FinancialProductsService.getFinancialProducts(),
    options,
  );

  return {
    isLoading,
    error,
    data: data ?? [],
    refetch,
    isRefetching,
  };
};
