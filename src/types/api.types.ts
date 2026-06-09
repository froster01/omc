/**
 * API request and response types
 * These should match the backend API contract
 */

// Authentication
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  username: string;
  displayName: string | null;
}

// Order Types
export type OrderStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'AWAITING_PAYMENT'
  | 'PAID_SYNCING'
  | 'PAID_SYNCED_TO_LOYVERSE'
  | 'PAID_SYNC_FAILED'
  | 'DONE'
  | 'CANCELLED';

export type CustomerPaymentMethod = 'COUNTER' | 'ONLINE';

export interface OrderItem {
  id: string;
  itemId: string;
  variantId: string | null;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  notes: string | null;
  item: {
    name: string;
    imageUrl: string | null;
  };
  variant: {
    name: string;
  } | null;
  modifiers: Array<{
    id: string;
    name: string;
    priceAdjustment: string;
  }>;
}

export interface Order {
  id: string;
  orderNumber: number;
  shiftOrderNumber: number | null;
  tableCode: string;
  customerName: string;
  status: OrderStatus;
  subtotal: string;
  tax: string;
  total: string;
  customerPaymentMethod: CustomerPaymentMethod;
  paymentTypeId: string | null;
  paidAt: string | null;
  cashReceived: string | null;
  cashChange: string | null;
  loyverseReceiptNumber: string | null;
  loyverseSyncError: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  table: {
    code: string;
    number: number;
    name: string | null;
  };
  paymentType: {
    id: string;
    name: string;
    type: string;
  } | null;
}

export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}

export interface RecordPaymentRequest {
  paymentTypeId: string;
  cashReceived?: number;
}

// Shift Types
export type ShiftStatus = 'OPEN' | 'CLOSED';

export interface Shift {
  id: string;
  shiftNumber: number;
  status: ShiftStatus;
  openedAt: string;
  closedAt: string | null;
  nextOrderNumber: number;
  startingCash: string;
  actualCash: string | null;
  cashVariance: string | null;
  closedNote: string | null;
  createdAt: string;
  updatedAt: string;
  orders?: Order[];
  cashMovements?: CashMovement[];
}

export interface OpenShiftRequest {
  startingCash: number;
}

export interface CloseShiftRequest {
  actualCash: number;
  note?: string;
}

// Cash Movement
export type CashMovementType = 'CASH_IN' | 'CASH_OUT';

export interface CashMovement {
  id: string;
  shiftId: string;
  type: CashMovementType;
  amount: string;
  note: string | null;
  createdAt: string;
}

export interface CreateCashMovementRequest {
  type: CashMovementType;
  amount: number;
  note?: string;
}

// Payment Types
export interface PaymentType {
  id: string;
  loyverseId: string;
  name: string;
  type: string;
  isActive: boolean;
}

// Category
export interface Category {
  id: string;
  loyverseId: string;
  name: string;
  imageUrl: string | null;
  sortOrder: number;
  asksTemperature: boolean;
  isVisibleInMenu: boolean;
}

export interface UpdateCategoryRequest {
  asksTemperature?: boolean;
  isVisibleInMenu?: boolean;
}

// Table
export interface Table {
  code: string;
  number: number;
  name: string | null;
  isActive: boolean;
  qrCode?: string;  // base64 data URL from backend
  url?: string;     // customer-facing table URL
}

export interface GenerateTablesRequest {
  count: number;
}

// API Response Wrappers
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
}
