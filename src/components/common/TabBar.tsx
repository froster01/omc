/**
 * TabBar - Horizontal tab navigation with active indicator
 * Based on Stitch design: 3px bottom border, bold active state
 */
import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/designTokens';

export interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  style?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={({ pressed }) => [
                styles.tab,
                pressed && styles.tabPressed,
              ]}
              onPress={() => onTabChange(tab.id)}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.activeIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.primary}1A`, // 10% opacity
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: SPACING.xl,
  },
  tab: {
    position: 'relative',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
    minHeight: SPACING.touchTarget,
    minWidth: SPACING.touchTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabPressed: {
    opacity: 0.7,
  },
  tabText: {
    ...TYPOGRAPHY.labelLg,
    color: `${COLORS.onSurfaceVariant}99`, // 60% opacity
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
});
