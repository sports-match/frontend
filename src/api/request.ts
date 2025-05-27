import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthentication } from '@/composables';
import { setLoading } from '@/composables/loading';
import { notify } from '@/composables/notify';
import router from '@/routes';
import { useUserStore } from '@/stores';
import Axios from 'axios';

const defaultConfig: AxiosRequestConfig = {
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance: AxiosInstance = Axios.create(defaultConfig);

// Add a request interceptor
instance.interceptors.request.use((config) => {
  setLoading(true);
  const { getToken } = useAuthentication();
  console.log(getToken);

  // Add the access token to the request
  if (getToken.value) {
    config.headers.Authorization = `${getToken.value}`;
  }
  return config;
}, (error) => {
  setLoading(false);
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  setLoading(false);
  return response;
}, async (error) => {
  // keep the original request for retry
  // const originalRequest: AxiosRequestConfig = error.config;

  setLoading(false);
  const { getToken, clearSession, isAuthenticated } = useAuthentication();

  // handle expired token in case the refresh token is invalid
  if (error.response?.status === 400 && error.response?.data?.error === 'invalid_grant' && isAuthenticated.value) {
    notify.error('Session Expired');
    useUserStore().$reset();
    clearSession();
    return router.push({ name: 'AuthLoginPage' });
  }

  // handle expired token by refresh the token
  // if (error.response?.status === 401 && error.response?.data?.error === 'invalid_token' && isAuthenticated.value) {
  //   const newAccessToken = await useUserStore().handRefreshToken(getToken.value?.refresh_token);
  //   error.config.headers.Authorization = `Bearer ${newAccessToken}`;

  //   // Retry the original request
  //   return instance(originalRequest);
  // }
  return Promise.reject(error);
});

export { instance };
