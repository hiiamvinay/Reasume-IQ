import api from './api';
import type { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

export const login = (creds: LoginCredentials) =>
  api.post<AuthResponse>('/auth/login', creds);

export const signup = (creds: SignupCredentials) =>
  api.post<AuthResponse>('/auth/signup', creds);

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};
