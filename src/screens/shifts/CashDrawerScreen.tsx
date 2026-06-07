/**
 * Cash Drawer Screen (placeholder)
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/constants';

export const CashDrawerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cash Drawer Management</Text>
      <Text style={styles.subtext}>Coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtext: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});
