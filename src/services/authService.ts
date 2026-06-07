/**
 * Authentication Service
 * 
 * Handles authentication logic: login, logout, token refresh
 */

import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import { tokenService } from './tokenService';

// Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'manager' | 'staff';
  email?: string;
}

export const authService = {
  /**
   * Login with username and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.auth.login,
        credentials
      );

      // Store tokens securely
      await tokenService.setTokens(response.accessToken, response.refreshToken);

      return response;
    } catch (error) {
      console.error('[AuthService] Login failed:', error);
      throw error;
    }
  },

  /**
   * Logout - clear tokens and session
   */
  logout: async (): Promise<void> => {
    try {
      await api.post(API_ENDPOINTS.auth.logout);
    } catch (error) {
      console.error('[AuthService] Logout request failed:', error);
      // Continue with local cleanup even if server request fails
    } finally {
      await tokenService.clearTokens();
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const user = await api.get<User>(API_ENDPOINTS.auth.me);
      return user;
    } catch (error) {
      console.error('[AuthService] Failed to get current user:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    return await tokenService.hasTokens();
  },

  /**
   * Refresh authentication tokens
   */
  refreshTokens: async (): Promise<void> => {
    try {
      const refreshToken = await tokenService.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.auth.refresh,
        { refreshToken }
      );

      await tokenService.setTokens(response.accessToken, response.refreshToken);
    } catch (error) {
      console.error('[AuthService] Token refresh failed:', error);
      await tokenService.clearTokens();
      throw error;
    }
  },
};
