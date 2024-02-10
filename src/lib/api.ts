import { axios } from "./axios";
import { AxiosResponse } from "axios";

type apiConfigDataType = {
  url: string;
  id?: string;
  method: string;
  headers?: { [key: string]: string };
  queryParams?: Record<string, unknown>;
};

export const apiCallHandler = <TData, TVariable>(
  apiConfig: apiConfigDataType
) => {
  return async (data?: TVariable): Promise<TData> => {
    try {
      const response: AxiosResponse<TData> = await axios({
        method: apiConfig.method,
        url: apiConfig.url,
        params: apiConfig.queryParams,
        headers: {
          "Content-Type": "application/json",
          ...apiConfig.headers,
        },
        data: { ...data },
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error.response.data;
    }
  };
};
