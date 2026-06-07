/**
 * Common Card Component
 */
import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/designTokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated' | 'tonal';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, styles[`card_${variant}`], style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.cardPadding,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  card_default: {},
  card_outlined: {
    backgroundColor: COLORS.surface,
  },
  card_tonal: {
    backgroundColor: COLORS.surfaceContainer,
  },
  card_elevated: {
    backgroundColor: COLORS.surfaceContainerLowest,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
});
