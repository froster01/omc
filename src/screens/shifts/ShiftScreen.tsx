/**
 * Shift Management Screen
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
import { useShift } from '../../hooks/useShift';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { COLORS, SPACING, BORDER_RADIUS } from '../../utils/constants';
import type { ShiftScreenProps } from '../../types/navigation.types';

export const ShiftScreen: React.FC<ShiftScreenProps> = () => {
  const {
    currentShift,
    isLoading,
    openShift,
    closeShift,
    isOpeningShift,
    isClosingShift,
  } = useShift();

  const [startingCash, setStartingCash] = useState('');
  const [actualCash, setActualCash] = useState('');
  const [closingNote, setClosingNote] = useState('');

  if (isLoading) {
    return <LoadingSpinner message="Loading shift..." />;
  }

  const handleOpenShift = () => {
    const amount = parseFloat(startingCash);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Please enter a valid starting cash amount');
      return;
    }

    Alert.alert('Open Shift', `Open new shift with ${formatCurrency(amount)}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open',
        onPress: () => {
          openShift({ startingCash: amount });
          setStartingCash('');
        },
      },
    ]);
  };

  const handleCloseShift = () => {
    const amount = parseFloat(actualCash);
    if (isNaN(amount) || amount < 0) {
      Alert.alert('Error', 'Please enter the actual cash amount');
      return;
    }

    Alert.alert(
      'Close Shift',
      'Are you sure you want to close this shift?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close',
          style: 'destructive',
          onPress: () => {
            closeShift({
              actualCash: amount,
              note: closingNote.trim() || undefined,
            });
            setActualCash('');
            setClosingNote('');
          },
        },
      ]
    );
  };

  if (!currentShift) {
    // No active shift - show open shift form
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.title}>Open New Shift</Text>
          <Text style={styles.description}>
            Enter the starting cash amount in the drawer
          </Text>

          <Text style={styles.label}>Starting Cash</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor={COLORS.textSecondary}
            value={startingCash}
            onChangeText={setStartingCash}
            keyboardType="numeric"
          />

          <Button
            title="Open Shift"
            onPress={handleOpenShift}
            loading={isOpeningShift}
            size="large"
            style={styles.button}
          />
        </Card>
      </ScrollView>
    );
  }

  // Active shift - show shift info and close option
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Current Shift Info */}
      <Card style={styles.card}>
        <Text style={styles.title}>Current Shift</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Shift Number</Text>
          <Text style={styles.infoValue}>#{currentShift.shiftNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Opened At</Text>
          <Text style={styles.infoValue}>{formatDate(currentShift.openedAt)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Starting Cash</Text>
          <Text style={styles.infoValue}>
            {formatCurrency(currentShift.startingCash)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Next Order Number</Text>
          <Text style={styles.infoValue}>{currentShift.nextOrderNumber}</Text>
        </View>
      </Card>

      {/* Close Shift Form */}
      <Card style={styles.card}>
        <Text style={styles.title}>Close Shift</Text>
        <Text style={styles.description}>
          Count the cash in the drawer and enter the amount
        </Text>

        <Text style={styles.label}>Actual Cash</Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor={COLORS.textSecondary}
          value={actualCash}
          onChangeText={setActualCash}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Closing Note (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any notes about the shift..."
          placeholderTextColor={COLORS.textSecondary}
          value={closingNote}
          onChangeText={setClosingNote}
          multiline
          numberOfLines={4}
        />

        <Button
          title="Close Shift"
          onPress={handleCloseShift}
          loading={isClosingShift}
          variant="danger"
          size="large"
          style={styles.button}
        />
      </Card>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: SPACING.sm,
  },
});
