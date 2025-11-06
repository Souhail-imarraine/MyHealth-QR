import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: authService.getCurrentUser(),
  token: localStorage.getItem('token'),
  isAuthenticated: authService.isAuthenticated(),

  login: async (credentials) => {
    const data = await authService.login(credentials);
    set({
      user: data.data.user,
      token: data.data.token,
      isAuthenticated: true,
    });
    return data;
  },

  register: async (userData) => {
    const data = await authService.register(userData);
    set({
      user: data.data.user,
      token: data.data.token,
      isAuthenticated: true,
    });
    return data;
  },

  logout: () => {
    authService.logout();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  updateUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));
