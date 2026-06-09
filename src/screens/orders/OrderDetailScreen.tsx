/**
 * Order Detail Screen - Stitch Design Implementation
 * Features: Display Large order number, status timeline, 12-column grid layout
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useOrder } from '../../hooks/useOrders';
import { useOrders } from '../../hooks/useOrders';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../utils/designTokens';
import type { OrderDetailScreenProps } from '../../types/navigation.types';

// Status step configuration
type StatusStep = {
  id: string;
  label: string;
  icon: string;
};

const STATUS_STEPS: StatusStep[] = [
  { id: 'PENDING', label: 'Pending', icon: 'check' },
  { id: 'ACCEPTED', label: 'Accepted', icon: 'check' },
  { id: 'PREPARING', label: 'Preparing', icon: 'restaurant' },
  { id: 'AWAITING_PAYMENT', label: 'Payment', icon: 'payment' },
  { id: 'PAID_SYNCED_TO_LOYVERSE', label: 'Done', icon: 'check_circle' },
];

const getStatusIndex = (status: string): number => {
  const statusMap: Record<string, number> = {
    PENDING: 0,
    ACCEPTED: 1,
    PREPARING: 2,
    AWAITING_PAYMENT: 3,
    DONE: 4,
    PAID_SYNCING: 4,
    PAID_SYNCED_TO_LOYVERSE: 4,
  };
  return statusMap[status] ?? 0;
};

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

  const handleMarkDone = () => {
    updateStatus({ id: orderId, status: 'AWAITING_PAYMENT' });
    Alert.alert('Success', 'Order marked as done');
  };

  const handleRecordPayment = () => {
    navigation.navigate('Payment', { orderId });
  };

  const handleVoidOrder = () => {
    Alert.alert(
      'Void Order',
      'Are you sure you want to void this order? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Void Order',
          style: 'destructive',
          onPress: () => {
            cancelOrder(orderId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const currentStatusIndex = getStatusIndex(order.status);
  const canMarkDone = order.status === 'PREPARING';
  const canRecordPayment = order.status === 'AWAITING_PAYMENT';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header with Display Large Order Number */}
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcon name="arrow_back" size={24} color={COLORS.tertiary} />
        </Pressable>
        <View style={styles.orderTitleRow}>
          <Text style={styles.orderNumberLarge}>
            #{order.shiftOrderNumber || order.orderNumber}
          </Text>
          <View style={styles.tableBadge}>
            <Text style={styles.tableBadgeText}>Table {order.table.number}</Text>
          </View>
        </View>
      </View>

      {/* Status Timeline Card - Full Width */}
      <Card style={styles.timelineCard}>
        <View style={styles.timelineMeta}>
          <View style={styles.timelineMetaRow}>
            <MaterialIcon name="schedule" size={18} color={COLORS.textSecondary} />
            <Text style={styles.timelineTime}>{formatDate(order.createdAt)}</Text>
          </View>
          <StatusBadge status={order.status} />
        </View>

        {/* Status Timeline */}
        <View style={styles.timeline}>
          <View style={styles.timelineTrackBackground} />
          <View 
            style={[
              styles.timelineTrackActive, 
              { width: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%` }
            ]} 
          />
          {STATUS_STEPS.map((step, index) => {
            const isComplete = index < currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const isPending = index > currentStatusIndex;

            return (
              <View key={step.id} style={styles.timelineStep}>
                <View
                  style={[
                    styles.timelineCircle,
                    isComplete && styles.timelineCircleComplete,
                    isCurrent && styles.timelineCircleCurrent,
                    isPending && styles.timelineCirclePending,
                  ]}
                >
                  {isComplete ? (
                    <MaterialIcon name="check" size={16} color={COLORS.onPrimary} />
                  ) : isCurrent ? (
                    <View style={styles.timelinePulse} />
                  ) : null}
                </View>
                <Text
                  style={[
                    styles.timelineLabel,
                    isCurrent && styles.timelineLabelCurrent,
                    isPending && styles.timelineLabelPending,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* 12-Column Grid: 8 cols items + 4 cols summary/actions */}
      <View style={styles.gridContainer}>
        {/* Order Items Section (8 columns = 66.67%) */}
        <View style={styles.itemsSection}>
          <Card style={styles.itemsCard}>
            <View style={styles.itemsHeader}>
              <Text style={styles.sectionTitle}>Order Items ({order.items.length})</Text>
            </View>
            <View style={styles.itemsList}>
              {order.items.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.itemRow,
                    index % 2 === 0 ? styles.itemRowEven : styles.itemRowOdd,
                  ]}
                >
                  <View style={styles.itemIconCircle}>
                    <MaterialIcon name="coffee" size={24} color={COLORS.tertiary} />
                  </View>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.item.name}</Text>
                    {(item.variant || item.modifiers.length > 0) && (
                      <Text style={styles.itemMeta}>
                        {[
                          item.variant?.name,
                          ...item.modifiers.map((m) => m.name),
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                  <Text style={styles.itemUnitPrice}>{formatCurrency(parseFloat(item.item.price))}</Text>
                  <Text style={styles.itemTotalPrice}>{formatCurrency(item.totalPrice)}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Summary & Actions Section (4 columns = 33.33%) */}
        <View style={styles.summarySection}>
          {/* Order Totals */}
          <Card style={styles.totalsCard}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(order.subtotal)}</Text>
            </View>
            {parseFloat(order.tax) > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax (10%)</Text>
                <Text style={styles.totalValue}>{formatCurrency(order.tax)}</Text>
              </View>
            )}
            <View style={styles.totalDivider} />
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>Total</Text>
              <Text style={styles.totalValueFinal}>{formatCurrency(order.total)}</Text>
            </View>
          </Card>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {canMarkDone && (
              <Pressable
                style={({ pressed }) => [
                  styles.primaryActionButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleMarkDone}
                disabled={isUpdating}
              >
                <MaterialIcon name="check_circle" size={24} color={COLORS.onPrimary} />
                <Text style={styles.primaryActionText}>Mark Done</Text>
              </Pressable>
            )}
            {canRecordPayment && (
              <Pressable
                style={({ pressed }) => [
                  styles.primaryActionButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleRecordPayment}
                disabled={isUpdating}
              >
                <MaterialIcon name="payment" size={24} color={COLORS.onPrimary} />
                <Text style={styles.primaryActionText}>Record Payment</Text>
              </Pressable>
            )}
            <Pressable
              style={({ pressed }) => [
                styles.secondaryActionButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => Alert.alert('Print Receipt', 'Printing...')}
            >
              <MaterialIcon name="print" size={24} color={COLORS.tertiary} />
              <Text style={styles.secondaryActionText}>Print Receipt</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.dangerActionButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleVoidOrder}
              disabled={isUpdating}
            >
              <MaterialIcon name="delete_forever" size={24} color={COLORS.error} />
              <Text style={styles.dangerActionText}>Void Order</Text>
            </Pressable>
          </View>

          {/* Customer Note */}
          {order.notes && (
            <View style={styles.noteCard}>
              <Text style={styles.noteTitle}>INTERNAL NOTE</Text>
              <Text style={styles.noteText}>{order.notes}</Text>
            </View>
          )}
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
    padding: SPACING.lg,
    paddingBottom: 80,
  },
  // Header with Display Large Order Number
  header: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  orderTitleRow: {
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
  // Status Timeline Card
  timelineCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.xl,
  },
  timelineMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  timelineMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  timelineTime: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  timeline: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  timelineTrackBackground: {
    position: 'absolute',
    top: 14,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: COLORS.surfaceContainerHigh,
  },
  timelineTrackActive: {
    position: 'absolute',
    top: 14,
    left: '10%',
    height: 2,
    backgroundColor: COLORS.primary,
  },
  timelineStep: {
    alignItems: 'center',
    gap: 12,
    zIndex: 1,
  },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineCircleComplete: {
    backgroundColor: COLORS.primary,
  },
  timelineCircleCurrent: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  timelineCirclePending: {
    backgroundColor: COLORS.surfaceContainerHigh,
    opacity: 0.4,
  },
  timelinePulse: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.onPrimary,
  },
  timelineLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  timelineLabelCurrent: {
    color: COLORS.tertiary,
    fontWeight: '900',
  },
  timelineLabelPending: {
    opacity: 0.4,
  },
  // 12-Column Grid Container
  gridContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  itemsSection: {
    flex: 2, // 8/12 columns = 66.67%
  },
  summarySection: {
    flex: 1, // 4/12 columns = 33.33%
    gap: SPACING.lg,
  },
  // Items Card
  itemsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  itemsHeader: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: `${COLORS.surfaceContainerHigh}4D`, // 30% opacity
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainerHigh,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  itemsList: {
    // Items list container
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    paddingHorizontal: SPACING.xl,
  },
  itemRowEven: {
    backgroundColor: COLORS.surface,
  },
  itemRowOdd: {
    backgroundColor: `${COLORS.background}4D`, // 30% opacity
  },
  itemIconCircle: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemQuantity: {
    width: 64,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primary,
  },
  itemUnitPrice: {
    width: 96,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  itemTotalPrice: {
    width: 96,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  // Totals Card
  totalsCard: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: `${COLORS.primary}33`, // 20% opacity
    padding: SPACING.xl,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  totalDivider: {
    height: 1,
    backgroundColor: `${COLORS.primary}33`, // 20% opacity
    marginVertical: SPACING.sm,
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: SPACING.sm,
  },
  totalLabelFinal: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.tertiary,
  },
  totalValueFinal: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.text,
  },
  // Action Buttons
  actionButtons: {
    gap: 12,
  },
  primaryActionButton: {
    height: 56,
    backgroundColor: COLORS.tertiary,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
  secondaryActionButton: {
    height: 56,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  secondaryActionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.tertiary,
  },
  dangerActionButton: {
    height: 56,
    backgroundColor: 'transparent',
    borderRadius: BORDER_RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: SPACING.md,
  },
  dangerActionText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.error,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
  // Customer Note
  noteCard: {
    marginTop: 'auto',
    backgroundColor: `${COLORS.surfaceContainerHigh}80`, // 50% opacity
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  noteTitle: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.text,
    fontStyle: 'italic',
  },
});
