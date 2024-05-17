import { QueryProviderProps } from "@components/QueryProvider/types";
import { QueryContext, QueryType } from "@store/query.store";
import { FC, useState } from "react";

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [invalidatedQueries, setInvalidatedQueries] = useState<QueryType[]>([]);

  const invalidateQuery = (key: QueryType) => {
    setInvalidatedQueries([...invalidatedQueries, key]);
  };

  return (
    <QueryContext.Provider
      value={{
        invalidatedQueries,
        invalidateQuery,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
