/**
 * Empty State Component
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

interface EmptyStateProps {
  message: string;
  icon?: string;
  title?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon = 'tray-arrow-down', title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <MaterialIcon name={icon} size={32} color={COLORS.primary} />
      </View>
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  message: {
    ...TYPOGRAPHY.bodyLg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    maxWidth: 420,
  },
});
