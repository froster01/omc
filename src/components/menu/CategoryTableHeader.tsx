/**
 * CategoryTableHeader - Table column headers for category list
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../utils/designTokens';

export const CategoryTableHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.orderColumn}>
        <Text style={styles.headerText}>#</Text>
        <ChevronDown size={14} color={COLORS.textSecondary} strokeWidth={2} />
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.headerText}>Category</Text>
      </View>
      <View style={styles.itemsColumn}>
        <Text style={styles.headerText}>Items</Text>
      </View>
      <View style={styles.temperatureColumn}>
        <Text style={styles.headerText}>Temperature</Text>
      </View>
      <View style={styles.visibilityColumn}>
        <Text style={styles.headerText}>Visibility</Text>
      </View>
      <View style={styles.actionsColumn}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  headerText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.text,
    fontWeight: '700',
  },
  orderColumn: {
    width: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  nameColumn: {
    flex: 2,
  },
  itemsColumn: {
    width: 100,
    alignItems: 'center',
  },
  temperatureColumn: {
    width: 140,
    alignItems: 'center',
  },
  visibilityColumn: {
    width: 130,
    alignItems: 'center',
  },
  actionsColumn: {
    width: 96,
    alignItems: 'center',
  },
});
