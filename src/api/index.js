import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$authHost.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 400 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const refresh = `${localStorage.getItem('x-refresh-token')}`;
        console.log(refresh);
        const data = await axios.post(`api/v1/auth/jwt/refresh/`, {refresh});
        localStorage.setItem('x-access-token', data.access);
        return $authHost.request(originalRequest);
      } catch (error) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export { $authHost, $host };
