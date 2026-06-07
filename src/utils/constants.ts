/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  // For Android Emulator, use 10.0.2.2 to reach host machine
  // For physical device, use your computer's IP address
  // Change this based on your setup:
  // - Emulator: 10.0.2.2
  // - Physical device on same WiFi: 192.168.0.73
  BASE_URL: __DEV__
    ? 'http://192.168.0.73:3001/api'
    : 'https://your-production-url.com/api',
  TIMEOUT: 10000,
  WS_URL: __DEV__
    ? 'ws://192.168.0.73:3001'
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

// UI constants are sourced from the live Stitch design system.
export {
  BORDER_RADIUS,
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from './designTokens';
