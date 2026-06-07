/**
 * Navigation types for React Navigation
 */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

// Main Stack
export type MainStackParamList = {
  Dashboard: undefined;
  Orders: undefined;
  OrderDetail: { orderId: string };
  Payment: { orderId: string };
  Shift: undefined;
  ShiftReports: undefined;
  ShiftReportDetail: { shiftId: string };
  MenuSync: undefined;
  MenuSettings: undefined;
  Tables: undefined;
  CashDrawer: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<MainStackParamList, 'Dashboard'>;
export type OrdersScreenProps = NativeStackScreenProps<MainStackParamList, 'Orders'>;
export type OrderDetailScreenProps = NativeStackScreenProps<MainStackParamList, 'OrderDetail'>;
export type PaymentScreenProps = NativeStackScreenProps<MainStackParamList, 'Payment'>;
export type ShiftScreenProps = NativeStackScreenProps<MainStackParamList, 'Shift'>;
export type ShiftReportsScreenProps = NativeStackScreenProps<MainStackParamList, 'ShiftReports'>;
export type ShiftReportDetailScreenProps = NativeStackScreenProps<MainStackParamList, 'ShiftReportDetail'>;
export type MenuSyncScreenProps = NativeStackScreenProps<MainStackParamList, 'MenuSync'>;
export type MenuSettingsScreenProps = NativeStackScreenProps<MainStackParamList, 'MenuSettings'>;
export type TablesScreenProps = NativeStackScreenProps<MainStackParamList, 'Tables'>;
export type CashDrawerScreenProps = NativeStackScreenProps<MainStackParamList, 'CashDrawer'>;

// Root Stack (combines Auth and Main)
export type RootStackParamList = AuthStackParamList & MainStackParamList;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
