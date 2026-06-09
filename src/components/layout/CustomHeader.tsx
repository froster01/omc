/**
 * Custom Header - Compact topbar with menu, title, date, and notification bell
 */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/designTokens';

interface CustomHeaderProps {
  title: string;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const navigation = useNavigation<any>();

  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Left: Menu button and title */}
      <View style={styles.leftSection}>
        <Pressable
          onPress={() => navigation.toggleDrawer()}
          hitSlop={SPACING.sm}
          style={({ pressed }) => [
            styles.menuButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}>
          <Icon name="menu" size={24} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right: Date and notification */}
      <View style={styles.rightSection}>
        <Text style={styles.date}>{today}</Text>
        <Pressable
          hitSlop={SPACING.sm}
          style={({ pressed }) => [
            styles.notificationButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}>
          <Icon name="bell-outline" size={22} color={COLORS.onSurfaceVariant} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
    height: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  menuButton: {
    padding: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.onSurface,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  date: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  notificationButton: {
    padding: SPACING.xs,
  },
});
