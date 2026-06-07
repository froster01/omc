/**
 * Auth Store (Zustand)
 * 
 * Global state management for authentication
 */

import { create } from 'zustand';
import { authService, User } from '../services/authService';
import { ApiError } from '../services/api';

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Login action
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authService.login({ username, password });

      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: apiError.message || 'Login failed. Please try again.',
      });
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true });

    try {
      await authService.logout();

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      console.error('[AuthStore] Logout failed:', apiError);
      
      // Clear state even if logout request fails
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  // Load user on app start
  loadUser: async () => {
    set({ isLoading: true });

    try {
      const isAuth = await authService.isAuthenticated();

      if (isAuth) {
        const user = await authService.getCurrentUser();

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error('[AuthStore] Load user failed:', apiError);

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
