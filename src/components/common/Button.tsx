/**
 * Common Button Component - React Native Paper Wrapper
 * Preserves existing 6-variant API while using RNP Button internally
 */
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { MaterialIcon } from './MaterialIcon';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/designTokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tonal' | 'danger' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: string;
}

// Icon wrapper component defined outside to avoid nested component warning
const ButtonIcon: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <MaterialIcon name={name} size={20} color={color} />
);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  icon,
}) => {
  // Map variants to RNP modes
  const getMode = (): 'text' | 'outlined' | 'contained' | 'elevated' => {
    switch (variant) {
      case 'outline':
        return 'outlined';
      case 'ghost':
        return 'text';
      case 'tonal':
        return 'elevated';
      default:
        return 'contained';
    }
  };

  // Map variants to button colors
  const getButtonColor = () => {
    if (disabled) return undefined;
    
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.secondaryContainer;
      case 'tonal':
        return COLORS.surfaceContainerHigh;
      case 'danger':
        return COLORS.error;
      default:
        return undefined; // Use theme default
    }
  };

  // Map variants to text colors
  const getTextColor = () => {
    if (disabled) return COLORS.textDisabled;
    
    switch (variant) {
      case 'primary':
        return COLORS.onPrimary;
      case 'danger':
        return COLORS.onError;
      case 'secondary':
        return COLORS.onSecondaryContainer;
      case 'tonal':
      case 'outline':
      case 'ghost':
        return COLORS.primary;
      default:
        return undefined;
    }
  };

  const mode = getMode();
  const buttonColor = getButtonColor();
  const textColor = getTextColor();

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      disabled={disabled}
      loading={loading}
      buttonColor={buttonColor}
      textColor={textColor}
      contentStyle={[
        styles.content,
        size === 'small' && styles.contentSmall,
        size === 'large' && styles.contentLarge,
      ]}
      labelStyle={[
        styles.label,
        size === 'small' && styles.labelSmall,
        size === 'large' && styles.labelLarge,
      ]}
      style={[styles.button, style]}
      icon={icon ? () => <ButtonIcon name={icon} color={textColor || COLORS.primary} /> : undefined}
    >
      {title}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.full,
  },
  content: {
    minHeight: SPACING.touchTarget,
    paddingHorizontal: SPACING.lg,
  },
  contentSmall: {
    minHeight: SPACING.touchTarget,
    paddingHorizontal: SPACING.md,
  },
  contentLarge: {
    minHeight: SPACING.touchTargetLg,
    paddingHorizontal: SPACING.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  labelSmall: {
    fontSize: 14,
  },
  labelLarge: {
    fontSize: 16,
  },
});
