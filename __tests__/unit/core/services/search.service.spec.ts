import { SearchService } from "@core";

describe("SearchService", () => {
  it("should return search results", () => {
    const searchResults = SearchService.search("test", "name", [
      {
        name: "test",
        description: "test",
        logo: "test",
        dateRelease: "22/10/2022",
        dateRevision: "22/10/2023",
      },
    ]);
    expect(searchResults.length).toBe(1);
  });
});
