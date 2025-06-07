import { instance as http } from '@/api/request';

export type LoginCredential = {
  username?: string;
  password?: string;
};

type SignupPayload = {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export const login = (data?: LoginCredential) => http.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
export const register = (data?: SignupPayload) => http.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
