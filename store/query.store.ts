import { createContext } from "react";

export type QueryType = string;

export type QueryProviderProps = {
  invalidatedQueries: QueryType[];
  invalidateQuery: (key: QueryType) => void;
};

export const QueryContext = createContext<QueryProviderProps>({
  invalidatedQueries: [],
  invalidateQuery: () => {},
});
