/**
 * RecentOrderRow - Row in the Recent Orders table
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  TYPOGRAPHY,
  getStatusColor,
  getStatusLabel,
} from '../../utils/designTokens';
import { formatCurrency } from '../../utils/formatting';

interface RecentOrderRowProps {
  orderNumber: string;
  customerName: string;
  status: string;
  amount: number;
  onPress?: () => void;
}

export const RecentOrderRow: React.FC<RecentOrderRowProps> = ({
  orderNumber,
  customerName,
  status,
  amount,
  onPress,
}) => {
  const statusColor = getStatusColor(status);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderNumber}>{orderNumber}</Text>
        <Text style={styles.customerName} numberOfLines={1}>
          {customerName}
        </Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: `${statusColor}1F` }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>
          {getStatusLabel(status)}
        </Text>
      </View>
      <Text style={styles.amount}>{formatCurrency(amount)}</Text>
      <Icon name="chevron-right" size={20} color={COLORS.onSurfaceVariant} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  pressed: {
    opacity: 0.7,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onSurface,
    fontWeight: '700',
  },
  customerName: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onSurfaceVariant,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    ...TYPOGRAPHY.labelMd,
    fontWeight: '600',
  },
  amount: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onSurface,
    fontWeight: '700',
    minWidth: 72,
    textAlign: 'right',
  },
});
