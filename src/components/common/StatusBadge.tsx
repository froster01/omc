/**
 * Status Badge Component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusColor, formatOrderStatus } from '../../utils/formatting';
import { SPACING, BORDER_RADIUS } from '../../utils/constants';
import type { OrderStatus } from '../../types/api.types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'small' | 'medium';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium' }) => {
  const backgroundColor = getStatusColor(status);
  const label = formatOrderStatus(status);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor },
        size === 'small' && styles.badgeSmall,
      ]}>
      <Text style={[styles.text, size === 'small' && styles.textSmall]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 12,
  },
});
