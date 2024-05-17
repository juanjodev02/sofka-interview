import { FinancialProductsService } from "@core";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("FinancialProductsService", () => {
  it("should fetch financial products", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [],
    });

    FinancialProductsService.axiosInstance = mockedAxios;

    const data = FinancialProductsService.getFinancialProducts();

    await expect(data).resolves.toEqual([]);
  });

  it("should update financial product", async () => {
    const body = {
      name: "test",
      logo: "test",
      id: "1",
      description: "test",
      dateRelease: "22/10/2022",
      dateRevision: "22/10/2023",
    };

    mockedAxios.put.mockResolvedValue({
      data: body,
    });

    FinancialProductsService.axiosInstance = mockedAxios;

    const data = await FinancialProductsService.updateFinancialProduct(
      "1",
      body,
    );

    expect(data.id).toEqual(body.id);
  });

  it("should delete financial product", async () => {
    mockedAxios.delete.mockResolvedValue({
      data: {},
    });

    FinancialProductsService.axiosInstance = mockedAxios;

    const data = await FinancialProductsService.deleteFinancialProduct("1");

    expect(data).toEqual({});
  });

  it("should verify financial product", async () => {
    mockedAxios.get.mockResolvedValue({
      data: true,
    });

    FinancialProductsService.axiosInstance = mockedAxios;

    const data = await FinancialProductsService.verifyFinancialProduct("1");

    expect(data).toEqual(true);
  });

  it("should create financial product", async () => {
    const body = {
      name: "test",
      logo: "test",
      id: "1",
      description: "test",
      dateRelease: "22/10/2022",
      dateRevision: "22/10/2023",
    };

    mockedAxios.post.mockResolvedValue({
      data: body,
    });

    FinancialProductsService.axiosInstance = mockedAxios;

    const data = await FinancialProductsService.createFinancialProduct(body);

    expect(data.id).toEqual(body.id);
  });
});
