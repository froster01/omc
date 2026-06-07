/**
 * Dashboard Screen - Stitch Sage Green Design
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useShift } from '../../hooks/useShift';
import { useOrders } from '../../hooks/useOrders';
import { formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getShadowStyle } from '../../utils/designTokens';
import type { DashboardScreenProps } from '../../types/navigation.types';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { currentShift } = useShift();
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length;
  const preparingOrders = orders.filter((o) => o.status === 'PREPARING').length;
  const doneOrders = orders.filter((o) => o.status === 'DONE').length;

  const menuItems = [
    { title: 'Orders', screen: 'Orders', icon: 'cart' },
    { title: 'Shift Management', screen: 'Shift', icon: 'clock-outline' },
    { title: 'Menu Sync', screen: 'MenuSync', icon: 'sync' },
    { title: 'Tables & QR', screen: 'Tables', icon: 'table-furniture' },
    { title: 'Reports', screen: 'ShiftReports', icon: 'chart-bar' },
    { title: 'Settings', screen: 'CashDrawer', icon: 'cog' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Current Shift Status Card */}
      {currentShift && (
        <View style={styles.shiftCard}>
          <View style={styles.shiftContent}>
            <View style={styles.shiftLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcon name="clock-outline" size={28} color={COLORS.primary} />
              </View>
              <View>
                <Text style={styles.shiftTitle}>Shift Opened at 8:00 AM</Text>
                <Text style={styles.shiftSubtitle}>Station: Front Counter #1</Text>
              </View>
            </View>
            <View style={styles.shiftRight}>
              <View style={styles.cashDisplay}>
                <Text style={styles.cashLabel}>STARTING CASH</Text>
                <Text style={styles.cashValue}>
                  {formatCurrency(currentShift.startingCash)}
                </Text>
              </View>
              <Pressable
                style={({ pressed }) => [
                  styles.manageButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={() => navigation.navigate('Shift')}>
                <Text style={styles.manageButtonText}>Manage Shift</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* Metric Cards (3-column grid) */}
      <View style={styles.metricsGrid}>
        <MetricCard
          value={pendingOrders}
          label="Pending Orders"
          icon="cart"
          accentColor="#FF9800"
          meta="+2 in last 10m"
          style={styles.metricCard}
        />
        <MetricCard
          value={preparingOrders}
          label="Preparing"
          icon="coffee"
          accentColor={COLORS.primary}
          meta="Avg. 4.5m"
          style={styles.metricCard}
        />
        <MetricCard
          value={doneOrders}
          label="Completed Today"
          icon="check-circle"
          accentColor={COLORS.tertiary}
          meta="Target: 60"
          style={styles.metricCard}
        />
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
      </View>
      <View style={styles.actionsGrid}>
        {menuItems.map((item) => (
          <Pressable
            key={item.screen}
            style={({ pressed }) => [
              styles.actionTile,
              pressed && styles.actionTilePressed,
            ]}
            onPress={() => navigation.navigate(item.screen as any)}>
            <View style={styles.actionIconCircle}>
              <MaterialIcon name={item.icon} size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.actionTitle}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  shiftCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: `${COLORS.primary}1A`, // 10% opacity
    padding: SPACING.cardPadding,
    marginBottom: SPACING.lg,
    ...getShadowStyle('sm'),
  },
  shiftContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  shiftLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconCircle: {
    width: SPACING.iconCircleMd,
    height: SPACING.iconCircleMd,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `${COLORS.primary}1A`, // 10% opacity
    alignItems: 'center',
    justifyContent: 'center',
  },
  shiftTitle: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.tertiary,
    fontWeight: '700',
  },
  shiftSubtitle: {
    ...TYPOGRAPHY.bodyLg,
    color: `${COLORS.primaryDark}B3`, // 70% opacity
    fontWeight: '500',
  },
  shiftRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  cashDisplay: {
    alignItems: 'flex-end',
  },
  cashLabel: {
    ...TYPOGRAPHY.labelSm,
    color: COLORS.primaryDark,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: SPACING.xs,
  },
  cashValue: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.onSurface,
    lineHeight: 36,
  },
  manageButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    minHeight: SPACING.touchTarget,
    justifyContent: 'center',
    ...getShadowStyle('lg'),
    shadowColor: COLORS.primary,
  },
  manageButtonText: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.onPrimary,
    fontWeight: '700',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
    marginBottom: SPACING.lg,
  },
  metricCard: {
    width: `${100 / 3 - 2}%`,
    marginHorizontal: SPACING.sm,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.tertiary,
    fontWeight: '700',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  actionTile: {
    width: `${100 / 3 - 2}%`,
    marginHorizontal: SPACING.sm,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: `${COLORS.primary}1A`, // 10% opacity
    padding: SPACING.cardPaddingLg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    ...getShadowStyle('sm'),
  },
  actionTilePressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  actionIconCircle: {
    width: SPACING.iconCircleLg,
    height: SPACING.iconCircleLg,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: `${COLORS.primary}1A`, // 10% opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  actionTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.tertiary,
    fontWeight: '700',
    textAlign: 'center',
  },
});
