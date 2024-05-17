import { DateUtils, FinancialProduct } from "@core";

import { BaseService } from "./base.service";

class FinancialProductsServices extends BaseService {
  private path = "/bp/products";

  async getFinancialProducts(): Promise<FinancialProduct[]> {
    const response = await this.axiosInstance.get(this.path);
    return response.data.map((data: Record<string, string>) =>
      this.toFinancialProductModelMapper(data),
    );
  }

  async updateFinancialProduct(
    id: string,
    data: FinancialProduct,
  ): Promise<FinancialProduct> {
    const response = await this.axiosInstance.put(
      this.path,
      this.toFinancialProductRequestMapper({ ...data, id }),
    );
    return this.toFinancialProductModelMapper(response.data);
  }

  async deleteFinancialProduct(id: string): Promise<void> {
    const response = await this.axiosInstance.delete(`${this.path}?id=${id}`);

    return response.data;
  }

  async verifyFinancialProduct(id: string): Promise<boolean> {
    try {
      const response = await this.axiosInstance.get(
        `${this.path}/verification?id=${id}`,
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async createFinancialProduct(
    data: FinancialProduct,
  ): Promise<FinancialProduct> {
    const response = await this.axiosInstance.post(
      this.path,
      this.toFinancialProductRequestMapper(data),
    );

    return this.toFinancialProductModelMapper(response.data);
  }

  private toFinancialProductModelMapper(
    data: Record<string, string>,
  ): FinancialProduct {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      dateRelease: data.date_release,
      dateRevision: data.date_revision,
    };
  }

  private toFinancialProductRequestMapper(
    data: FinancialProduct,
  ): Record<string, string> {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      logo: data.logo,
      date_release: DateUtils.parseToServicesFormat(data.dateRelease),
      date_revision: DateUtils.parseToServicesFormat(data.dateRevision),
    };
  }
}

export const FinancialProductsService = new FinancialProductsServices();
