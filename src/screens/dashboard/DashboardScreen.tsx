/**
 * Dashboard Screen
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { useShift } from '../../hooks/useShift';
import { useOrders } from '../../hooks/useOrders';
import { formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING } from '../../utils/constants';
import type { DashboardScreenProps } from '../../types/navigation.types';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { currentShift } = useShift();
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length;
  const preparingOrders = orders.filter((o) => o.status === 'PREPARING').length;
  const doneOrders = orders.filter((o) => o.status === 'DONE').length;

  const menuItems = [
    { title: 'Orders', screen: 'Orders', icon: '📋' },
    { title: 'Shift Management', screen: 'Shift', icon: '🕐' },
    { title: 'Cash Drawer', screen: 'CashDrawer', icon: '💰' },
    { title: 'Menu Sync', screen: 'MenuSync', icon: '🔄' },
    { title: 'Shift Reports', screen: 'ShiftReports', icon: '📊' },
    { title: 'Tables', screen: 'Tables', icon: '🪑' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Shift Info */}
      <Card style={styles.shiftCard}>
        <Text style={styles.shiftTitle}>
          {currentShift ? `Shift #${currentShift.shiftNumber}` : 'No Active Shift'}
        </Text>
        {currentShift && (
          <View style={styles.shiftInfo}>
            <View style={styles.shiftInfoItem}>
              <Text style={styles.shiftInfoLabel}>Starting Cash</Text>
              <Text style={styles.shiftInfoValue}>
                {formatCurrency(currentShift.startingCash)}
              </Text>
            </View>
            <View style={styles.shiftInfoItem}>
              <Text style={styles.shiftInfoLabel}>Orders</Text>
              <Text style={styles.shiftInfoValue}>{orders.length}</Text>
            </View>
          </View>
        )}
      </Card>

      {/* Order Stats */}
      <View style={styles.stats}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingOrders}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{preparingOrders}</Text>
          <Text style={styles.statLabel}>Preparing</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>{doneOrders}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </Card>
      </View>

      {/* Menu Grid */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen as any)}>
            <Card style={styles.menuCard}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
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
    padding: SPACING.md,
  },
  shiftCard: {
    marginBottom: SPACING.md,
  },
  shiftTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  shiftInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shiftInfoItem: {
    alignItems: 'center',
  },
  shiftInfoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  shiftInfoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  statCard: {
    flex: 1,
    marginRight: SPACING.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.sm,
  },
  menuItem: {
    width: '50%',
    padding: SPACING.sm,
  },
  menuCard: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});
