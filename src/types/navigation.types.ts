/**
 * Navigation types for React Navigation
 */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

// Drawer (7 main tabs)
export type DrawerParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Shift: undefined;
  Tables: undefined;
  MenuManagement: undefined;
  ShiftReports: undefined;
  CashDrawer: undefined;
};

// Stack for detail/modal screens and drawer wrapper
export type MainStackParamList = {
  MainDrawer: undefined;
  OrderDetail: { orderId: string };
  Payment: { orderId: string };
  ShiftReportDetail: { shiftId: string };
  MenuSettings: undefined;
};

// Root Stack (combines Auth, Drawer, and Detail Stack)
export type RootStackParamList = AuthStackParamList & DrawerParamList & MainStackParamList;

// Composite screen props that allow navigation to any screen
export type DashboardScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Dashboard'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type OrdersScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Orders'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type ShiftScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Shift'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type TablesScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Tables'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type MenuManagementScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'MenuManagement'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type ShiftReportsScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'ShiftReports'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type CashDrawerScreenProps = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'CashDrawer'>,
  NativeStackScreenProps<MainStackParamList>
>;

export type OrderDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'OrderDetail'>,
  DrawerScreenProps<DrawerParamList>
>;

export type PaymentScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'Payment'>,
  DrawerScreenProps<DrawerParamList>
>;

export type ShiftReportDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'ShiftReportDetail'>,
  DrawerScreenProps<DrawerParamList>
>;

export type MenuSettingsScreenProps = NativeStackScreenProps<MainStackParamList, 'MenuSettings'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
