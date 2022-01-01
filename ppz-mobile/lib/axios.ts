import Axios, { AxiosRequestConfig } from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost'
});

axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);