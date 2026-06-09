/**
 * Categories hook with React Query
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi } from '../api/categories.api';
import { loyverseApi } from '../api/loyverse.api';
import type { Category, UpdateCategoryRequest } from '../types/api.types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getCategories,
    staleTime: 30000,
  });
};

export const useLoyverseSyncStatus = () => {
  return useQuery({
    queryKey: ['loyverse-sync-status'],
    queryFn: loyverseApi.getSyncStatus,
    staleTime: 30000,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateCategoryRequest;
    }) => categoriesApi.updateCategory(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });

      const previousCategories = queryClient.getQueryData<Category[]>([
        'categories',
      ]);

      queryClient.setQueryData<Category[]>(['categories'], current => {
        return current?.map(category =>
          category.id === id ? { ...category, ...updates } : category,
        );
      });

      return { previousCategories };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories);
      }
    },
    onSuccess: updatedCategory => {
      queryClient.setQueryData<Category[]>(['categories'], current => {
        return current?.map(category =>
          category.id === updatedCategory.id
            ? { ...category, ...updatedCategory }
            : category,
        );
      });
    },
  });
};

export const useMoveCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, direction }: { id: string; direction: 'up' | 'down' }) =>
      categoriesApi.moveCategory(id, direction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useSyncMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loyverseApi.syncMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['loyverse-sync-status'] });
    },
  });
};

export const useSyncPaymentTypes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loyverseApi.syncPaymentTypes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyverse-sync-status'] });
    },
  });
};

export const useResetMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loyverseApi.resetMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['loyverse-sync-status'] });
    },
  });
};

export const useResetPaymentTypes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loyverseApi.resetPaymentTypes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loyverse-sync-status'] });
    },
  });
};
