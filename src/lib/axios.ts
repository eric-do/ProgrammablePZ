import Axios from 'axios';
import { API_URL } from 'config';

export const axios = Axios.create({
  baseURL: API_URL
});

axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);