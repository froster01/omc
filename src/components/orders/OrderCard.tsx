/**
 * Order Card Component
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../common/Card';
import { StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatTime } from '../../utils/formatting';
import { COLORS, SPACING } from '../../utils/constants';
import type { Order } from '../../types/api.types';

interface OrderCardProps {
  order: Order;
  onPress: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  return (
    <Card onPress={() => onPress(order.id)} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderNumber}>#{order.shiftOrderNumber || order.orderNumber}</Text>
          <Text style={styles.table}>Table {order.table.number}</Text>
        </View>
        <StatusBadge status={order.status} size="small" />
      </View>

      <View style={styles.content}>
        <Text style={styles.customerName}>{order.customerName}</Text>
        <Text style={styles.time}>{formatTime(order.createdAt)}</Text>
        
        <View style={styles.items}>
          {order.items.slice(0, 2).map((item, index) => (
            <Text key={index} style={styles.itemText} numberOfLines={1}>
              {item.quantity}x {item.item.name}
              {item.variant && ` (${item.variant.name})`}
            </Text>
          ))}
          {order.items.length > 2 && (
            <Text style={styles.moreItems}>
              +{order.items.length - 2} more items
            </Text>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>{formatCurrency(order.total)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  table: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  content: {
    marginBottom: SPACING.sm,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  items: {
    marginTop: SPACING.sm,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  moreItems: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'right',
  },
});
