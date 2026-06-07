/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  // For Android Emulator, use 10.0.2.2 to reach host machine
  // For physical device, use your computer's IP address (e.g., 192.168.1.100)
  BASE_URL: __DEV__
    ? 'http://10.0.2.2:3000/api'
    : 'https://your-production-url.com/api',
  TIMEOUT: 10000,
  WS_URL: __DEV__
    ? 'ws://10.0.2.2:3000'
    : 'wss://your-production-url.com',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'staff_token',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  PREPARING: 'PREPARING',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  PAID_SYNCING: 'PAID_SYNCING',
  PAID_SYNCED_TO_LOYVERSE: 'PAID_SYNCED_TO_LOYVERSE',
  PAID_SYNC_FAILED: 'PAID_SYNC_FAILED',
  DONE: 'DONE',
  CANCELLED: 'CANCELLED',
} as const;

// Shift Status
export const SHIFT_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
} as const;

// Cash Movement Types
export const CASH_MOVEMENT_TYPE = {
  CASH_IN: 'CASH_IN',
  CASH_OUT: 'CASH_OUT',
} as const;

// UI Constants
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;
