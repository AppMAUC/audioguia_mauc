import { AxiosRequestConfig } from "axios";

type config = AxiosRequestConfig;

export const requestConfig = (credentials = true): config => {
  const token = localStorage.getItem("token");

  const config: config = {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000,
    withCredentials: credentials,
  };

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
