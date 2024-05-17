import Fuse from "fuse.js";

class _SearchService {
  search<T>(query: string, key: string, data: T[]): T[] {
    const fuse = new Fuse(data, {
      keys: [key],
    });

    return fuse.search(query).map((result) => result.item);
  }
}

export const SearchService = new _SearchService();
