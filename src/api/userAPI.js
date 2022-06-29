import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const login = async (username, password) => {
  const { data } = await $host.post('api/v1/auth/jwt/create/', {
    username,
    password,
  });
  console.log(data);
  if (data.access) {
    localStorage.setItem('x-access-token', data.access);
    localStorage.setItem('x-refresh-token', data.refresh);
    return jwt_decode(data.refresh);
  }
  return data;
};

export const refreshToken = async () => {
  const { data } = await $authHost.post('api/v1/auth/jwt/refresh/');
  if (data.access) {
    localStorage.setItem('x-access-token', data.access);
  }
  return data;
};
