/**
 * CustomDrawerContent - Permanent sidebar navigation for tablet landscape
 * Uses Lucide icons with modern, beautified design
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, StatusBar } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import {
  LayoutDashboard,
  ShoppingCart,
  Clock,
  Table2,
  RefreshCw,
  BarChart3,
  Wallet,
  User,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

const logoSource = require('../../../assets/olmosq-logo.png');

interface NavItem {
  name: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { name: 'Orders', label: 'Orders', icon: ShoppingCart },
  { name: 'Shift', label: 'Shift', icon: Clock },
  { name: 'Tables', label: 'Tables', icon: Table2 },
  { name: 'MenuSync', label: 'Menu', icon: RefreshCw },
  { name: 'ShiftReports', label: 'Reports', icon: BarChart3 },
  { name: 'CashDrawer', label: 'Cash Drawer', icon: Wallet },
];

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, logout } = useAuth();
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;

  const staffName = user?.displayName || user?.username || 'Staff';
  const staffRole = 'Barista'; // Could come from user.role if available

  return (
    <View style={styles.container}>
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.brandText}>
          <Text style={styles.brandTitle}>Olmosq</Text>
          <Text style={styles.brandSubtitle}>Coffee POS</Text>
        </View>
      </View>

      {/* Navigation Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.navItemsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.navItems}>
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.name;
            const IconComponent = item.icon;
            return (
              <Pressable
                key={item.name}
                style={({ pressed }) => [
                  styles.navItem,
                  isActive && styles.navItemActive,
                  pressed && styles.navItemPressed,
                ]}
                onPress={() => navigation.navigate(item.name)}>
                <View style={[styles.iconWrapper, isActive && styles.iconWrapperActive]}>
                  <IconComponent
                    size={16}
                    color={isActive ? COLORS.primary : COLORS.onPrimary}
                    strokeWidth={2}
                  />
                </View>
                <Text
                  style={[
                    styles.navLabel,
                    isActive && styles.navLabelActive,
                  ]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section: User Profile + Logout */}
      <View style={styles.bottomSection}>
        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <User size={14} color={COLORS.primary} strokeWidth={2} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>{staffName}</Text>
            <Text style={styles.userRole}>{staffRole}</Text>
          </View>
          <ChevronRight size={14} color={COLORS.onPrimary} strokeWidth={2} opacity={0.5} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.navItemPressed,
          ]}
          onPress={logout}>
          <LogOut size={16} color={COLORS.error} strokeWidth={2} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: StatusBar.currentHeight ?? 0,
  },
  logoContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.onPrimary}15`,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.onPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
  brandText: {
    flex: 1,
  },
  brandTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.onPrimary,
    opacity: 0.8,
    marginTop: 1,
  },
  navItemsContainer: {
    flexGrow: 1,
    paddingVertical: SPACING.sm,
  },
  navItems: {
    paddingHorizontal: SPACING.sm,
    gap: 2,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs + 2,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 36,
    gap: SPACING.sm,
  },
  navItemActive: {
    backgroundColor: COLORS.onPrimary,
  },
  navItemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  iconWrapper: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {},
  navLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onPrimary,
    flex: 1,
    fontWeight: '500',
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  bottomSection: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.onPrimary}15`,
    gap: SPACING.xs,
  },
  userCard: {
    backgroundColor: `${COLORS.onPrimary}15`,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.xs + 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.onPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onPrimary,
    fontWeight: '600',
  },
  userRole: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.onPrimary,
    opacity: 0.7,
    marginTop: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.errorContainer,
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 36,
  },
  logoutText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.error,
    fontWeight: '600',
  },
});
