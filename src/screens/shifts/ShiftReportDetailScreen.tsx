/**
 * Shift Report Detail Screen
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useShiftDetail } from '../../hooks/useShift';
import { formatDate, formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING } from '../../utils/constants';
import type { ShiftReportDetailScreenProps } from '../../types/navigation.types';

export const ShiftReportDetailScreen: React.FC<ShiftReportDetailScreenProps> = ({ route }) => {
  const { shiftId } = route.params;
  const { shift, isLoading } = useShiftDetail(shiftId);

  if (isLoading || !shift) {
    return <LoadingSpinner message="Loading shift report..." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={styles.title}>Shift #{shift.shiftNumber}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Opened</Text>
          <Text style={styles.value}>{formatDate(shift.openedAt)}</Text>
        </View>
        {shift.closedAt && (
          <View style={styles.row}>
            <Text style={styles.label}>Closed</Text>
            <Text style={styles.value}>{formatDate(shift.closedAt)}</Text>
          </View>
        )}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Cash Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Starting Cash</Text>
          <Text style={styles.value}>{formatCurrency(shift.startingCash)}</Text>
        </View>
        {shift.actualCash && (
          <View style={styles.row}>
            <Text style={styles.label}>Ending Cash</Text>
            <Text style={styles.value}>{formatCurrency(shift.actualCash)}</Text>
          </View>
        )}
        {shift.cashVariance && (
          <View style={styles.row}>
            <Text style={styles.label}>Variance</Text>
            <Text style={[
              styles.value,
              parseFloat(shift.cashVariance) < 0 ? styles.negative : styles.positive
            ]}>
              {formatCurrency(shift.cashVariance)}
            </Text>
          </View>
        )}
      </Card>

      {shift.closedNote && (
        <Card style={styles.card}>
          <Text style={styles.title}>Closing Note</Text>
          <Text style={styles.note}>{shift.closedNote}</Text>
        </Card>
      )}
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
  card: {
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  note: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  negative: {
    color: COLORS.error,
  },
  positive: {
    color: COLORS.success,
  },
});
