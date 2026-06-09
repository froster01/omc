/**
 * SyncCard - Loyverse sync controls with status metadata
 */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CheckCircle2,
  CreditCard,
  RefreshCw,
  RotateCcw,
} from 'lucide-react-native';
import { Card } from '../common/Card';
import {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '../../utils/designTokens';

interface SyncCardProps {
  onSyncMenu: () => void;
  onSyncPayments: () => void;
  onResetMenu: () => void;
  onResetPayments: () => void;
  isSyncingMenu: boolean;
  isSyncingPayments: boolean;
  isResettingMenu: boolean;
  isResettingPayments: boolean;
  lastMenuSyncedLabel: string | null;
}

type SyncActionButtonProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'outline';
};

const SyncActionButton: React.FC<SyncActionButtonProps> = ({
  title,
  icon,
  onPress,
  loading = false,
  variant = 'outline',
}) => {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: loading, busy: loading }}
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.actionButton,
        isPrimary ? styles.actionButtonPrimary : styles.actionButtonOutline,
        pressed && !loading && styles.actionButtonPressed,
        loading && styles.actionButtonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={isPrimary ? COLORS.onPrimary : COLORS.primary}
          size="small"
        />
      ) : (
        icon
      )}
      <Text style={[styles.actionText, isPrimary && styles.actionTextPrimary]}>
        {title}
      </Text>
    </Pressable>
  );
};

export const SyncCard: React.FC<SyncCardProps> = ({
  onSyncMenu,
  onSyncPayments,
  onResetMenu,
  onResetPayments,
  isSyncingMenu,
  isSyncingPayments,
  isResettingMenu,
  isResettingPayments,
  lastMenuSyncedLabel,
}) => {
  return (
    <Card variant="outlined" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.iconWrapper}>
            <RefreshCw size={20} color={COLORS.secondaryDark} strokeWidth={2} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Loyverse Sync</Text>
            <Text style={styles.subtitle}>
              Refresh menu, variants, modifiers, and payment types from POS.
            </Text>
          </View>
        </View>
        {lastMenuSyncedLabel && (
          <View style={styles.syncedStatus}>
            <Text style={styles.syncedText}>{lastMenuSyncedLabel}</Text>
            <CheckCircle2
              size={16}
              color={COLORS.secondaryDark}
              strokeWidth={2}
            />
          </View>
        )}
      </View>

      <View style={styles.actionsRow}>
        <SyncActionButton
          title="Sync Menu"
          onPress={onSyncMenu}
          loading={isSyncingMenu}
          variant="primary"
          icon={
            <RefreshCw size={16} color={COLORS.onPrimary} strokeWidth={2} />
          }
        />
        <SyncActionButton
          title="Payments"
          onPress={onSyncPayments}
          loading={isSyncingPayments}
          icon={
            <CreditCard
              size={16}
              color={COLORS.textSecondary}
              strokeWidth={2}
            />
          }
        />
        <SyncActionButton
          title="Reset Menu"
          onPress={onResetMenu}
          loading={isResettingMenu}
          icon={
            <RotateCcw size={16} color={COLORS.textSecondary} strokeWidth={2} />
          }
        />
        <SyncActionButton
          title="Reset Payments"
          onPress={onResetPayments}
          loading={isResettingPayments}
          icon={
            <CreditCard
              size={16}
              color={COLORS.textSecondary}
              strokeWidth={2}
            />
          }
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.titleMd,
    color: COLORS.text,
    fontWeight: '700',
  },
  subtitle: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.textSecondary,
    marginTop: SPACING.xxs,
  },
  syncedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    minHeight: 40,
  },
  syncedText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.secondaryDark,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.secondaryDark,
    borderColor: COLORS.secondaryDark,
  },
  actionButtonOutline: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.outlineVariant,
  },
  actionButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  actionButtonDisabled: {
    opacity: 0.6,
  },
  actionText: {
    ...TYPOGRAPHY.labelMd,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  actionTextPrimary: {
    color: COLORS.onPrimary,
  },
});
