/**
 * Shift Reports Screen
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Card } from '../../components/common/Card';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { useShiftHistory } from '../../hooks/useShift';
import { formatDate, formatCurrency } from '../../utils/formatting';
import { COLORS, SPACING } from '../../utils/constants';
import type { ShiftReportsScreenProps } from '../../types/navigation.types';

export const ShiftReportsScreen: React.FC<ShiftReportsScreenProps> = ({ navigation }) => {
  const { shifts, isLoading } = useShiftHistory();

  if (isLoading) {
    return <LoadingSpinner message="Loading shift reports..." />;
  }

  if (shifts.length === 0) {
    return <EmptyState message="No closed shifts found" icon="📊" />;
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={shifts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() => navigation.navigate('ShiftReportDetail', { shiftId: item.id })}
            style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.shiftNumber}>Shift #{item.shiftNumber}</Text>
              <Text style={styles.status}>Closed</Text>
            </View>
            <Text style={styles.date}>{formatDate(item.openedAt)}</Text>
            {item.closedAt && (
              <Text style={styles.closedDate}>Closed: {formatDate(item.closedAt)}</Text>
            )}
            <View style={styles.cash}>
              <View>
                <Text style={styles.cashLabel}>Starting</Text>
                <Text style={styles.cashValue}>{formatCurrency(item.startingCash)}</Text>
              </View>
              {item.actualCash && (
                <View>
                  <Text style={styles.cashLabel}>Ending</Text>
                  <Text style={styles.cashValue}>{formatCurrency(item.actualCash)}</Text>
                </View>
              )}
              {item.cashVariance && (
                <View>
                  <Text style={styles.cashLabel}>Variance</Text>
                  <Text style={[
                    styles.cashValue,
                    parseFloat(item.cashVariance) < 0 ? styles.negative : styles.positive
                  ]}>
                    {formatCurrency(item.cashVariance)}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.md,
  },
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  shiftNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  status: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  date: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  closedDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  cash: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cashLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  cashValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  negative: {
    color: COLORS.error,
  },
  positive: {
    color: COLORS.success,
  },
});
