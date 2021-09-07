import axios, { AxiosInstance } from 'axios';

export const createService = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.request.use(config => {
    return config;
  });
  return instance;
};
