/**
 * Order Detail Screen
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useOrder } from '../../hooks/useOrders';
import { useOrders } from '../../hooks/useOrders';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { COLORS, SPACING } from '../../utils/constants';
import type { OrderDetailScreenProps } from '../../types/navigation.types';

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { orderId } = route.params;
  const { order, isLoading } = useOrder(orderId);
  const { updateStatus, cancelOrder, isUpdating } = useOrders();

  if (isLoading || !order) {
    return <LoadingSpinner message="Loading order..." />;
  }

  const handleAcceptOrder = () => {
    updateStatus({ id: orderId, status: 'PREPARING' });
    Alert.alert('Success', 'Order accepted');
  };

  const handleMarkDone = () => {
    updateStatus({ id: orderId, status: 'AWAITING_PAYMENT' });
    Alert.alert('Success', 'Order marked as done');
  };

  const handleRecordPayment = () => {
    navigation.navigate('Payment', { orderId });
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            cancelOrder(orderId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const canAccept = order.status === 'PENDING';
  const canMarkDone = order.status === 'PREPARING';
  const canRecordPayment = order.status === 'AWAITING_PAYMENT';
  const canCancel = ['PENDING', 'ACCEPTED', 'PREPARING'].includes(order.status);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Order Header */}
      <Card style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.orderNumber}>
            Order #{order.shiftOrderNumber || order.orderNumber}
          </Text>
          <StatusBadge status={order.status} />
        </View>
        <Text style={styles.table}>Table {order.table.number}</Text>
        <Text style={styles.customer}>{order.customerName}</Text>
        <Text style={styles.time}>{formatDate(order.createdAt)}</Text>
      </Card>

      {/* Order Items */}
      <Card style={styles.items}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.quantity}x {item.item.name}
              </Text>
              {item.variant && (
                <Text style={styles.itemVariant}>{item.variant.name}</Text>
              )}
              {item.modifiers.length > 0 && (
                <Text style={styles.itemModifiers}>
                  + {item.modifiers.map((m) => m.name).join(', ')}
                </Text>
              )}
              {item.notes && <Text style={styles.itemNotes}>{item.notes}</Text>}
            </View>
            <Text style={styles.itemPrice}>{formatCurrency(item.totalPrice)}</Text>
          </View>
        ))}
      </Card>

      {/* Order Total */}
      <Card style={styles.total}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>{formatCurrency(order.subtotal)}</Text>
        </View>
        {parseFloat(order.tax) > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text style={styles.totalValue}>{formatCurrency(order.tax)}</Text>
          </View>
        )}
        <View style={[styles.totalRow, styles.totalRowFinal]}>
          <Text style={styles.totalLabelFinal}>Total</Text>
          <Text style={styles.totalValueFinal}>{formatCurrency(order.total)}</Text>
        </View>
      </Card>

      {/* Actions */}
      <View style={styles.actions}>
        {canAccept && (
          <Button
            title="Accept Order"
            onPress={handleAcceptOrder}
            loading={isUpdating}
            size="large"
            style={styles.actionButton}
          />
        )}
        {canMarkDone && (
          <Button
            title="Mark as Done"
            onPress={handleMarkDone}
            loading={isUpdating}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
        )}
        {canRecordPayment && (
          <Button
            title="Record Payment"
            onPress={handleRecordPayment}
            variant="primary"
            size="large"
            style={styles.actionButton}
          />
        )}
        {canCancel && (
          <Button
            title="Cancel Order"
            onPress={handleCancelOrder}
            loading={isUpdating}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />
        )}
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
  header: {
    marginBottom: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  table: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  customer: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  items: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  itemModifiers: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  itemNotes: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  total: {
    marginBottom: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  totalRowFinal: {
    borderTopWidth: 2,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.text,
  },
  totalLabelFinal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValueFinal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actions: {
    gap: SPACING.md,
  },
  actionButton: {
    marginBottom: SPACING.sm,
  },
});
