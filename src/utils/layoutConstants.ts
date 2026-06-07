/**
 * Layout Constants & Grid Helpers
 * Extracted from Stitch HTML layouts for exact React Native conversion
 */

import { Dimensions } from 'react-native';

// ========================================
// SCREEN DIMENSIONS
// ========================================

export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

// ========================================
// RESPONSIVE BREAKPOINTS
// ========================================

export const BREAKPOINTS = {
  tabletSm: 1024,   // 10" tablets
  tabletMd: 1280,   // 10" tablets (higher res)
  tabletLg: 1920,   // 12" tablets (1920x1080)
  tabletXl: 2560,   // 13" tablets (2560x1600)
} as const;

export const getBreakpoint = (width: number) => {
  if (width >= BREAKPOINTS.tabletXl) return 'xl';
  if (width >= BREAKPOINTS.tabletLg) return 'lg';
  if (width >= BREAKPOINTS.tabletMd) return 'md';
  if (width >= BREAKPOINTS.tabletSm) return 'sm';
  return 'sm';
};

// ========================================
// NAVIGATION RAIL
// ========================================

export const NAV_RAIL = {
  widthCollapsed: 80,      // Icon-only mode (w-20)
  widthExpanded: 264,      // Full mode with labels (w-64)
  expandBreakpoint: 1024,  // md: breakpoint
} as const;

export const getNavRailWidth = (screenWidth: number) => {
  return screenWidth >= NAV_RAIL.expandBreakpoint 
    ? NAV_RAIL.widthExpanded 
    : NAV_RAIL.widthCollapsed;
};

// ========================================
// GRID SYSTEM
// ========================================

/**
 * Calculate grid item width for CSS Grid equivalent in React Native
 * @param columns Total number of columns (e.g., 3 for grid-cols-3)
 * @param gap Gap between items in dp
 * @param containerWidth Total container width
 * @param padding Container horizontal padding
 */
export const calculateGridItemWidth = (
  columns: number,
  gap: number,
  containerWidth: number,
  padding: number = 0
) => {
  const availableWidth = containerWidth - (padding * 2);
  const totalGapWidth = gap * (columns - 1);
  return (availableWidth - totalGapWidth) / columns;
};

/**
 * Calculate grid-cols-12 column span width (like col-span-7)
 * @param span Number of columns to span (1-12)
 * @param gap Gap between items
 * @param containerWidth Total container width
 * @param padding Container padding
 */
export const calculateColSpan = (
  span: number,
  gap: number,
  containerWidth: number,
  padding: number = 0
) => {
  const totalColumns = 12;
  const availableWidth = containerWidth - (padding * 2);
  const singleColumnWidth = availableWidth / totalColumns;
  const gapAdjustment = (gap * (span - 1)) / span;
  return (singleColumnWidth * span) - gapAdjustment;
};

// ========================================
// COMMON LAYOUT PATTERNS
// ========================================

/**
 * Dashboard metric cards layout (grid-cols-3 gap-6)
 */
export const DASHBOARD_LAYOUT = {
  metricCards: {
    columns: 3,
    gap: 24,
    padding: 32,
  },
  quickActions: {
    columns: 3,
    gap: 16,
    padding: 32,
  },
} as const;

/**
 * Payment method grid layout (grid-cols-3 gap-4)
 */
export const PAYMENT_LAYOUT = {
  methods: {
    columns: 3,
    gap: 16,
  },
  calculator: {
    columns: 3,
    gap: 12,
    buttonSize: 48,
  },
} as const;

/**
 * Tables grid layout (grid-cols-4 gap-6)
 */
export const TABLES_LAYOUT = {
  columns: 4,
  gap: 24,
  padding: 32,
} as const;

/**
 * Menu items grid (grid-cols-3 gap-4)
 */
export const MENU_LAYOUT = {
  columns: 3,
  gap: 16,
  padding: 32,
} as const;

// ========================================
// CONTENT AREA CALCULATIONS
// ========================================

/**
 * Get main content area dimensions (accounting for nav rail)
 */
export const getContentAreaDimensions = (screenWidth: number, screenHeight: number) => {
  const navWidth = getNavRailWidth(screenWidth);
  const contentWidth = screenWidth - navWidth;
  const contentHeight = screenHeight - 24; // Subtract status bar
  
  return {
    width: contentWidth,
    height: contentHeight,
    navWidth,
  };
};

/**
 * Get safe content padding for main area
 */
export const CONTENT_PADDING = {
  horizontal: 32,  // p-8 from Stitch
  vertical: 24,    // p-6 from Stitch
  top: 48,         // pt-12 from Stitch (includes status bar offset)
} as const;

// ========================================
// ASPECT RATIOS (for images/cards)
// ========================================

export const ASPECT_RATIOS = {
  square: 1,           // aspect-square (1:1)
  video: 16 / 9,       // aspect-video (16:9)
  portrait: 3 / 4,     // Common portrait ratio
  landscape: 4 / 3,    // Common landscape ratio
} as const;

// ========================================
// Z-INDEX LAYERS
// ========================================

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  navRail: 50,
  topAppBar: 30,
  statusBar: 100,
  tooltip: 60,
} as const;

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Calculate responsive font size based on screen width
 */
export const getResponsiveFontSize = (baseSize: number, screenWidth: number) => {
  const scale = screenWidth / 1920; // 1920 as baseline (Full HD tablet)
  return Math.round(baseSize * Math.max(0.8, Math.min(1.2, scale)));
};

/**
 * Calculate percentage-based width
 */
export const percentageWidth = (percentage: number, containerWidth: number) => {
  return (percentage / 100) * containerWidth;
};

/**
 * Calculate 12-column grid percentage
 */
export const colSpanPercentage = (span: number) => {
  return (span / 12) * 100;
};

// ========================================
// GRID HELPERS FOR FLEXBOX
// ========================================

/**
 * Get flex basis for grid columns (e.g., grid-cols-3)
 */
export const getFlexBasis = (columns: number, gap: number) => {
  const percentage = 100 / columns;
  const gapPercentage = ((gap * (columns - 1)) / columns) / 10; // Approximate
  return `${percentage - gapPercentage}%`;
};

/**
 * Calculate item dimensions for FlatList numColumns
 */
export const calculateFlatListItemSize = (
  screenWidth: number,
  columns: number,
  gap: number,
  padding: number
) => {
  return calculateGridItemWidth(columns, gap, screenWidth, padding);
};
