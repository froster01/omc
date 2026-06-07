/**
 * Orders Screen - Stitch Sage Green Design
 */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { OrdersList } from '../../components/orders/OrdersList';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { TabBar, Tab } from '../../components/common/TabBar';
import { useOrders } from '../../hooks/useOrders';
import { useWebSocket } from '../../hooks/useWebSocket';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/designTokens';
import type { OrdersScreenProps } from '../../types/navigation.types';

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const { orders, isLoading } = useOrders();
  const [activeTab, setActiveTab] = useState('all');
  
  // Connect to WebSocket for real-time updates
  useWebSocket();

  const tabs: Tab[] = [
    { id: 'all', label: 'All' },
    { id: 'payment', label: 'Payment' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'done', label: 'Done' },
    { id: 'paid', label: 'Paid' },
    { id: 'failed', label: 'Failed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => {
        const status = order.status.toLowerCase();
        if (activeTab === 'payment') return status === 'pending' || status === 'awaiting_payment';
        if (activeTab === 'preparing') return status === 'preparing' || status === 'accepted';
        if (activeTab === 'done') return status === 'done';
        if (activeTab === 'paid') return status.includes('paid');
        if (activeTab === 'failed') return status.includes('failed');
        if (activeTab === 'cancelled') return status === 'cancelled';
        return false;
      });

  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetail', { orderId });
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading orders..." />;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Order Management</Text>
          <Text style={styles.headerSubtitle}>
            Shift 8 orders only. Collect counter payments, then move paid orders through prep.
          </Text>
        </View>
      </View>

      {/* Tab Bar */}
      <TabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        style={styles.tabBar}
      />

      {/* Content Area */}
      <View style={styles.content}>
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon="coffee"
            title="No orders found"
            description="Everything is up to date. New incoming orders from the counter or app will appear here automatically."
            actionLabel="Refresh Feed"
            onAction={() => {
              // Trigger refresh
            }}
          />
        ) : (
          <OrdersList orders={filteredOrders} onOrderPress={handleOrderPress} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  headerTitle: {
    ...TYPOGRAPHY.headlineLg,
    color: COLORS.onSurface,
    fontWeight: '800',
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.bodyLg,
    color: `${COLORS.onSurfaceVariant}B3`, // 70% opacity
    lineHeight: 24,
  },
  tabBar: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
});
