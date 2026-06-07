/**
 * Common Button Component
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { MaterialIcon } from './MaterialIcon';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

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
  const iconColor =
    disabled
      ? COLORS.textDisabled
      : variant === 'primary'
        ? COLORS.onPrimary
        : variant === 'secondary'
          ? COLORS.onSecondaryContainer
          : variant === 'danger'
            ? COLORS.onError
            : COLORS.primary;

  const buttonStyle = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`text_${size}`],
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'tonal' || variant === 'ghost' ? COLORS.primary : COLORS.onPrimary} />
      ) : (
        <>
          {icon && (
            <MaterialIcon
              name={icon}
              size={size === 'large' ? 22 : 20}
              color={iconColor}
            />
          )}
          <Text style={textStyle}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  button_primary: {
    backgroundColor: COLORS.primary,
  },
  button_secondary: {
    backgroundColor: COLORS.secondaryContainer,
  },
  button_tonal: {
    backgroundColor: COLORS.surfaceContainerHigh,
    borderColor: COLORS.outlineVariant,
  },
  button_danger: {
    backgroundColor: COLORS.error,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderColor: COLORS.outline,
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_small: {
    paddingHorizontal: SPACING.md,
    minHeight: SPACING.touchTarget,
  },
  button_medium: {
    paddingHorizontal: SPACING.lg,
    minHeight: SPACING.touchTarget,
  },
  button_large: {
    paddingHorizontal: SPACING.xl,
    minHeight: SPACING.touchTargetLg,
  },
  buttonDisabled: {
    backgroundColor: COLORS.surfaceContainerHighest,
    borderColor: COLORS.outlineVariant,
  },
  text: {
    ...TYPOGRAPHY.labelLg,
  },
  text_primary: {
    color: COLORS.onPrimary,
  },
  text_secondary: {
    color: COLORS.onSecondaryContainer,
  },
  text_tonal: {
    color: COLORS.primary,
  },
  text_danger: {
    color: COLORS.onError,
  },
  text_outline: {
    color: COLORS.primary,
  },
  text_ghost: {
    color: COLORS.primary,
  },
  text_small: {
    fontSize: 14,
  },
  text_medium: {
    fontSize: 14,
  },
  text_large: {
    fontSize: 16,
  },
  textDisabled: {
    color: COLORS.textDisabled,
  },
});
