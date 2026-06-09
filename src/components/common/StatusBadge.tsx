/**
 * Status Badge Component - React Native Paper Chip Wrapper
 * Preserves Stitch Sage Green Design
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { formatOrderStatus } from '../../utils/formatting';
import { getStatusColor } from '../../utils/designTokens';
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
    <Chip
      mode="flat"
      compact={size === 'small'}
      textStyle={[
        styles.text,
        { color: textColor },
        size === 'small' && styles.textSmall,
      ]}
      style={[styles.chip, { backgroundColor: bgColor }]}>
      {label.toUpperCase()}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 11,
  },
});
