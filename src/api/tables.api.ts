/**
 * Tables API
 */
import { apiClient } from './client';
import type { Table, GenerateTablesRequest } from '../types/api.types';

export const tablesApi = {
  /**
   * Get all tables
   */
  getTables: async (): Promise<Table[]> => {
    const { data } = await apiClient.get<{ tables: Table[] }>('/tables');
    return data.tables;
  },

  /**
   * Generate QR codes for tables
   */
  generateTables: async (request: GenerateTablesRequest): Promise<{ success: boolean }> => {
    const { data } = await apiClient.post<{ success: boolean }>(
      '/tables/generate',
      request
    );
    return data;
  },
};
