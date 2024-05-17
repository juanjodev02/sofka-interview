import { useQueryContext } from "@hooks/useQueryContext";
import { useEffect, useState } from "react";

export type UseQueryResult<Y> = {
  data: Y | null;
  isLoading: boolean;
  error: string;
  refetch: () => void;
  isRefetching: boolean;
};

export type UseQueryOptions = {
  onError?: (error: string) => void;
};

export const useQuery = <Y,>(
  queryKey: string,
  queryFn: () => Promise<Y>,
  options?: UseQueryOptions,
): UseQueryResult<Y> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [data, setData] = useState<Y | null>(null);
  const { invalidatedQueries } = useQueryContext();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (invalidatedQueries.includes(queryKey)) {
      fetch();
    }
  }, [invalidatedQueries]);

  const fetch = () => {
    queryFn()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        options?.onError && options.onError(error);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const refetch = () => {
    setIsRefetching(true);
    queryFn()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsRefetching(false);
      });
  };

  return {
    data,
    isLoading,
    error: "",
    refetch,
    isRefetching,
  };
};
