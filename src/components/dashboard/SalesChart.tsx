/**
 * SalesChart - Sales Overview card with line chart and total
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY, getShadowStyle } from '../../utils/designTokens';
import { formatCurrency } from '../../utils/formatting';
import type { SalesDataPoint } from '../../utils/mockDashboardData';

interface SalesChartProps {
  data: SalesDataPoint[];
  total: number;
  chartWidth: number;
}

// Reduce the 24-hour series to a readable set of labelled points
const sampleData = (data: SalesDataPoint[]) => {
  const step = 4; // every 4 hours
  const labels: string[] = [];
  const values: number[] = [];
  data.forEach((point, index) => {
    if (index % step === 0) {
      labels.push(point.hour);
      values.push(point.amount);
    }
  });
  return { labels, values };
};

export const SalesChart: React.FC<SalesChartProps> = ({ data, total, chartWidth }) => {
  const { labels, values } = sampleData(data);

  const chartConfig = {
    backgroundGradientFrom: COLORS.surface,
    backgroundGradientTo: COLORS.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(167, 196, 114, ${opacity})`,
    labelColor: () => COLORS.onSurfaceVariant,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: COLORS.primary,
    },
    propsForBackgroundLines: {
      stroke: COLORS.outlineVariant,
      strokeDasharray: '4',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Sales Overview</Text>
          <Text style={styles.subtitle}>Today</Text>
        </View>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>
      <LineChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        withInnerLines
        withOuterLines={false}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    ...getShadowStyle('sm'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.titleLg,
    color: COLORS.onSurface,
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xxs,
  },
  total: {
    ...TYPOGRAPHY.headlineMd,
    color: COLORS.primary,
    fontWeight: '800',
  },
  chart: {
    marginLeft: -SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
});
