/**
 * Dashboard Screen - Staff command center with sidebar layout
 * Matches screenshot design with stat cards, sales chart, top items, recent orders, quick actions
 */
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useOrders } from '../../hooks/useOrders';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getShadowStyle } from '../../utils/designTokens';
import type { DashboardScreenProps } from '../../types/navigation.types';

// Dashboard components
import { StatCard } from '../../components/dashboard/StatCard';
import { SalesChart } from '../../components/dashboard/SalesChart';
import { TopSellingItem } from '../../components/dashboard/TopSellingItem';
import { RecentOrderRow } from '../../components/dashboard/RecentOrderRow';
import { QuickActionTile } from '../../components/dashboard/QuickActionTile';

// Mock data
import {
  getMockSalesData,
  getMockTopSellingItems,
  getMockRecentOrders,
  calculateTotalSales,
} from '../../utils/mockDashboardData';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { orders } = useOrders();
  const { width: screenWidth } = useWindowDimensions();

  // Compute order stats from live data
  const stats = useMemo(() => {
    const pending = orders.filter(o => o.status === 'PENDING').length;
    const awaitingPayment = orders.filter(o => o.status === 'AWAITING_PAYMENT').length;
    const preparing = orders.filter(o => o.status === 'PREPARING' || o.status === 'ACCEPTED').length;
    const doneToday = orders.filter(o => 
      o.status === 'DONE' || 
      o.status.startsWith('PAID')
    ).length;
    
    return { pending, awaitingPayment, preparing, doneToday };
  }, [orders]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Mock data
  const salesData = getMockSalesData();
  const totalSales = calculateTotalSales(salesData);
  const topItems = getMockTopSellingItems();
  const recentOrders = getMockRecentOrders();

  // Layout calculations
  const contentWidth = screenWidth - (SPACING.md * 2);
  const leftColumnWidth = contentWidth * 0.65;
  const rightColumnWidth = contentWidth * 0.35 - SPACING.md;
  
  const tileWidth = (rightColumnWidth - 32 - (SPACING.sm * 2)) / 3;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Greeting Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}, Barista 👋</Text>
        <Text style={styles.subtitle}>Here's what's happening at Olmosq Coffee today.</Text>
      </View>

      {/* 4 Stat Cards */}
      <View style={styles.statCardsRow}>
        <StatCard
          icon="clipboard-list-outline"
          iconColor={COLORS.primary}
          iconBgColor={`${COLORS.primary}1F`}
          value={stats.pending}
          label="Pending Orders"
          trend={{ value: '20% vs yesterday', isPositive: true }}
        />
        <StatCard
          icon="wallet-outline"
          iconColor={COLORS.warning}
          iconBgColor={`${COLORS.warning}1F`}
          value={stats.awaitingPayment}
          label="Awaiting Payment"
          trend={{ value: '14% vs yesterday', isPositive: true }}
        />
        <StatCard
          icon="coffee-maker"
          iconColor="#2196F3"
          iconBgColor="#2196F31F"
          value={stats.preparing}
          label="Preparing"
          trend={{ value: '10% vs yesterday', isPositive: true }}
        />
        <StatCard
          icon="check-circle"
          iconColor={COLORS.success}
          iconBgColor={`${COLORS.success}1F`}
          value={stats.doneToday}
          label="Completed Today"
          trend={{ value: '27% vs yesterday', isPositive: true }}
        />
      </View>

      {/* Two-column layout */}
      <View style={styles.twoColumnRow}>
        {/* Left column: Sales Overview + Recent Orders */}
        <View style={[styles.leftColumn, { width: leftColumnWidth }]}>
           <SalesChart data={salesData} total={totalSales} chartWidth={leftColumnWidth - 32} />

          <View style={styles.recentOrdersCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Recent Orders</Text>
              <Text style={styles.viewAllLink}>View all</Text>
            </View>
            {recentOrders.map((order) => (
              <RecentOrderRow
                key={order.orderNumber}
                orderNumber={order.orderNumber}
                customerName={order.customerName}
                status={order.status}
                amount={order.amount}
                onPress={() => {
                  // Navigate to order detail if orderId available
                  // For now, just navigate to Orders screen
                  navigation.navigate('Orders');
                }}
              />
            ))}
          </View>
        </View>

        {/* Right column: Top Selling Items + Quick Actions */}
        <View style={[styles.rightColumn, { width: rightColumnWidth }]}>
          <View style={styles.topItemsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Top Selling Items</Text>
              <Text style={styles.viewAllLink}>View all</Text>
            </View>
            {topItems.map((item, index) => (
              <TopSellingItem
                key={item.id}
                rank={index + 1}
                name={item.name}
                soldCount={item.soldCount}
                icon={item.icon}
                color={item.color}
              />
            ))}
          </View>

          <View style={styles.quickActionsCard}>
            <Text style={styles.cardTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <QuickActionTile
                icon="cart-plus"
                label="New Order"
                onPress={() => navigation.navigate('Orders')}
                style={{ width: tileWidth }}
              />
              <QuickActionTile
                icon="table-furniture"
                label="Table Map"
                onPress={() => navigation.navigate('Tables')}
                style={{ width: tileWidth }}
              />
              <QuickActionTile
                icon="book-open-outline"
                label="Menu"
                onPress={() => navigation.navigate('MenuManagement')}
                style={{ width: tileWidth }}
              />
              <QuickActionTile
                icon="clock-outline"
                label="Shift Summary"
                onPress={() => navigation.navigate('Shift')}
                style={{ width: tileWidth }}
              />
              <QuickActionTile
                icon="chart-bar"
                label="Reports"
                onPress={() => navigation.navigate('ShiftReports')}
                style={{ width: tileWidth }}
              />
              <QuickActionTile
                icon="plus-circle-outline"
                label="Add Item"
                onPress={() => navigation.navigate('MenuManagement')}
                style={{ width: tileWidth }}
              />
            </View>
          </View>
        </View>
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
    gap: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  greeting: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.onSurface,
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xxs,
  },
  statCardsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  twoColumnRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'flex-start',
  },
  leftColumn: {
    gap: SPACING.md,
  },
  rightColumn: {
    gap: SPACING.md,
  },
  recentOrdersCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...getShadowStyle('sm'),
  },
  topItemsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...getShadowStyle('sm'),
  },
  quickActionsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...getShadowStyle('sm'),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.onSurface,
    fontWeight: '700',
  },
  viewAllLink: {
    ...TYPOGRAPHY.labelLg,
    color: COLORS.primary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
});
