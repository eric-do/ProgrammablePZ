import Axios, { AxiosRequestConfig } from 'axios';
import * as storage from '../utils/storage';

const authRequestInterceptor = async (config: AxiosRequestConfig) => {
  try {
    const token = await storage.getToken();
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
      config.headers.Accept = `application/json`;
    }
    return config;
  } catch (err) {
    return config;
  }
}

export const axios = Axios.create({
  baseURL: 'http://localhost'
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);