/**
 * Orders List Component
 */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { OrderCard } from './OrderCard';
import { EmptyState } from '../common/EmptyState';
import { SPACING, COLORS } from '../../utils/constants';
import type { Order, OrderStatus } from '../../types/api.types';

interface OrdersListProps {
  orders: Order[];
  onOrderPress: (orderId: string) => void;
}

const FILTER_OPTIONS: { label: string; value: OrderStatus | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Preparing', value: 'PREPARING' },
  { label: 'Done', value: 'DONE' },
];

export const OrdersList: React.FC<OrdersListProps> = ({ orders, onOrderPress }) => {
  const [filter, setFilter] = useState<OrderStatus | 'ALL'>('ALL');

  const filteredOrders =
    filter === 'ALL' ? orders : orders.filter((order) => order.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {FILTER_OPTIONS.map((option) => (
          <Text
            key={option.value}
            style={[
              styles.filterButton,
              filter === option.value && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(option.value)}>
            {option.label}
          </Text>
        ))}
      </View>

      {filteredOrders.length === 0 ? (
        <EmptyState message="No orders found" icon="📋" />
      ) : (
        <FlashList
          data={filteredOrders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <OrderCard order={item} onPress={onOrderPress} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
    color: '#FFFFFF',
  },
  list: {
    padding: SPACING.md,
  },
});
