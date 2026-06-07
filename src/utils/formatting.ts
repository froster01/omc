/**
 * Formatting utilities for currency, dates, etc.
 */
import { format, formatDistance } from 'date-fns';
import { COLORS, getStatusColor as getTokenStatusColor } from './designTokens';

/**
 * Format number as currency
 */
export const formatCurrency = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd MMM yyyy, HH:mm');
};

/**
 * Format date to short format
 */
export const formatDateShort = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'dd/MM/yyyy');
};

/**
 * Format date to time only
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'HH:mm');
};

/**
 * Format relative time (e.g., "5 minutes ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(d, new Date(), { addSuffix: true });
};

/**
 * Format order status to readable text
 */
export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    PREPARING: 'Preparing',
    AWAITING_PAYMENT: 'Awaiting Payment',
    PAID_SYNCING: 'Payment Processing',
    PAID_SYNCED_TO_LOYVERSE: 'Paid',
    PAID_SYNC_FAILED: 'Payment Sync Failed',
    DONE: 'Done',
    CANCELLED: 'Cancelled',
  };
  return statusMap[status] || status;
};

/**
 * Get status color based on order status
 */
export const getStatusColor = (status: string): string => {
  return getTokenStatusColor(status) || COLORS.textSecondary;
};
