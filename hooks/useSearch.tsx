import { SearchService } from "@core";
import { useEffect, useState } from "react";

export const useSearch = <T,>(data: T[], key: string, query: string) => {
  const [results, setResults] = useState<T[]>(() => data);

  useEffect(() => {
    if (!query) {
      setResults(data);
      return;
    }

    const results = SearchService.search(query, key, data);

    setResults(results);
  }, [query, data]);

  return results;
};
