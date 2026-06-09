/**
 * QuickActionTile - Tile for the Quick Actions grid (3x2)
 */

import React from 'react';
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

interface QuickActionTileProps {
  icon: string;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const QuickActionTile: React.FC<QuickActionTileProps> = ({ icon, label, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, style, pressed && styles.pressed]}
      onPress={onPress}>
      <Icon name={icon} size={24} color={COLORS.primary} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 72,
    gap: SPACING.sm,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  label: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onSurface,
    fontWeight: '600',
    textAlign: 'center',
  },
});
