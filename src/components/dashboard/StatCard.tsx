/**
 * StatCard - Dashboard metric card with icon at top, value, label, and trend
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getShadowStyle } from '../../utils/designTokens';

interface StatCardProps {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  value: number | string;
  label: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconColor,
  iconBgColor,
  value,
  label,
  trend,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
        <Icon name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          <Icon
            name={trend.isPositive ? 'arrow-up' : 'arrow-down'}
            size={14}
            color={trend.isPositive ? COLORS.success : COLORS.error}
          />
          <Text style={[styles.trendText, { color: trend.isPositive ? COLORS.success : COLORS.error }]}>
            {trend.value}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    flex: 1,
    ...getShadowStyle('sm'),
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.onSurface,
    lineHeight: 38,
    marginBottom: SPACING.xxs,
  },
  label: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.onSurfaceVariant,
    fontWeight: '600',
    textAlign: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  trendText: {
    ...TYPOGRAPHY.labelSm,
    fontWeight: '600',
  },
});
