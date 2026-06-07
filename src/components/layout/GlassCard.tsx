/**
 * GlassCard - Glassmorphic card component with backdrop blur
 * Used in Login screen and modals (matching Stitch design)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/designTokens';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  borderRadius?: number;
  blurAmount?: number;
  blurType?: 'light' | 'dark' | 'xlight';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  padding = SPACING.cardPaddingLg,
  borderRadius = BORDER_RADIUS.xxxl,
  blurAmount = 10,
  blurType = 'light',
}) => {
  if (Platform.OS === 'ios') {
    // iOS: Use BlurView with native blur
    return (
      <BlurView
        style={[
          styles.container,
          {
            padding,
            borderRadius,
            overflow: 'hidden',
          },
          style,
        ]}
        blurType={blurType}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor={COLORS.glassBackground}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    );
  }

  // Android: Fallback to semi-transparent background
  // (BlurView has limited support on Android)
  return (
    <View
      style={[
        styles.container,
        styles.androidFallback,
        {
          padding,
          borderRadius,
          backgroundColor: COLORS.glassBackground,
          borderWidth: 1,
          borderColor: COLORS.glassBorder,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

/**
 * GlassOverlay - Full-screen glass overlay for modals
 */
interface GlassOverlayProps {
  children: React.ReactNode;
  visible?: boolean;
  onDismiss?: () => void;
}

export const GlassOverlay: React.FC<GlassOverlayProps> = ({
  children,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.scrim} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  androidFallback: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: COLORS.scrim,
  },
});
