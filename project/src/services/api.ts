import axios, { AxiosInstance, AxiosError } from 'axios';

import { store } from '../store';
import { setDataLoadingStatus } from '../store/action';


const BASE_URL = 'https://11.react.pages.academy/six-cities-simple';
const TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      store.dispatch(setDataLoadingStatus(true));

      throw error;
    }
  );

  return api;
};
