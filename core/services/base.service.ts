import axios, { AxiosInstance } from "axios";

const getAxiosInstance = (
  baseUrl: string,
  headers: Record<string, string>,
): AxiosInstance => {
  return axios.create({
    baseURL: baseUrl,
    headers,
  });
};

export class BaseService {
  baseUrl: string = process.env.EXPO_PUBLIC_BASE_URL ?? "";
  headers: Record<string, string> = {
    "Content-Type": "application/json",
    authorId: process.env.EXPO_PUBLIC_AUTHOR_ID ?? "",
  };
  axiosInstance: AxiosInstance = getAxiosInstance(this.baseUrl, this.headers);
}
