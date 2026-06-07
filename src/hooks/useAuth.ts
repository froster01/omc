/**
 * Authentication hook using Zustand
 */
import { create } from 'zustand';
import { authApi } from '../api/auth.api';
import { saveToken, removeToken, getToken } from '../utils/storage';
import type { User } from '../types/api.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const { token, user } = await authApi.login({ username, password });
      await saveToken(token);
      
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      set({ 
        error: message, 
        isLoading: false,
        isAuthenticated: false,
        user: null 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      await removeToken();
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null 
      });
    }
  },

  checkAuth: async () => {
    try {
      const token = await getToken();
      
      if (!token) {
        set({ isLoading: false, isAuthenticated: false });
        return;
      }

      const user = await authApi.getMe();
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      await removeToken();
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));
