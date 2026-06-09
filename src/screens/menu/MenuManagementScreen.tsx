/**
 * Menu Management Screen - Category table with Loyverse sync and reorder
 */
import React, { useCallback, useDeferredValue, useState, useEffect } from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Search, CheckCircle2, XCircle } from 'lucide-react-native';
import { CategoryTableHeader } from '../../components/menu/CategoryTableHeader';
import { CategoryListItem } from '../../components/menu/CategoryListItem';
import { SyncCard } from '../../components/menu/SyncCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  useCategories,
  useLoyverseSyncStatus,
  useUpdateCategory,
  useMoveCategory,
  useSyncMenu,
  useSyncPaymentTypes,
  useResetMenu,
  useResetPaymentTypes,
} from '../../hooks/useCategories';
import {
  ANIMATION,
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../utils/designTokens';

const formatLastSynced = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }

  const syncedAt = new Date(value).getTime();
  if (Number.isNaN(syncedAt)) {
    return null;
  }

  const diffInSeconds = Math.max(0, Math.floor((Date.now() - syncedAt) / 1000));

  if (diffInSeconds < 60) {
    return 'Last synced just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Last synced ${diffInMinutes} minute${
      diffInMinutes === 1 ? '' : 's'
    } ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Last synced ${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `Last synced ${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
};

export const MenuManagementScreen = () => {
  const {
    data: categories = [],
    isLoading,
    error: fetchError,
  } = useCategories();
  const { data: syncStatus } = useLoyverseSyncStatus();
  const updateCategoryMutation = useUpdateCategory();
  const moveCategoryMutation = useMoveCategory();
  const syncMenuMutation = useSyncMenu();
  const syncPaymentTypesMutation = useSyncPaymentTypes();
  const resetMenuMutation = useResetMenu();
  const resetPaymentTypesMutation = useResetPaymentTypes();

  const [actionResult, setActionResult] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Animation for banners
  const bannerOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (actionResult || actionError) {
      // Fade in
      Animated.timing(bannerOpacity, {
        toValue: 1,
        duration: ANIMATION.fast,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out
      Animated.timing(bannerOpacity, {
        toValue: 0,
        duration: ANIMATION.fast,
        useNativeDriver: true,
      }).start();
    }
  }, [actionResult, actionError, bannerOpacity]);

  const lastMenuSyncedLabel = formatLastSynced(syncStatus?.menu.lastSyncedAt);

  const normalizedQuery = deferredSearchQuery.trim().toLowerCase();
  const visibleCategories = normalizedQuery
    ? categories.filter(category =>
        category.name.toLowerCase().includes(normalizedQuery),
      )
    : categories;

  const clearActionState = useCallback(() => {
    setActionResult(null);
    setActionError(null);
  }, []);

  const runLoyverseAction = useCallback(
    async (action: () => Promise<{ message: string }>) => {
      clearActionState();
      try {
        const result = await action();
        setActionResult(result.message);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Loyverse action failed';
        setActionError(msg);
        Alert.alert('Loyverse Error', msg);
      }
    },
    [clearActionState],
  );

  const handleSync = useCallback(async () => {
    await runLoyverseAction(() => syncMenuMutation.mutateAsync());
  }, [runLoyverseAction, syncMenuMutation]);

  const handleSyncPayments = useCallback(async () => {
    await runLoyverseAction(() => syncPaymentTypesMutation.mutateAsync());
  }, [runLoyverseAction, syncPaymentTypesMutation]);

  const handleResetMenu = useCallback(() => {
    Alert.alert(
      'Reset Menu',
      'Reset menu data from the local database? This is only available outside production.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Menu',
          style: 'destructive',
          onPress: () => {
            runLoyverseAction(() => resetMenuMutation.mutateAsync());
          },
        },
      ],
    );
  }, [resetMenuMutation, runLoyverseAction]);

  const handleResetPayments = useCallback(() => {
    Alert.alert(
      'Reset Payments',
      'Reset payment types from the local database? This is only available outside production.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Payments',
          style: 'destructive',
          onPress: () => {
            runLoyverseAction(() => resetPaymentTypesMutation.mutateAsync());
          },
        },
      ],
    );
  }, [resetPaymentTypesMutation, runLoyverseAction]);

  const handleToggleTemperature = useCallback(
    (id: string, value: boolean) => {
      updateCategoryMutation.mutate({
        id,
        updates: { asksTemperature: value },
      });
    },
    [updateCategoryMutation],
  );

  const handleToggleVisibility = useCallback(
    (id: string, value: boolean) => {
      updateCategoryMutation.mutate({
        id,
        updates: { isVisibleInMenu: value },
      });
    },
    [updateCategoryMutation],
  );

  const handleMoveUp = useCallback(
    (id: string) => {
      moveCategoryMutation.mutate({ id, direction: 'up' });
    },
    [moveCategoryMutation],
  );

  const handleMoveDown = useCallback(
    (id: string) => {
      moveCategoryMutation.mutate({ id, direction: 'down' });
    },
    [moveCategoryMutation],
  );

  const isMutating =
    updateCategoryMutation.isPending || moveCategoryMutation.isPending;

  if (isLoading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  if (fetchError) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="Failed to load categories"
        message={
          fetchError instanceof Error
            ? fetchError.message
            : 'Something went wrong'
        }
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SyncCard
          onSyncMenu={handleSync}
          onSyncPayments={handleSyncPayments}
          onResetMenu={handleResetMenu}
          onResetPayments={handleResetPayments}
          isSyncingMenu={syncMenuMutation.isPending}
          isSyncingPayments={syncPaymentTypesMutation.isPending}
          isResettingMenu={resetMenuMutation.isPending}
          isResettingPayments={resetPaymentTypesMutation.isPending}
          lastMenuSyncedLabel={lastMenuSyncedLabel}
        />

        {actionResult && !actionError && (
          <Animated.View
            style={[styles.successBanner, { opacity: bannerOpacity }]}>
            <CheckCircle2
              size={18}
              color={COLORS.success}
              strokeWidth={2}
            />
            <Text style={styles.successText}>{actionResult}</Text>
          </Animated.View>
        )}

        {actionError && (
          <Animated.View
            style={[styles.errorBanner, { opacity: bannerOpacity }]}>
            <XCircle size={18} color={COLORS.error} strokeWidth={2} />
            <Text style={styles.errorText}>{actionError}</Text>
          </Animated.View>
        )}

        {categories.length === 0 ? (
          <EmptyState
            icon="tag-outline"
            title="No categories"
            message="Sync from Loyverse to load categories"
          />
        ) : (
          <View style={styles.tableWrapper}>
            <View style={styles.tableToolbar}>
              <View
                style={[
                  styles.searchBox,
                  isSearchFocused && styles.searchBoxFocused,
                ]}>
                <Search
                  size={18}
                  color={COLORS.textSecondary}
                  strokeWidth={2}
                />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search categories..."
                  placeholderTextColor={COLORS.textDisabled}
                  style={styles.searchInput}
                  accessibilityLabel="Search categories"
                  selectionColor={COLORS.primary}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </View>
              <Text style={styles.orderHint}>
                Manual order controls the customer menu.
              </Text>
            </View>
            <View style={styles.table}>
              <CategoryTableHeader />
              {visibleCategories.length === 0 ? (
                <View style={styles.noSearchResults}>
                  <Text style={styles.noSearchResultsTitle}>
                    No categories found
                  </Text>
                  <Text style={styles.noSearchResultsText}>
                    Try a different category name.
                  </Text>
                </View>
              ) : (
                visibleCategories.map(category => {
                  const originalIndex = categories.findIndex(
                    item => item.id === category.id,
                  );

                  return (
                    <CategoryListItem
                      key={category.id}
                      category={category}
                      index={originalIndex}
                      onToggleTemperature={handleToggleTemperature}
                      onToggleVisibility={handleToggleVisibility}
                      onMoveUp={handleMoveUp}
                      onMoveDown={handleMoveDown}
                      canMoveUp={originalIndex > 0}
                      canMoveDown={originalIndex < categories.length - 1}
                      isUpdating={isMutating}
                    />
                  );
                })
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.successContainer,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  successText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.success,
    flex: 1,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.errorContainer,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.error,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  tableWrapper: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: SPACING.md,
  },
  tableToolbar: {
    minHeight: SPACING.touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  searchBox: {
    flex: 1,
    maxWidth: 320,
    minHeight: SPACING.touchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
  },
  searchBoxFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.text,
    paddingVertical: 0,
  },
  orderHint: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.textSecondary,
  },
  table: {
    backgroundColor: COLORS.surface,
  },
  noSearchResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  noSearchResultsTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.text,
  },
  noSearchResultsText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
});
