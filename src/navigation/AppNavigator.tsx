/**
 * App Navigator - Main navigation setup
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../utils/constants';

// Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { OrdersScreen } from '../screens/orders/OrdersScreen';
import { OrderDetailScreen } from '../screens/orders/OrderDetailScreen';
import { PaymentScreen } from '../screens/orders/PaymentScreen';
import { ShiftScreen } from '../screens/shifts/ShiftScreen';
import { ShiftReportsScreen } from '../screens/shifts/ShiftReportsScreen';
import { ShiftReportDetailScreen } from '../screens/shifts/ShiftReportDetailScreen';
import { MenuSyncScreen } from '../screens/menu/MenuSyncScreen';
import { TablesScreen } from '../screens/tables/TablesScreen';
import { CashDrawerScreen } from '../screens/shifts/CashDrawerScreen';

import type { RootStackParamList } from '../types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading, checkAuth, logout } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {!isAuthenticated ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={({ navigation }) => ({
                title: 'Staff Dashboard',
                headerRight: () => (
                  <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Orders"
              component={OrdersScreen}
              options={{ title: 'Orders' }}
            />
            <Stack.Screen
              name="OrderDetail"
              component={OrderDetailScreen}
              options={{ title: 'Order Detail' }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: 'Record Payment' }}
            />
            <Stack.Screen
              name="Shift"
              component={ShiftScreen}
              options={{ title: 'Shift Management' }}
            />
            <Stack.Screen
              name="ShiftReports"
              component={ShiftReportsScreen}
              options={{ title: 'Shift Reports' }}
            />
            <Stack.Screen
              name="ShiftReportDetail"
              component={ShiftReportDetailScreen}
              options={{ title: 'Shift Report' }}
            />
            <Stack.Screen
              name="MenuSync"
              component={MenuSyncScreen}
              options={{ title: 'Menu Sync' }}
            />
            <Stack.Screen
              name="Tables"
              component={TablesScreen}
              options={{ title: 'Tables' }}
            />
            <Stack.Screen
              name="CashDrawer"
              component={CashDrawerScreen}
              options={{ title: 'Cash Drawer' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
