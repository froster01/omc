/**
 * Loyverse Integration API
 */
import { apiClient } from './client';
import type {
  LoyverseActionResponse,
  LoyverseSyncStatus,
} from '../types/api.types';

export const loyverseApi = {
  /**
   * Get persisted Loyverse sync metadata
   */
  getSyncStatus: async (): Promise<LoyverseSyncStatus> => {
    const { data } = await apiClient.get<{
      success: boolean;
      data: LoyverseSyncStatus;
    }>('/loyverse/sync-status');
    return data.data;
  },

  /**
   * Sync menu from Loyverse
   */
  syncMenu: async (): Promise<LoyverseActionResponse> => {
    const { data } = await apiClient.post<LoyverseActionResponse>(
      '/loyverse/sync-menu',
    );
    return data;
  },

  /**
   * Sync payment types from Loyverse
   */
  syncPaymentTypes: async (): Promise<LoyverseActionResponse> => {
    const { data } = await apiClient.post<LoyverseActionResponse>(
      '/loyverse/sync-payments',
    );
    return data;
  },

  /**
   * Retry failed receipt sync
   */
  retryReceipt: async (
    orderId: string,
  ): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post<{
      success: boolean;
      message: string;
    }>(`/orders/${orderId}/retry-receipt`);
    return data;
  },

  /**
   * Reset menu data (development only)
   */
  resetMenu: async (): Promise<LoyverseActionResponse> => {
    const { data } = await apiClient.post<LoyverseActionResponse>(
      '/loyverse/reset-menu',
    );
    return data;
  },

  /**
   * Reset payment types (development only)
   */
  resetPaymentTypes: async (): Promise<LoyverseActionResponse> => {
    const { data } = await apiClient.post<LoyverseActionResponse>(
      '/loyverse/reset-payments',
    );
    return data;
  },
};
