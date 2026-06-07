/**
 * API Client Service
 * 
 * Axios-based HTTP client with interceptors for authentication,
 * error handling, and request/response transformation
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api';
import { tokenService } from './tokenService';

// API Error Response Type
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor - attach auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await tokenService.getAccessToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (__DEV__) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and token refresh
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (__DEV__) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Log error in development
    if (__DEV__) {
      console.error(`[API Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    
    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = await tokenService.getRefreshToken();
        
        if (refreshToken) {
          // Attempt to refresh the token
          const response = await axios.post(
            `${API_CONFIG.baseURL}/auth/refresh`,
            { refreshToken }
          );
          
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Store new tokens
          await tokenService.setTokens(accessToken, newRefreshToken);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        await tokenService.clearTokens();
        // Emit event for auth store to handle
        // You can use an event emitter or state management here
        return Promise.reject(refreshError);
      }
    }
    
    // Transform error to ApiError format
    const apiError: ApiError = {
      message: (error.response?.data as any)?.message || error.message || 'An unexpected error occurred',
      code: (error.response?.data as any)?.code || error.code,
      status: error.response?.status,
      errors: (error.response?.data as any)?.errors,
    };
    
    return Promise.reject(apiError);
  }
);

// API Client Methods
export const api = {
  get: <T = any>(url: string, config = {}) => 
    apiClient.get<T>(url, config).then(res => res.data),
  
  post: <T = any>(url: string, data?: any, config = {}) => 
    apiClient.post<T>(url, data, config).then(res => res.data),
  
  put: <T = any>(url: string, data?: any, config = {}) => 
    apiClient.put<T>(url, data, config).then(res => res.data),
  
  patch: <T = any>(url: string, data?: any, config = {}) => 
    apiClient.patch<T>(url, data, config).then(res => res.data),
  
  delete: <T = any>(url: string, config = {}) => 
    apiClient.delete<T>(url, config).then(res => res.data),
};

export default apiClient;
