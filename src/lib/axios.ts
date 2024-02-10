import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@src/config";

function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers?.Accept) config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor as never);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace("/");
    }
    return Promise.reject(error);
  }
);
