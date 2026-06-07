/**
 * Axios API client with authentication interceptors
 */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from '../utils/constants';
import { getToken, removeToken } from '../utils/storage';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors and 401
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear it
      await removeToken();
      // Navigation to login will be handled by useAuth hook
    }
    
    // Format error message
    const message = 
      (error.response?.data as any)?.error || 
      error.message || 
      'An unexpected error occurred';
    
    return Promise.reject(new Error(message));
  }
);
