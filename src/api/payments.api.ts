/**
 * Payment Types API
 */
import { apiClient } from './client';
import type { PaymentType } from '../types/api.types';

export const paymentsApi = {
  /**
   * Get all active payment types
   */
  getPaymentTypes: async (): Promise<PaymentType[]> => {
    const { data } = await apiClient.get<{ paymentTypes: PaymentType[] }>(
      '/payment-types'
    );
    return data.paymentTypes;
  },
};
