/**
 * Orders hook with React Query
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersApi } from '../api/orders.api';
import type { OrderStatus, RecordPaymentRequest } from '../types/api.types';

export const useOrders = () => {
  const queryClient = useQueryClient();

  // Fetch all orders
  const { 
    data: orders = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getOrders,
    refetchInterval: 5000, // Poll every 5 seconds
  });

  // Update order status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      ordersApi.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Record payment
  const recordPaymentMutation = useMutation({
    mutationFn: ({ id, paymentData }: { id: string; paymentData: RecordPaymentRequest }) =>
      ordersApi.recordPayment(id, paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Cancel order
  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => ordersApi.cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders,
    isLoading,
    error,
    refetch,
    updateStatus: updateStatusMutation.mutate,
    recordPayment: recordPaymentMutation.mutate,
    cancelOrder: cancelOrderMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    isRecordingPayment: recordPaymentMutation.isPending,
    isCancelling: cancelOrderMutation.isPending,
  };
};

// Hook for single order
export const useOrder = (orderId: string) => {
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => ordersApi.getOrderById(orderId),
  });

  return { order, isLoading, error };
};
