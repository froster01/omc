/**
 * Payment Recording Screen - Stitch Design Implementation
 * Features: 3-column payment methods, 3×4 calculator grid, change calculation
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { MaterialIcon } from '../../components/common/MaterialIcon';
import { useOrder, useOrders } from '../../hooks/useOrders';
import { usePaymentTypes } from '../../hooks/usePaymentTypes';
import { formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../utils/designTokens';
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

  const handleNumberPress = (num: string) => {
    if (num === 'Clear') {
      setCashReceived('');
    } else if (num === 'Enter') {
      handleSubmit();
    } else if (num === '.') {
      if (!cashReceived.includes('.')) {
        setCashReceived(cashReceived + num);
      }
    } else {
      // Add number
      setCashReceived(cashReceived + num);
    }
  };

  const handleQuickAmount = (amount: number) => {
    setCashReceived(amount.toFixed(2));
  };

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
      {/* Order Summary - Center Display */}
      <Card style={styles.summaryCard}>
        <View style={styles.summaryMeta}>
          <Text style={styles.summaryMetaText}>Order #{order.shiftOrderNumber || order.orderNumber}</Text>
          <Text style={styles.summaryDivider}>•</Text>
          <Text style={styles.summaryMetaText}>Table {order.table.number}</Text>
        </View>
        <Text style={styles.totalDisplay}>{formatCurrency(order.total)}</Text>
      </Card>

      {/* Payment Type Selection - 3 Column Grid */}
      <View style={styles.paymentMethodsGrid}>
        {paymentTypes.map((paymentType) => {
          const isSelected = selectedPaymentTypeId === paymentType.id;
          const iconName =
            paymentType.type === 'CASH'
              ? 'payments'
              : paymentType.type === 'CARD'
              ? 'credit_card'
              : 'qr_code_2';

          return (
            <Pressable
              key={paymentType.id}
              style={({ pressed }) => [
                styles.paymentMethodButton,
                isSelected && styles.paymentMethodButtonActive,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setSelectedPaymentTypeId(paymentType.id)}
            >
              <MaterialIcon
                name={iconName}
                size={24}
                color={isSelected ? COLORS.onPrimary : COLORS.primary}
              />
              <Text
                style={[
                  styles.paymentMethodText,
                  isSelected && styles.paymentMethodTextActive,
                ]}
              >
                {paymentType.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Calculator Area - Only show for cash payments */}
      {isCashPayment && (
        <View style={styles.calculatorContainer}>
          {/* Left Side: Cash Tendered & Keypad */}
          <View style={styles.calculatorLeft}>
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Cash Tendered</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={styles.input}
                  value={cashReceived}
                  onChangeText={setCashReceived}
                  keyboardType="decimal-pad"
                  placeholder="0.00"
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmounts}>
              {[20, 50, 100].map((amount) => (
                <Pressable
                  key={amount}
                  style={({ pressed }) => [
                    styles.quickAmountButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleQuickAmount(amount)}
                >
                  <Text style={styles.quickAmountText}>${amount}</Text>
                </Pressable>
              ))}
            </View>

            {/* Calculator Grid - 3x4 */}
            <View style={styles.calculatorGrid}>
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', '.'].map(
                (key) => (
                  <Pressable
                    key={key}
                    style={({ pressed }) => [
                      styles.calculatorKey,
                      key === 'Clear' && styles.calculatorKeyClear,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={() => handleNumberPress(key)}
                  >
                    <Text
                      style={[
                        styles.calculatorKeyText,
                        key === 'Clear' && styles.calculatorKeyTextClear,
                      ]}
                    >
                      {key}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>

          {/* Right Side: Change Due */}
          <View style={styles.calculatorRight}>
            <Card style={styles.changeCard}>
              <Text style={styles.changeLabel}>CHANGE DUE</Text>
              <Text style={styles.changeAmount}>
                {formatCurrency(Math.max(0, change))}
              </Text>
              <View style={styles.receiptOptions}>
                <Pressable
                  style={({ pressed }) => [
                    styles.receiptButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => Alert.alert('Print Receipt', 'Printing...')}
                >
                  <Text style={styles.receiptButtonText}>Print Receipt</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.receiptButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => Alert.alert('Email Receipt', 'Sending...')}
                >
                  <Text style={styles.receiptButtonText}>Email Receipt</Text>
                </Pressable>
              </View>
            </Card>
          </View>
        </View>
      )}

      {/* Complete Payment Button */}
      <Pressable
        style={({ pressed }) => [
          styles.completeButton,
          (!selectedPaymentTypeId || (isCashPayment && cashReceivedNum < orderTotal)) &&
            styles.completeButtonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleSubmit}
        disabled={
          isRecordingPayment ||
          !selectedPaymentTypeId ||
          (isCashPayment && cashReceivedNum < orderTotal)
        }
      >
        <MaterialIcon name="check_circle" size={24} color={COLORS.onPrimary} />
        <Text style={styles.completeButtonText}>
          {isRecordingPayment ? 'Processing...' : 'Complete Payment'}
        </Text>
      </Pressable>
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
    maxWidth: 1024,
    alignSelf: 'center',
    width: '100%',
  },
  // Order Summary Card
  summaryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  summaryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  summaryMetaText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  summaryDivider: {
    fontSize: 16,
    color: COLORS.border,
  },
  totalDisplay: {
    ...TYPOGRAPHY.displayLg,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -2,
  },
  // Payment Methods Grid - 3 columns
  paymentMethodsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
    justifyContent: 'center',
  },
  paymentMethodButton: {
    width: 200,
    height: 56,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentMethodButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  paymentMethodTextActive: {
    color: COLORS.onPrimary,
  },
  // Calculator Container
  calculatorContainer: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  calculatorLeft: {
    flex: 1,
    gap: SPACING.md,
  },
  calculatorRight: {
    width: 320,
  },
  // Input Section
  inputSection: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: BORDER_RADIUS.sm,
    height: 56,
    paddingHorizontal: SPACING.md,
  },
  inputPrefix: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    padding: 0,
  },
  // Quick Amounts
  quickAmounts: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  quickAmountButton: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // Calculator Grid - 3x4
  calculatorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  calculatorKey: {
    width: 'calc(33.33% - 8px)',
    height: 80,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculatorKeyClear: {
    backgroundColor: COLORS.errorContainer,
  },
  calculatorKeyText: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  calculatorKeyTextClear: {
    fontSize: 16,
    color: COLORS.error,
  },
  // Change Card
  changeCard: {
    backgroundColor: COLORS.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  changeLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.textSecondary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: SPACING.md,
  },
  changeAmount: {
    ...TYPOGRAPHY.displayLg,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -2,
  },
  receiptOptions: {
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  receiptButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  receiptButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  // Complete Payment Button
  completeButton: {
    height: 64,
    backgroundColor: COLORS.primary,
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
  completeButtonDisabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.5,
  },
  completeButtonText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.onPrimary,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
});
