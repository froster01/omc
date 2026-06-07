/**
 * Shift management hook
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shiftsApi } from '../api/shifts.api';
import type { OpenShiftRequest, CloseShiftRequest, CreateCashMovementRequest } from '../types/api.types';

export const useShift = () => {
  const queryClient = useQueryClient();

  // Get current shift
  const { 
    data: currentShift, 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['shift', 'current'],
    queryFn: shiftsApi.getCurrentShift,
    refetchInterval: 10000, // Poll every 10 seconds
  });

  // Open shift
  const openShiftMutation = useMutation({
    mutationFn: (request: OpenShiftRequest) => shiftsApi.openShift(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift', 'current'] });
    },
  });

  // Close shift
  const closeShiftMutation = useMutation({
    mutationFn: (request: CloseShiftRequest) => shiftsApi.closeShift(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift', 'current'] });
      queryClient.invalidateQueries({ queryKey: ['shifts', 'history'] });
    },
  });

  // Create cash movement
  const createCashMovementMutation = useMutation({
    mutationFn: (request: CreateCashMovementRequest) => 
      shiftsApi.createCashMovement(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shift', 'current'] });
    },
  });

  return {
    currentShift,
    isLoading,
    error,
    refetch,
    openShift: openShiftMutation.mutate,
    closeShift: closeShiftMutation.mutate,
    createCashMovement: createCashMovementMutation.mutate,
    isOpeningShift: openShiftMutation.isPending,
    isClosingShift: closeShiftMutation.isPending,
    isCreatingCashMovement: createCashMovementMutation.isPending,
  };
};

// Hook for shift history
export const useShiftHistory = () => {
  const { data: shifts = [], isLoading, error } = useQuery({
    queryKey: ['shifts', 'history'],
    queryFn: shiftsApi.getShiftHistory,
  });

  return { shifts, isLoading, error };
};

// Hook for single shift detail
export const useShiftDetail = (shiftId: string) => {
  const { data: shift, isLoading, error } = useQuery({
    queryKey: ['shifts', shiftId],
    queryFn: () => shiftsApi.getShiftById(shiftId),
  });

  return { shift, isLoading, error };
};
