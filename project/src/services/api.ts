import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

import { getToken } from './token';


const BASE_URL = 'https://11.react.pages.academy/six-cities-simple';
const TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      throw error;
    }
  );

  return api;
};
