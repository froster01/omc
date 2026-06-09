/**
 * TopSellingItem - Row in the Top Selling Items list
 * Uses a colored icon circle as a placeholder for the product photo
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

interface TopSellingItemProps {
  name: string;
  soldCount: number;
  icon: string;
  color: string;
  rank: number;
}

export const TopSellingItem: React.FC<TopSellingItemProps> = ({
  name,
  soldCount,
  icon,
  color,
  rank,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{rank}</Text>
      <View style={[styles.imageCircle, { backgroundColor: `${color}26` }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.count}>{soldCount} sold</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  rank: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.onSurfaceVariant,
    fontWeight: '700',
    width: 16,
    textAlign: 'center',
  },
  imageCircle: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onSurface,
    fontWeight: '600',
  },
  count: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onSurfaceVariant,
  },
});
