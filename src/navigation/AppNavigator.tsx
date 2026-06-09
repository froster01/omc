/**
 * App Navigator - Main navigation setup with toggleable back drawer
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../utils/constants';
import { CustomDrawerContent } from '../components/layout/CustomDrawerContent';
import { CustomHeader } from '../components/layout/CustomHeader';

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

import type {
  AuthStackParamList,
  DrawerParamList,
  MainStackParamList,
} from '../types/navigation.types';

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<MainStackParamList & DrawerParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const drawerContent = (props: any) => <CustomDrawerContent {...props} />;

const customHeader = ({ route }: { route: { name: string } }) => <CustomHeader title={route.name} />;

const DRAWER_SCREENS: { name: keyof DrawerParamList; component: React.FC<any> }[] = [
  { name: 'Dashboard', component: DashboardScreen },
  { name: 'Orders', component: OrdersScreen },
  { name: 'Shift', component: ShiftScreen },
  { name: 'Tables', component: TablesScreen },
  { name: 'MenuSync', component: MenuSyncScreen },
  { name: 'ShiftReports', component: ShiftReportsScreen },
  { name: 'CashDrawer', component: CashDrawerScreen },
];

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      screenOptions={{
        drawerType: 'back',
        drawerStyle: {
          width: 200,
        },
        headerShown: true,
        header: customHeader,
      }}>
      {DRAWER_SCREENS.map(({ name, component }) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
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
      <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{ headerShown: false }}
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
        name="ShiftReportDetail"
        component={ShiftReportDetailScreen}
        options={{ title: 'Shift Report' }}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </AuthStack.Navigator>
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
};
