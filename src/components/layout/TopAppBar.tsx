/**
 * TopAppBar - Top navigation bar with variants for different screens
 * Matches Stitch designs: 64dp height, various layouts
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';

export type TopAppBarVariant = 'standard' | 'withSearch' | 'withBack' | 'minimal';

interface TopAppBarProps {
  variant?: TopAppBarVariant;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
  onBackPress?: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  onLogoutPress?: () => void;
  onSearchChange?: (text: string) => void;
  profileImage?: any;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  subtitle,
  showBack = false,
  showSearch = false,
  showNotifications = false,
  showProfile = false,
  onBackPress,
  onNotificationsPress,
  onProfilePress,
  onLogoutPress,
  onSearchChange,
  profileImage,
  rightContent,
  leftContent,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {leftContent || (
          <>
            {showBack && (
              <Pressable
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.iconButtonPressed,
                ]}
                onPress={onBackPress}>
                <Icon name="arrow-left" size={24} color={COLORS.tertiary} />
              </Pressable>
            )}
            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
            )}
          </>
        )}
      </View>

      {/* Center Section (Search if enabled) */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Icon
            name="magnify"
            size={20}
            color={COLORS.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            placeholderTextColor={COLORS.textSecondary}
            onChangeText={onSearchChange}
          />
        </View>
      )}

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightContent || (
          <>
            {showNotifications && (
              <Pressable
                style={({ pressed }) => [
                  styles.iconButton,
                  pressed && styles.iconButtonPressed,
                ]}
                onPress={onNotificationsPress}>
                <Icon name="bell-outline" size={24} color={COLORS.tertiary} />
              </Pressable>
            )}
            {showProfile && (
              <Pressable
                style={({ pressed }) => [
                  styles.profileButton,
                  pressed && styles.iconButtonPressed,
                ]}
                onPress={onProfilePress}>
                {profileImage ? (
                  <Image source={profileImage} style={styles.profileImage} />
                ) : (
                  <Icon name="account-circle" size={24} color={COLORS.tertiary} />
                )}
              </Pressable>
            )}
            {onLogoutPress && (
              <Pressable
                style={({ pressed }) => [
                  styles.logoutButton,
                  pressed && styles.iconButtonPressed,
                ]}
                onPress={onLogoutPress}>
                <Icon name="logout" size={18} color={COLORS.error} />
                <Text style={styles.logoutText}>Sign out</Text>
              </Pressable>
            )}
          </>
        )}
      </View>
    </View>
  );
};

/**
 * OrderDetailAppBar - Special variant for order detail screen
 * Large order number + table badge
 */
interface OrderDetailAppBarProps {
  orderNumber: string;
  tableNumber?: string;
  onBackPress: () => void;
  onNotificationsPress?: () => void;
  profileImage?: any;
  onProfilePress?: () => void;
}

export const OrderDetailAppBar: React.FC<OrderDetailAppBarProps> = ({
  orderNumber,
  tableNumber,
  onBackPress,
  onNotificationsPress,
  profileImage,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Back + Large Order Number */}
      <View style={styles.orderDetailLeft}>
        <Pressable
          style={({ pressed }) => [
            styles.iconButton,
            styles.backButtonLarge,
            pressed && styles.iconButtonPressed,
          ]}
          onPress={onBackPress}>
          <Icon name="arrow-left" size={28} color={COLORS.tertiary} />
        </Pressable>
        
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberLarge}>#{orderNumber}</Text>
          {tableNumber && (
            <View style={styles.tableBadge}>
              <Text style={styles.tableBadgeText}>Table {tableNumber}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Right: Notifications + Profile */}
      <View style={styles.rightSection}>
        {onNotificationsPress && (
          <Pressable
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={onNotificationsPress}>
            <Icon name="bell-outline" size={24} color={COLORS.tertiary} />
          </Pressable>
        )}
        {profileImage && (
          <Pressable
            style={({ pressed }) => [
              styles.profileButton,
              pressed && styles.iconButtonPressed,
            ]}
            onPress={onProfilePress}>
            <Image source={profileImage} style={styles.profileImage} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SPACING.topAppBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.lg,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconButton: {
    width: SPACING.iconCircleSm,
    height: SPACING.iconCircleSm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  iconButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.tertiary,
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.secondary,
    opacity: 0.8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    height: 40,
    marginHorizontal: SPACING.lg,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.text,
    padding: 0,
  },
  profileButton: {
    width: SPACING.iconCircleSm,
    height: SPACING.iconCircleSm,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  logoutButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `${COLORS.error}14`,
  },
  logoutText: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.error,
  },
  
  // Order Detail Specific
  orderDetailLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
    flex: 1,
  },
  backButtonLarge: {
    width: SPACING.iconCircleSm,
    height: SPACING.iconCircleSm,
  },
  orderNumberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.md,
  },
  orderNumberLarge: {
    ...TYPOGRAPHY.displayLg,
    color: COLORS.text,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tableBadge: {
    backgroundColor: `${COLORS.primary}1A`, // 10% opacity
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  tableBadgeText: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.tertiary,
  },
});
