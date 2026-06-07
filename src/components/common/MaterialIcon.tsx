/**
 * MaterialIcon - Wrapper for react-native-vector-icons
 * Maps Material Symbols names from Stitch to MaterialCommunityIcons
 */

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../utils/designTokens';

// Map Material Symbols (from Stitch) to MaterialCommunityIcons names
const ICON_MAP: Record<string, string> = {
  // Navigation
  'receipt_long': 'receipt-text',
  'timer': 'clock-outline',
  'menu_book': 'book-open-outline',
  'table_restaurant': 'table-furniture',
  'analytics': 'chart-bar',
  'chart-bar': 'chart-bar',
  'settings': 'cog-outline',
  'cog': 'cog',
  'dashboard': 'view-dashboard',
  'notifications': 'bell-outline',
  'account_circle': 'account-circle',
  'arrow_back': 'arrow-left',
  'sync': 'sync',
  
  // Order Management
  'shopping_bag': 'shopping',
  'shopping_cart': 'cart-outline',
  'cart': 'cart',
  'coffee_maker': 'coffee-maker',
  'coffee': 'coffee',
  'check_circle': 'check-circle',
  'check-circle': 'check-circle',
  'schedule': 'clock-outline',
  'clock-outline': 'clock-outline',
  
  // Status
  'pending': 'clock-alert-outline',
  'preparing': 'progress-clock',
  'done': 'check-circle',
  'cancel': 'close-circle-outline',
  
  // Actions
  'add': 'plus',
  'edit': 'pencil',
  'delete': 'delete-outline',
  'print': 'printer',
  'download': 'download',
  'upload': 'upload',
  'search': 'magnify',
  'filter': 'filter-outline',
  
  // Payment
  'payments': 'cash-multiple',
  'credit_card': 'credit-card',
  'wallet': 'wallet',
  'currency_exchange': 'swap-horizontal',
  
  // User
  'person': 'account',
  'account': 'account',
  'badge': 'badge-account',
  'lock': 'lock-outline',
  'login': 'login',
  'logout': 'logout',
  'visibility': 'eye-outline',
  'visibility_off': 'eye-off-outline',
  'fingerprint': 'fingerprint',
  
  // System
  'wifi': 'wifi',
  'signal_cellular_4_bar': 'signal-cellular-3',
  'battery_full': 'battery',
  'verified_user': 'shield-check',
  
  // QR & Tables
  'qr_code': 'qrcode',
  'grid_view': 'view-grid',
  
  // Misc
  'more_vert': 'dots-vertical',
  'more_horiz': 'dots-horizontal',
  'close': 'close',
  'check': 'check',
  'info': 'information-outline',
  'warning': 'alert-outline',
  'error': 'alert-circle-outline',
  'help': 'help-circle-outline',
  'inventory_2': 'package-variant',
  'calendar_month': 'calendar',
};

interface MaterialIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
  filled?: boolean; // Use filled variant (some icons support this)
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 24,
  color = COLORS.text,
  style,
  filled = false,
}) => {
  // Map Stitch icon name to MaterialCommunityIcons name
  let iconName = ICON_MAP[name] || name;
  
  // Handle filled variants by removing -outline suffix
  if (filled && iconName.endsWith('-outline')) {
    iconName = iconName.replace('-outline', '');
  }

  return <Icon name={iconName} size={size} color={color} style={style} />;
};

// Export commonly used icon sets
export const NAV_ICONS = {
  dashboard: 'view-dashboard',
  orders: 'receipt-text',
  shift: 'clock-outline',
  menu: 'book-open-outline',
  tables: 'table-furniture',
  reports: 'chart-bar',
  settings: 'cog-outline',
} as const;

export const ORDER_ICONS = {
  pending: 'clock-alert-outline',
  preparing: 'coffee-maker',
  done: 'check-circle',
  cancelled: 'close-circle-outline',
} as const;

export const PAYMENT_ICONS = {
  cash: 'cash-multiple',
  card: 'credit-card',
  wallet: 'wallet',
  qr: 'qrcode',
} as const;
