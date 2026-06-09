/**
 * Custom React Native Paper theme for Olmosq Staff App
 * Preserves the Stitch Sage Green design system
 */
import { MD3LightTheme, configureFonts } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { COLORS, FONT_FAMILY, BORDER_RADIUS } from '../utils/designTokens';

// Configure fonts to use Hanken Grotesk across all text variants
const fontConfig = {
  displayLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 57,
    fontWeight: '400' as const,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: FONT_FAMILY,
    fontSize: 45,
    fontWeight: '400' as const,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 36,
    fontWeight: '400' as const,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: FONT_FAMILY,
    fontSize: 28,
    fontWeight: '500' as const,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    fontWeight: '400' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
    fontWeight: '500' as const,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  titleSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  labelLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0,
  },
  labelMedium: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
  },
};

// Custom theme that preserves Stitch Sage Green design
export const customTheme: MD3Theme = {
  ...MD3LightTheme,
  // Completely override RNP colors with Stitch Sage Green design
  colors: {
    primary: COLORS.primary, // #A7C472
    primaryContainer: COLORS.primaryContainer,
    secondary: COLORS.secondary,
    secondaryContainer: COLORS.secondaryContainer,
    tertiary: COLORS.tertiary,
    tertiaryContainer: COLORS.tertiaryContainer,
    surface: COLORS.surface,
    surfaceVariant: COLORS.surfaceVariant,
    surfaceDisabled: COLORS.disabled,
    background: COLORS.background,
    error: COLORS.error,
    errorContainer: COLORS.errorContainer,
    onPrimary: COLORS.onPrimary,
    onPrimaryContainer: COLORS.onPrimaryContainer,
    onSecondary: COLORS.onSecondary,
    onSecondaryContainer: COLORS.onSecondaryContainer,
    onTertiary: COLORS.onTertiary,
    onTertiaryContainer: COLORS.onTertiaryContainer,
    onSurface: COLORS.onSurface,
    onSurfaceVariant: COLORS.onSurfaceVariant,
    onSurfaceDisabled: COLORS.textDisabled,
    onError: COLORS.onError,
    onErrorContainer: COLORS.onErrorContainer,
    onBackground: COLORS.onBackground,
    outline: COLORS.outline,
    outlineVariant: COLORS.outlineVariant,
    inverseSurface: COLORS.inverseSurface,
    inverseOnSurface: COLORS.inverseOnSurface,
    inversePrimary: COLORS.inversePrimary,
    shadow: COLORS.shadow,
    scrim: COLORS.scrim,
    backdrop: COLORS.scrim,
    // Elevation levels map to surface container tokens
    elevation: {
      level0: 'transparent',
      level1: COLORS.surfaceContainerLow,
      level2: COLORS.surfaceContainer,
      level3: COLORS.surfaceContainerHigh,
      level4: COLORS.surfaceContainerHigh,
      level5: COLORS.surfaceContainerHighest,
    },
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: BORDER_RADIUS.md, // 12
};
