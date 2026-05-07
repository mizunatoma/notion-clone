import type { InternalAxiosRequestConfig } from "axios";

export const addAuthorizationHeaders = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};
