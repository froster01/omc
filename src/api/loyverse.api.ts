/**
 * Loyverse Integration API
 */
import { apiClient } from './client';

export const loyverseApi = {
  /**
   * Sync menu from Loyverse
   */
  syncMenu: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      '/loyverse/sync-menu'
    );
    return data;
  },

  /**
   * Sync payment types from Loyverse
   */
  syncPaymentTypes: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      '/loyverse/sync-payments'
    );
    return data;
  },

  /**
   * Retry failed receipt sync
   */
  retryReceipt: async (orderId: string): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      `/orders/${orderId}/retry-receipt`
    );
    return data;
  },

  /**
   * Reset menu data (development only)
   */
  resetMenu: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      '/loyverse/reset-menu'
    );
    return data;
  },

  /**
   * Reset payment types (development only)
   */
  resetPaymentTypes: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{ success: boolean; message: string }>(
      '/loyverse/reset-payments'
    );
    return data;
  },
};
