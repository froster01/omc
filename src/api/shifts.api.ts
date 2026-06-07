/**
 * Shifts API
 */
import { apiClient } from './client';
import type {
  Shift,
  OpenShiftRequest,
  CloseShiftRequest,
  CreateCashMovementRequest,
  CashMovement,
} from '../types/api.types';

export const shiftsApi = {
  /**
   * Get current open shift
   */
  getCurrentShift: async (): Promise<Shift | null> => {
    const { data } = await apiClient.get<{ shift: Shift | null }>('/shifts/current');
    return data.shift;
  },

  /**
   * Open a new shift
   */
  openShift: async (request: OpenShiftRequest): Promise<Shift> => {
    const { data } = await apiClient.post<{ shift: Shift }>('/shifts/open', request);
    return data.shift;
  },

  /**
   * Close current shift
   */
  closeShift: async (request: CloseShiftRequest): Promise<Shift> => {
    const { data } = await apiClient.post<{ shift: Shift }>('/shifts/close', request);
    return data.shift;
  },

  /**
   * Create cash movement (cash in/out)
   */
  createCashMovement: async (
    request: CreateCashMovementRequest
  ): Promise<CashMovement> => {
    const { data } = await apiClient.post<{ cashMovement: CashMovement }>(
      '/shifts/cash-movements',
      request
    );
    return data.cashMovement;
  },

  /**
   * Get shift history
   */
  getShiftHistory: async (): Promise<Shift[]> => {
    const { data } = await apiClient.get<{ shifts: Shift[] }>('/shifts/history');
    return data.shifts;
  },

  /**
   * Get single shift by ID
   */
  getShiftById: async (id: string): Promise<Shift> => {
    const { data } = await apiClient.get<{ shift: Shift }>(`/shifts/${id}`);
    return data.shift;
  },
};
