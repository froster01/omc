/**
 * Orders API
 */
import { apiClient } from './client';
import type {
  Order,
  UpdateOrderStatusRequest,
  RecordPaymentRequest,
} from '../types/api.types';

export const ordersApi = {
  /**
   * Get all orders for current shift
   */
  getOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<{ orders: Order[] }>('/orders');
    return data.orders;
  },

  /**
   * Get single order by ID
   */
  getOrderById: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get<{ order: Order }>(`/orders/${id}`);
    return data.order;
  },

  /**
   * Update order status
   */
  updateOrderStatus: async (
    id: string,
    status: UpdateOrderStatusRequest['status']
  ): Promise<Order> => {
    const { data } = await apiClient.patch<{ order: Order }>(
      `/orders/${id}/status`,
      { status }
    );
    return data.order;
  },

  /**
   * Record payment for an order
   */
  recordPayment: async (
    id: string,
    paymentData: RecordPaymentRequest
  ): Promise<Order> => {
    const { data } = await apiClient.post<{ order: Order }>(
      `/orders/${id}/payment`,
      paymentData
    );
    return data.order;
  },

  /**
   * Cancel an order
   */
  cancelOrder: async (id: string): Promise<Order> => {
    return ordersApi.updateOrderStatus(id, 'CANCELLED');
  },
};
