/**
 * Token Service
 * 
 * Secure token storage using react-native-keychain
 * Provides methods for storing and retrieving access/refresh tokens
 */

import * as Keychain from 'react-native-keychain';

const TOKEN_SERVICE = 'olmosq-staff-portal';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenService = {
  /**
   * Store authentication tokens securely
   */
  setTokens: async (accessToken: string, refreshToken: string): Promise<void> => {
    try {
      await Keychain.setGenericPassword(
        ACCESS_TOKEN_KEY,
        JSON.stringify({ accessToken, refreshToken }),
        {
          service: TOKEN_SERVICE,
        }
      );
    } catch (error) {
      console.error('[TokenService] Failed to store tokens:', error);
      throw error;
    }
  },

  /**
   * Get access token
   */
  getAccessToken: async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });

      if (credentials && credentials.password) {
        const { accessToken } = JSON.parse(credentials.password);
        return accessToken;
      }

      return null;
    } catch (error) {
      console.error('[TokenService] Failed to get access token:', error);
      return null;
    }
  },

  /**
   * Get refresh token
   */
  getRefreshToken: async (): Promise<string | null> => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });

      if (credentials && credentials.password) {
        const { refreshToken } = JSON.parse(credentials.password);
        return refreshToken;
      }

      return null;
    } catch (error) {
      console.error('[TokenService] Failed to get refresh token:', error);
      return null;
    }
  },

  /**
   * Clear all stored tokens
   */
  clearTokens: async (): Promise<void> => {
    try {
      await Keychain.resetGenericPassword({
        service: TOKEN_SERVICE,
      });
    } catch (error) {
      console.error('[TokenService] Failed to clear tokens:', error);
      throw error;
    }
  },

  /**
   * Check if tokens exist
   */
  hasTokens: async (): Promise<boolean> => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: TOKEN_SERVICE,
      });
      return !!credentials;
    } catch (error) {
      console.error('[TokenService] Failed to check tokens:', error);
      return false;
    }
  },
};
