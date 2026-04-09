import axios from 'axios';
import { clearAuth, getToken } from './auth';

const token = getToken();
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuth();
      delete axios.defaults.headers.common.Authorization;
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  }
);
