/**
 * Formatting utilities for currency, dates, etc.
 */
import { format, formatDistance } from 'date-fns';

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
  const colorMap: Record<string, string> = {
    PENDING: '#FF9500',
    ACCEPTED: '#007AFF',
    PREPARING: '#5856D6',
    AWAITING_PAYMENT: '#FF9500',
    PAID_SYNCING: '#007AFF',
    PAID_SYNCED_TO_LOYVERSE: '#34C759',
    PAID_SYNC_FAILED: '#FF3B30',
    DONE: '#34C759',
    CANCELLED: '#8E8E93',
  };
  return colorMap[status] || '#8E8E93';
};
