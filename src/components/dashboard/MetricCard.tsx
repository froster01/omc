/**
 * MetricCard - Dashboard metric with left-border color accent
 * Based on Stitch design: 4dp left border for data visualization hierarchy
 */
import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcon } from '../common/MaterialIcon';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getShadowStyle } from '../../utils/designTokens';

interface MetricCardProps {
  value: number | string;
  label: string;
  icon: string;
  accentColor: string;
  meta?: string;
  style?: ViewStyle;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  icon,
  accentColor,
  meta,
  style,
}) => {
  return (
    <View style={[styles.container, { borderLeftColor: accentColor }, style]}>
      {/* Header with label and icon */}
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <MaterialIcon name={icon} size={24} color={accentColor} />
      </View>

      {/* Large metric value */}
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {meta && <Text style={styles.meta}>{meta}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: `${COLORS.primary}1A`, // 10% opacity
    borderLeftWidth: 4,
    padding: SPACING.cardPadding,
    ...getShadowStyle('sm'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onSurfaceVariant,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.sm,
  },
  value: {
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
    color: COLORS.onSurface,
    letterSpacing: -0.5,
  },
  meta: {
    ...TYPOGRAPHY.bodyMd,
    color: `${COLORS.onSurfaceVariant}99`, // 60% opacity
    fontWeight: '500',
  },
});
