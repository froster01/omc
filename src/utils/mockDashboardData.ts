/**
 * Mock dashboard data utilities
 * Provides sales chart data, top selling items, and recent orders
 */

export interface SalesDataPoint {
  hour: string;
  amount: number;
}

export interface TopSellingItem {
  id: string;
  name: string;
  soldCount: number;
  icon: string;
  color: string;
}

export interface RecentOrder {
  orderNumber: string;
  customerName: string;
  status: string;
  amount: number;
}

// Sales data for the line chart (24 hours)
export const getMockSalesData = (): SalesDataPoint[] => {
  return [
    { hour: '12 AM', amount: 0 },
    { hour: '1 AM', amount: 0 },
    { hour: '2 AM', amount: 0 },
    { hour: '3 AM', amount: 0 },
    { hour: '4 AM', amount: 0 },
    { hour: '5 AM', amount: 0 },
    { hour: '6 AM', amount: 45 },
    { hour: '7 AM', amount: 120 },
    { hour: '8 AM', amount: 180 },
    { hour: '9 AM', amount: 230 },
    { hour: '10 AM', amount: 280 },
    { hour: '11 AM', amount: 320 },
    { hour: '12 PM', amount: 450 },
    { hour: '1 PM', amount: 580 },
    { hour: '2 PM', amount: 720 },
    { hour: '3 PM', amount: 850 },
    { hour: '4 PM', amount: 980 },
    { hour: '5 PM', amount: 1100 },
    { hour: '6 PM', amount: 1200 },
    { hour: '7 PM', amount: 1248.75 },
    { hour: '8 PM', amount: 1248.75 },
    { hour: '9 PM', amount: 1248.75 },
    { hour: '10 PM', amount: 1248.75 },
    { hour: '11 PM', amount: 1248.75 },
  ];
};

// Top 5 selling items
export const getMockTopSellingItems = (): TopSellingItem[] => {
  return [
    {
      id: '1',
      name: 'Cappuccino',
      soldCount: 56,
      icon: 'coffee',
      color: '#A7723E',
    },
    {
      id: '2',
      name: 'Iced Latte',
      soldCount: 42,
      icon: 'coffee-to-go',
      color: '#C99A6B',
    },
    {
      id: '3',
      name: 'Caramel Macchiato',
      soldCount: 31,
      icon: 'coffee-outline',
      color: '#B5834F',
    },
    {
      id: '4',
      name: 'Brewed Coffee',
      soldCount: 28,
      icon: 'coffee-maker',
      color: '#6F4E37',
    },
    {
      id: '5',
      name: 'Matcha Latte',
      soldCount: 19,
      icon: 'leaf',
      color: '#739949',
    },
  ];
};

// Recent orders (last 4)
export const getMockRecentOrders = (): RecentOrder[] => {
  return [
    {
      orderNumber: '#1024',
      customerName: 'Sarah Johnson',
      status: 'PREPARING',
      amount: 12.50,
    },
    {
      orderNumber: '#1023',
      customerName: 'Mike Chen',
      status: 'AWAITING_PAYMENT',
      amount: 8.75,
    },
    {
      orderNumber: '#1022',
      customerName: 'Emily Davis',
      status: 'DONE',
      amount: 15.25,
    },
    {
      orderNumber: '#1021',
      customerName: 'James Wilson',
      status: 'PAID_SYNCED_TO_LOYVERSE',
      amount: 10.00,
    },
  ];
};

// Calculate total sales from data points
export const calculateTotalSales = (data: SalesDataPoint[]): number => {
  return data[data.length - 1]?.amount || 0;
};
