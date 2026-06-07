/**
 * Status Badge Component - Stitch Sage Green Design
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatOrderStatus } from '../../utils/formatting';
import { getStatusColor, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';
import type { OrderStatus } from '../../types/api.types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'small' | 'medium';
}

const getStatusBackground = (status: OrderStatus): string => {
  const statusUpper = status.toUpperCase();
  if (statusUpper === 'PENDING' || statusUpper === 'AWAITING_PAYMENT') return '#FFF3E0';
  if (statusUpper === 'PREPARING' || statusUpper === 'ACCEPTED') return '#F1F5EC';
  if (statusUpper === 'DONE') return '#E8F0DD';
  if (statusUpper.includes('PAID')) return '#DDE8D6';
  if (statusUpper.includes('FAILED')) return '#FFDAD6';
  if (statusUpper === 'CANCELLED') return '#E6E2DF';
  return '#F2EDEA';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'medium' }) => {
  const textColor = getStatusColor(status);
  const bgColor = getStatusBackground(status);
  const label = formatOrderStatus(status);

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bgColor },
        size === 'small' && styles.badgeSmall,
      ]}>
      <Text style={[styles.text, { color: textColor }, size === 'small' && styles.textSmall]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md - 2,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  text: {
    ...TYPOGRAPHY.labelMd,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 11,
  },
});
