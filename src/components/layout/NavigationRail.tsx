/**
 * NavigationRail - Sidebar navigation for tablet landscape
 * Matches Stitch designs: 80dp collapsed, 264dp expanded
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';
import { getNavRailWidth } from '../../utils/layoutConstants';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  fillWhenActive?: boolean;  // Use filled icon when active
}

interface NavigationRailProps {
  items: NavItem[];
  activeRoute: string;
  onNavigate: (route: string) => void;
  logoSource?: any;
  bottomAction?: {
    label: string;
    icon: string;
    onPress: () => void;
  };
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  items,
  activeRoute,
  onNavigate,
  logoSource,
  bottomAction,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const navWidth = getNavRailWidth(screenWidth);
  const isExpanded = navWidth > 80;

  return (
    <View style={[styles.container, { width: navWidth }]}>
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        {logoSource && (
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
        )}
        {isExpanded && (
          <View style={styles.brandText}>
            <Text style={styles.brandTitle}>Olmosq Coffee</Text>
            <Text style={styles.brandSubtitle}>STAFF PORTAL</Text>
          </View>
        )}
      </View>

      {/* Navigation Items */}
      <View style={styles.navItems}>
        {items.map((item) => {
          const isActive = activeRoute === item.route;
          return (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.navItem,
                isActive && styles.navItemActive,
                pressed && styles.navItemPressed,
              ]}
              onPress={() => onNavigate(item.route)}>
              <Icon
                name={item.icon}
                size={24}
                color={isActive ? COLORS.onPrimary : COLORS.secondary}
                style={styles.navIcon}
              />
              {isExpanded && (
                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}>
                  {item.label}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Bottom Section */}
      {bottomAction && (
        <View style={styles.bottomSection}>
          <Pressable
            style={({ pressed }) => [
              styles.bottomButton,
              pressed && styles.navItemPressed,
            ]}
            onPress={bottomAction.onPress}>
            <Icon
              name={bottomAction.icon}
              size={24}
              color={COLORS.onPrimary}
            />
            {isExpanded && (
              <Text style={styles.bottomButtonText}>{bottomAction.label}</Text>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.background,
    borderRightWidth: 1,
    borderRightColor: `${COLORS.primary}33`, // 20% opacity
    paddingVertical: SPACING.lg,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 50,
  },
  logoContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
  },
  brandText: {
    flex: 1,
  },
  brandTitle: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.primary,
    fontWeight: '900',
  },
  brandSubtitle: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  navItems: {
    flex: 1,
    paddingHorizontal: SPACING.sm,
    gap: SPACING.xs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4, // py-3 = 12
    borderRadius: BORDER_RADIUS.md,
    minHeight: SPACING.touchTarget,
    gap: SPACING.md,
  },
  navItemActive: {
    backgroundColor: COLORS.primary,
  },
  navItemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  navIcon: {
    width: 24,
  },
  navLabel: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.secondary,
  },
  navLabelActive: {
    color: COLORS.onPrimary,
  },
  bottomSection: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.primary}1A`, // 10% opacity
  },
  bottomButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.sm,
    minHeight: SPACING.touchTargetLg,
  },
  bottomButtonText: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
  },
});
