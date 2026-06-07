/**
 * Categories API
 */
import { apiClient } from './client';
import type { Category, UpdateCategoryRequest } from '../types/api.types';

export const categoriesApi = {
  /**
   * Get all categories
   */
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get<{ categories: Category[] }>('/categories');
    return data.categories;
  },

  /**
   * Update category settings
   */
  updateCategory: async (
    id: string,
    updates: UpdateCategoryRequest
  ): Promise<Category> => {
    const { data } = await apiClient.patch<{ category: Category }>(
      `/categories/${id}`,
      updates
    );
    return data.category;
  },

  /**
   * Move category (reorder)
   */
  moveCategory: async (
    id: string,
    direction: 'up' | 'down'
  ): Promise<{ success: boolean }> => {
    const { data } = await apiClient.post<{ success: boolean }>(
      `/categories/${id}/move`,
      { direction }
    );
    return data;
  },
};
