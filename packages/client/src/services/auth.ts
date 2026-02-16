import { get, post } from '@/lib/request';
import type { User, RegisterInput, LoginInput } from 'common';

export const getMe = () => get<User>('/auth/me');

export const register = (data: RegisterInput) => 
  post<User>('/auth/register', data);

export const login = (data: LoginInput) => 
  post<User>('/auth/login', data);

export const logout = () => 
  post<{ success: boolean }>('/auth/logout');
