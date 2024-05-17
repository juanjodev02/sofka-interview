import { QueryContext } from "@store/query.store";
import { useContext } from "react";

export const useQueryContext = () => {
  const { invalidatedQueries, invalidateQuery } = useContext(QueryContext);
  return { invalidatedQueries, invalidateQuery };
};
