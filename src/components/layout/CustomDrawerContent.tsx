/**
 * CustomDrawerContent - Permanent sidebar navigation for tablet landscape
 * Based on screenshot design with 7 nav items
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

const logoSource = require('../../../assets/olmosq-logo.png');

interface NavItem {
  name: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', label: 'Dashboard', icon: 'view-dashboard' },
  { name: 'Orders', label: 'Orders', icon: 'cart' },
  { name: 'Shift', label: 'Shift', icon: 'clock-outline' },
  { name: 'Tables', label: 'Tables', icon: 'table-furniture' },
  { name: 'MenuSync', label: 'Menu', icon: 'sync' },
  { name: 'ShiftReports', label: 'Reports', icon: 'chart-bar' },
  { name: 'CashDrawer', label: 'Cash Drawer', icon: 'cash-register' },
];

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { user, logout } = useAuth();
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;

  const staffName = user?.displayName || user?.username || 'Staff';
  const staffRole = 'Staff'; // Could come from user.role if available

  return (
    <View style={styles.container}>
      {/* Logo Area */}
      <View style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />
        <View style={styles.brandText}>
          <Text style={styles.brandTitle}>Olmosq Coffee POS</Text>
          <Text style={styles.brandSubtitle}>Fuel Your Day</Text>
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
            return (
              <Pressable
                key={item.name}
                style={({ pressed }) => [
                  styles.navItem,
                  isActive && styles.navItemActive,
                  pressed && styles.navItemPressed,
                ]}
                onPress={() => navigation.navigate(item.name)}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={isActive ? COLORS.onPrimary : COLORS.onSurface}
                />
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
            <Icon name="account" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{staffName}</Text>
            <Text style={styles.userRole}>{staffRole}</Text>
          </View>
          <Icon name="chevron-right" size={16} color={COLORS.onSurfaceVariant} />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.navItemPressed,
          ]}
          onPress={logout}>
          <Icon name="logout" size={18} color={COLORS.error} />
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
  },
  logoContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.onPrimary}1A`,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
  },
  brandText: {
    flex: 1,
  },
  brandTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    fontWeight: '700',
  },
  brandSubtitle: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onPrimary,
    opacity: 0.8,
  },
  navItemsContainer: {
    flexGrow: 1,
    paddingVertical: SPACING.sm,
  },
  navItems: {
    paddingHorizontal: SPACING.sm,
    gap: SPACING.xxs,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 40,
    gap: SPACING.sm,
  },
  navItemActive: {
    backgroundColor: COLORS.onPrimary,
  },
  navItemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  navLabel: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.onPrimary,
    flex: 1,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  bottomSection: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: `${COLORS.onPrimary}1A`,
    gap: SPACING.sm,
  },
  userCard: {
    backgroundColor: `${COLORS.onPrimary}1A`,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.onPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onPrimary,
    fontWeight: '600',
  },
  userRole: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.onPrimary,
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.errorContainer,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    minHeight: 40,
  },
  logoutText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.error,
    fontWeight: '600',
  },
});
