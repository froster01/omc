/**
 * API Configuration
 * 
 * Central configuration for backend API connection
 */

// Development machine IP - tablet needs this instead of localhost
const DEV_API_URL = 'http://192.168.0.73:3001/api';
const PROD_API_URL = 'https://api.olmosq.com/api'; // Replace with actual production URL

export const API_CONFIG = {
  baseURL: __DEV__ ? DEV_API_URL : PROD_API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  // Orders
  orders: {
    list: '/orders',
    detail: (id: string) => `/orders/${id}`,
    create: '/orders',
    update: (id: string) => `/orders/${id}`,
    updateStatus: (id: string) => `/orders/${id}/status`,
  },
  // Tables
  tables: {
    list: '/tables',
    detail: (id: string) => `/tables/${id}`,
    updateStatus: (id: string) => `/tables/${id}/status`,
  },
  // Menu
  menu: {
    sync: '/menu/sync',
    items: '/menu/items',
  },
  // Shift
  shift: {
    current: '/shift/current',
    start: '/shift/start',
    end: '/shift/end',
    reports: '/shift/reports',
    reportDetail: (id: string) => `/shift/reports/${id}`,
  },
  // Cash Drawer
  cashDrawer: {
    open: '/cash-drawer/open',
    close: '/cash-drawer/close',
    addCash: '/cash-drawer/add',
    removeCash: '/cash-drawer/remove',
    balance: '/cash-drawer/balance',
  },
  // Payments
  payments: {
    process: '/payments/process',
    history: '/payments/history',
  },
  // Dashboard
  dashboard: {
    metrics: '/dashboard/metrics',
  },
};
