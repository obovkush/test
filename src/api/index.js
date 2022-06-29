// import axios from 'axios';

// const $host = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// const $accessHost = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// const $refreshHost = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// const accessInterceptor = (config) => {
//   // const token = localStorage.getItem('x-access-token');
//   // config.headers = token ? { 'x-access-token': `${token}` } : '';
//   return config;
// };

// $accessHost.interceptors.request.use(accessInterceptor);

// const refreshInterceptor = (config) => {
//   const token = localStorage.getItem('x-refresh-token');
//   config.headers = token ? { 'x-refresh-token': `${token}` } : '';
//   return config;
// };

// $refreshHost.interceptors.request.use(refreshInterceptor);

// $refreshHost.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         // const token = localStorage.getItem('x-refresh-token');
//         const data = await axios.post(`api/v1/auth/jwt/refresh/`, {
//           // headers: {
//           //   'x-refresh-token': token,
//           // },
//         });
//         localStorage.setItem('x-access-token', data.access);
//         return $refreshHost.request(originalRequest);
//       } catch (error) {
//         console.log('Не авторизован');
//       }
//     }
//     throw error;
//   }
// );

// export { $host, $accessHost, $refreshHost };

import axios from 'axios';

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('x-refresh-token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $authHost, $host };
