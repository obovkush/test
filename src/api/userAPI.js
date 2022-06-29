import { $authHost, $host } from './index';

// todo try catch

export const login = async (username, password) => {
  const { data } = await $host.post('api/v1/auth/jwt/create/', {
    username,
    password,
  });
  if (data.access) {
    localStorage.setItem('x-access-token', data.access);
    localStorage.setItem('x-refresh-token', data.refresh);
    return data.user;
  }
  return 'Что-то пошло не так';
};

export const refreshToken = async () => {
  const refresh = `${localStorage.getItem('x-refresh-token')}`;
  const { data } = await $authHost.post('api/v1/auth/jwt/refresh/', {
    refresh,
  });
  if (data.access) {
    localStorage.setItem('x-access-token', data.access);
  }
  return 'Что-то пошло не так';
};
