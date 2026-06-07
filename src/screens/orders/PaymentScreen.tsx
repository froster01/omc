/**
 * Payment Recording Screen
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useOrder, useOrders } from '../../hooks/useOrders';
import { usePaymentTypes } from '../../hooks/usePaymentTypes';
import { formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/constants';
import type { PaymentScreenProps } from '../../types/navigation.types';

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  route,
  navigation,
}) => {
  const { orderId } = route.params;
  const { order, isLoading } = useOrder(orderId);
  const { paymentTypes } = usePaymentTypes();
  const { recordPayment, isRecordingPayment } = useOrders();

  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState<string>('');
  const [cashReceived, setCashReceived] = useState('');

  if (isLoading || !order) {
    return <LoadingSpinner message="Loading order..." />;
  }

  const selectedPaymentType = paymentTypes.find((pt) => pt.id === selectedPaymentTypeId);
  const isCashPayment = selectedPaymentType?.type === 'CASH';
  const orderTotal = parseFloat(order.total);
  const cashReceivedNum = parseFloat(cashReceived) || 0;
  const change = cashReceivedNum - orderTotal;

  const handleSubmit = () => {
    if (!selectedPaymentTypeId) {
      Alert.alert('Error', 'Please select a payment type');
      return;
    }

    if (isCashPayment) {
      if (!cashReceived || cashReceivedNum < orderTotal) {
        Alert.alert('Error', 'Cash received must be at least the order total');
        return;
      }
    }

    recordPayment(
      {
        id: orderId,
        paymentData: {
          paymentTypeId: selectedPaymentTypeId,
          cashReceived: isCashPayment ? cashReceivedNum : undefined,
        },
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Payment recorded successfully', [
            { text: 'OK', onPress: () => navigation.navigate('Orders') },
          ]);
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to record payment');
        },
      }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Order Summary */}
      <Card style={styles.summary}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order #{order.shiftOrderNumber || order.orderNumber}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Table {order.table.number}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Customer</Text>
          <Text style={styles.summaryValue}>{order.customerName}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(order.total)}</Text>
        </View>
      </Card>

      {/* Payment Type Selection */}
      <Card style={styles.paymentTypes}>
        <Text style={styles.sectionTitle}>Payment Type</Text>
        {paymentTypes.map((paymentType) => (
          <Button
            key={paymentType.id}
            title={paymentType.name}
            onPress={() => setSelectedPaymentTypeId(paymentType.id)}
            variant={selectedPaymentTypeId === paymentType.id ? 'primary' : 'outline'}
            style={styles.paymentTypeButton}
          />
        ))}
      </Card>

      {/* Cash Input */}
      {isCashPayment && (
        <Card style={styles.cashInput}>
          <Text style={styles.sectionTitle}>Cash Details</Text>
          <Text style={styles.inputLabel}>Cash Received</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={COLORS.textSecondary}
            value={cashReceived}
            onChangeText={setCashReceived}
            keyboardType="numeric"
          />
          {cashReceivedNum > 0 && (
            <View style={styles.changeRow}>
              <Text style={styles.changeLabel}>Change</Text>
              <Text style={[styles.changeValue, change < 0 && styles.changeNegative]}>
                {formatCurrency(Math.max(0, change))}
              </Text>
            </View>
          )}
        </Card>
      )}

      {/* Submit Button */}
      <Button
        title="Record Payment"
        onPress={handleSubmit}
        loading={isRecordingPayment}
        disabled={!selectedPaymentTypeId}
        size="large"
        style={styles.submitButton}
      />
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
  summary: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  paymentTypes: {
    marginBottom: SPACING.md,
  },
  paymentTypeButton: {
    marginBottom: SPACING.sm,
  },
  cashInput: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 18,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  changeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  changeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  changeNegative: {
    color: COLORS.error,
  },
  submitButton: {
    marginBottom: SPACING.xl,
  },
});
