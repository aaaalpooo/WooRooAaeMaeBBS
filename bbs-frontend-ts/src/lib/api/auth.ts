import axios from 'axios';

type LoginPayload = { username: string; password: string };
export const login = (payload: LoginPayload) =>
  axios.post(`/api/v1/auth/login`, payload);

type RegisterPayload = {
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
};
export const register = (payload: RegisterPayload) =>
  axios.post(`/api/v1/auth/register`, payload);

export const check = (token: string) =>
  axios.post(`/api/v1/auth/check`, {}, { headers: { Authorization: token } });

export const logout = (token: string) =>
  axios.post(`/api/v1/auth/logout`, {}, { headers: { Authorization: token } });
