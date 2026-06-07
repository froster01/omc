/**
 * Menu Sync Screen
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { loyverseApi } from '../../api/loyverse.api';
import { COLORS, SPACING } from '../../utils/constants';

export const MenuSyncScreen = () => {
  const [isSyncingMenu, setIsSyncingMenu] = useState(false);
  const [isSyncingPayments, setIsSyncingPayments] = useState(false);

  const handleSyncMenu = async () => {
    setIsSyncingMenu(true);
    try {
      const result = await loyverseApi.syncMenu();
      Alert.alert('Success', result.message || 'Menu synced successfully');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to sync menu');
    } finally {
      setIsSyncingMenu(false);
    }
  };

  const handleSyncPayments = async () => {
    setIsSyncingPayments(true);
    try {
      const result = await loyverseApi.syncPaymentTypes();
      Alert.alert('Success', result.message || 'Payment types synced successfully');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to sync payment types');
    } finally {
      setIsSyncingPayments(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={styles.title}>Menu Sync</Text>
        <Text style={styles.description}>
          Sync menu items and categories from Loyverse POS
        </Text>
        <Button
          title="Sync Menu"
          onPress={handleSyncMenu}
          loading={isSyncingMenu}
          size="large"
        />
      </Card>

      <Card style={styles.card}>
        <Text style={styles.title}>Payment Types</Text>
        <Text style={styles.description}>
          Sync payment types from Loyverse POS
        </Text>
        <Button
          title="Sync Payment Types"
          onPress={handleSyncPayments}
          loading={isSyncingPayments}
          size="large"
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
});
