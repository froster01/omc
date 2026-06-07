/**
 * Payment types hook
 */
import { useQuery } from '@tanstack/react-query';
import { paymentsApi } from '../api/payments.api';

export const usePaymentTypes = () => {
  const { data: paymentTypes = [], isLoading, error } = useQuery({
    queryKey: ['paymentTypes'],
    queryFn: paymentsApi.getPaymentTypes,
    staleTime: 60000, // Cache for 1 minute
  });

  return { paymentTypes, isLoading, error };
};
