import { useState } from "react";

export type MutationFunction<T, Y> = (data: T) => Promise<Y>;

export type UseMutationOptions<Y> = {
  onError?: (error: string) => void;
  onSuccess?: (data: Y) => void;
};

export type UseMutationResult<T> = {
  isLoading: boolean;
  error: string;
  mutate: (data: T) => void;
};

export const useMutation = <T, Y>(
  mutation: MutationFunction<T, Y>,
  options?: UseMutationOptions<Y>,
): UseMutationResult<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const mutate = (data: T) => {
    setIsLoading(true);
    mutation(data)
      .then((response) => {
        options?.onSuccess && options.onSuccess(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        options?.onError && options.onError(error.message);
        setError(error.message);
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    error,
    mutate,
  };
};
