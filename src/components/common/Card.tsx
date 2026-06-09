/**
 * Common Card Component - React Native Paper Wrapper
 * Preserves existing API while using RNP Card/Surface internally
 */
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card as PaperCard, Surface } from 'react-native-paper';
import { SPACING } from '../../utils/designTokens';

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
  // Map custom variants to RNP elevation
  const getElevation = (): 0 | 1 | 2 => {
    if (variant === 'elevated') return 2;
    if (variant === 'default') return 1;
    return 0;
  };

  if (onPress) {
    // Outlined mode cannot take an elevation prop (RNP discriminated union)
    if (variant === 'outlined') {
      return (
        <PaperCard
          mode="outlined"
          style={[styles.card, style]}
          onPress={onPress}>
          <PaperCard.Content style={styles.content}>
            {children}
          </PaperCard.Content>
        </PaperCard>
      );
    }

    return (
      <PaperCard
        mode="elevated"
        elevation={getElevation()}
        style={[styles.card, style]}
        onPress={onPress}>
        <PaperCard.Content style={styles.content}>
          {children}
        </PaperCard.Content>
      </PaperCard>
    );
  }

  return (
    <Surface
      elevation={getElevation()}
      style={[
        styles.card,
        variant === 'outlined' && styles.outlined,
        variant === 'tonal' && styles.tonal,
        style,
      ]}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.cardPadding,
  },
  content: {
    padding: 0,
  },
  outlined: {
    borderWidth: 1,
  },
  tonal: {
    // Tonal uses theme elevation colors automatically
  },
});
