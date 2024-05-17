import { DateUtils } from "@core";

describe("DateUtils", () => {
  it("should return date in format DD/MM/YYYY", () => {
    expect(DateUtils.formatString("22/10/2024")).toBe("22/10/2024");
    expect(DateUtils.formatString("22")).toBe("22");
    expect(DateUtils.formatString("22/10")).toBe("22/10");
  });

  it("should parse date to format DD/MM/YYYY", () => {
    expect(DateUtils.parseDate("2024-10-22T00:00:00.000Z")).toBe("22/10/2024");
  });

  it("should return empty string if date is invalid", () => {
    expect(DateUtils.parseDate("")).toBe("");
  });

  it("should add years to date", () => {
    expect(DateUtils.addYears("22/10/2024", 1)).toBe("22/10/2025");
  });

  it("should return date in yyyy-mm-dd format", () => {
    expect(DateUtils.parseToServicesFormat("22/10/2024")).toBe("2024-10-22");
  });

  it("should return date in yyyy-mm-dd format with not valida date", () => {
    expect(DateUtils.parseToServicesFormat("")).toBe("");
  });
});
