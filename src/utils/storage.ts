/**
 * Secure storage utilities for tokens and sensitive data
 */
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from './constants';

/**
 * Save authentication token securely
 */
export const saveToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword(STORAGE_KEYS.AUTH_TOKEN, token, {
      service: 'com.omc.staff',
    });
  } catch (error) {
    console.error('Error saving token:', error);
    throw error;
  }
};

/**
 * Retrieve authentication token
 */
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'com.omc.staff',
    });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

/**
 * Remove authentication token
 */
export const removeToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: 'com.omc.staff',
    });
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};

/**
 * Check if token exists
 */
export const hasToken = async (): Promise<boolean> => {
  const token = await getToken();
  return token !== null;
};
