/**
 * CategoryListItem - Table row for a single category
 */
import React from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import type { Category } from '../../types/api.types';
import {
  BORDER_RADIUS,
  COLORS,
  COMPONENT_SIZES,
  SPACING,
  TYPOGRAPHY,
} from '../../utils/designTokens';

interface CategoryListItemProps {
  category: Category;
  index: number;
  onToggleTemperature: (id: string, value: boolean) => void;
  onToggleVisibility: (id: string, value: boolean) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  isUpdating: boolean;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  index,
  onToggleTemperature,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  isUpdating,
}) => {
  const itemCount = category.items?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.orderColumn}>
        <Text style={styles.orderText}>{index + 1}</Text>
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.nameText}>{category.name}</Text>
      </View>
      <View style={styles.itemsColumn}>
        <Text style={styles.itemCountText}>{itemCount}</Text>
      </View>
      <View style={styles.temperatureColumn}>
        <Switch
          value={category.asksTemperature}
          onValueChange={value => onToggleTemperature(category.id, value)}
          trackColor={{
            false: COLORS.surfaceContainerHighest,
            true: COLORS.primary,
          }}
          thumbColor={COLORS.onPrimary}
          disabled={isUpdating}
          accessibilityLabel={`Ask temperature for ${category.name}`}
          style={styles.switch}
        />
      </View>
      <View style={styles.visibilityColumn}>
        <Switch
          value={category.isVisibleInMenu}
          onValueChange={value => onToggleVisibility(category.id, value)}
          trackColor={{
            false: COLORS.surfaceContainerHighest,
            true: COLORS.primary,
          }}
          thumbColor={COLORS.onPrimary}
          disabled={isUpdating}
          accessibilityLabel={`Show ${category.name} in menu`}
          style={styles.switch}
        />
      </View>
      <View style={styles.actionsColumn}>
        <Pressable
          onPress={() => onMoveUp(category.id)}
          disabled={!canMoveUp || isUpdating}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Move ${category.name} up`}
          accessibilityState={{ disabled: !canMoveUp || isUpdating }}
          style={({ pressed }) => [
            styles.actionButton,
            (!canMoveUp || isUpdating) && styles.actionButtonDisabled,
            pressed && canMoveUp && styles.actionButtonPressed,
          ]}
        >
          <ChevronUp
            size={18}
            color={
              canMoveUp && !isUpdating ? COLORS.primary : COLORS.textDisabled
            }
            strokeWidth={2}
          />
        </Pressable>
        <Pressable
          onPress={() => onMoveDown(category.id)}
          disabled={!canMoveDown || isUpdating}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Move ${category.name} down`}
          accessibilityState={{ disabled: !canMoveDown || isUpdating }}
          style={({ pressed }) => [
            styles.actionButton,
            (!canMoveDown || isUpdating) && styles.actionButtonDisabled,
            pressed && canMoveDown && styles.actionButtonPressed,
          ]}
        >
          <ChevronDown
            size={18}
            color={
              canMoveDown && !isUpdating ? COLORS.primary : COLORS.textDisabled
            }
            strokeWidth={2}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    minHeight: 48,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.outlineVariant,
  },
  orderColumn: {
    width: 48,
  },
  orderText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  nameColumn: {
    flex: 2,
  },
  nameText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.text,
    fontWeight: '500',
  },
  itemsColumn: {
    width: 100,
    alignItems: 'center',
  },
  itemCountText: {
    ...TYPOGRAPHY.bodyMd,
    color: COLORS.textSecondary,
  },
  temperatureColumn: {
    width: 140,
    alignItems: 'center',
  },
  visibilityColumn: {
    width: 130,
    alignItems: 'center',
  },
  switch: {
    transform: [
      { scaleX: COMPONENT_SIZES.switch.scale },
      { scaleY: COMPONENT_SIZES.switch.scale },
    ],
  },
  actionsColumn: {
    width: 96,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    backgroundColor: COLORS.surface,
  },
  actionButtonDisabled: {
    opacity: 0.38,
  },
  actionButtonPressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: COLORS.hover,
  },
});
