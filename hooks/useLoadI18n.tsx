import { useEffect, useState } from "react";

import { init } from "@/i18n";

export const useLoadI18n = (): {
  i18nLoaded: boolean;
  error: Error | null;
} => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    init("es")
      .then(() => setIsLoaded(true))
      .catch(setError);
  }, []);

  return {
    i18nLoaded: isLoaded,
    error,
  };
};
