/**
 * Test API Connection
 * Simple utility to test backend connectivity
 */

import { API_CONFIG } from '../config/api';

export const testConnection = async (): Promise<{
  success: boolean;
  message: string;
  url: string;
}> => {
  const url = `${API_CONFIG.baseURL}/health`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: API_CONFIG.headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        success: true,
        message: 'Backend connected successfully',
        url,
      };
    } else {
      return {
        success: false,
        message: `Backend returned status ${response.status}`,
        url,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Connection failed',
      url,
    };
  }
};

// Quick test - run on app start in development
if (__DEV__) {
  testConnection().then(result => {
    console.log('[API Test]', result);
  });
}
