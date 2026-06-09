/**
 * Stitch design tokens for the Olmosq Coffee Staff Portal.
 * Source: live Stitch project olmosq-app (projects/8775055486295193436),
 * design system "Olmosq Coffee Staff Portal".
 */

export const COLORS = {
  // Surfaces - Soft mint palette
  surface: '#FFFFFF',
  surfaceDim: '#E6E2DF',
  surfaceBright: '#FFFFFF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F8F3F0',
  surfaceContainer: '#F2EDEA',
  surfaceContainerHigh: '#ECE7E4',
  surfaceContainerHighest: '#E6E2DF',
  surfaceVariant: '#E6E2DF',
  background: '#F5F9F0',
  onBackground: '#2D3426',
  onSurface: '#1C1B1A',
  onSurfaceVariant: '#44474E',
  inverseSurface: '#2D3426',
  inverseOnSurface: '#F5F9F0',
  outline: '#827471',
  outlineVariant: '#D4C3BF',
  surfaceTint: '#A7C472',

  // Primary - Fresh Sage Green
  primary: '#A7C472',
  primaryDark: '#8FB35E',
  primaryLight: '#BDD799',
  primaryContainer: '#A7C472',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#2D3426',
  inversePrimary: '#2D3426',

  // Secondary - Deep Sage
  secondary: '#8FB35E',
  secondaryContainer: 'rgba(167, 196, 114, 0.1)',
  secondaryDark: '#739949',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#739949',

  // Tertiary - Forest Green
  tertiary: '#739949',
  tertiaryContainer: 'rgba(115, 153, 73, 0.1)',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#2D3426',

  // Semantic colors
  success: '#739949',
  successContainer: '#E8F0DD',
  onSuccessContainer: '#2D3426',
  warning: '#FF9800',
  warningContainer: '#FFF3E0',
  onWarningContainer: '#653900',
  error: '#BA1A1A',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#93000A',
  info: '#A7C472',
  infoContainer: '#F1F5EC',

  // Status colors (order workflow)
  statusPending: '#FF9800',
  statusAccepted: '#A7C472',
  statusPreparing: '#A7C472',
  statusAwaitingPayment: '#FF9800',
  statusDone: '#739949',
  statusPaid: '#5F7C48',
  statusFailed: '#BA1A1A',
  statusCancelled: '#827471',

  // Text
  text: '#1C1B1A',
  textSecondary: '#504442',
  textDisabled: '#827471',
  border: '#D4C3BF',

  // Interactive states
  ripple: 'rgba(167, 196, 114, 0.12)',
  hover: 'rgba(167, 196, 114, 0.08)',
  pressed: 'rgba(167, 196, 114, 0.16)',
  focus: 'rgba(167, 196, 114, 0.28)',
  disabled: 'rgba(80, 68, 66, 0.38)',
  scrim: 'rgba(28, 27, 26, 0.4)',
  shadow: 'rgba(28, 27, 26, 0.16)',
  ambientShadow: 'rgba(28, 27, 26, 0.1)',
  glassBackground: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(167, 196, 114, 0.1)',
} as const;

export const FONT_FAMILY = 'Hanken Grotesk';

export const TYPOGRAPHY = {
  displayLg: {
    fontSize: 57,
    fontWeight: '400' as const,
    lineHeight: 64,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  headlineLg: {
    fontSize: 32,
    fontWeight: '600' as const,
    lineHeight: 40,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  headlineLgBold: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  headlineMd: {
    fontSize: 28,
    fontWeight: '500' as const,
    lineHeight: 36,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  headlineMdBold: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  titleLg: {
    fontSize: 22,
    fontWeight: '500' as const,
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  titleLgBold: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  titleMd: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  labelLg: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  labelLgBold: {
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  labelMd: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
  labelSm: {
    fontSize: 11,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: FONT_FAMILY,
  },
} as const;

export const SPACING = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  gutter: 24,
  marginMobile: 16,
  marginTablet: 32,
  marginDesktop: 48,
  touchTarget: 48,
  touchTargetLg: 56,
  navRailWidth: 80,
  navRailWidthExpanded: 264,
  statusBarHeight: 24,
  topAppBarHeight: 64,
  bottomBarHeight: 48,
  cardPadding: 24,
  cardPaddingLg: 32,
  iconCircleSm: 48,
  iconCircleMd: 56,
  iconCircleLg: 64,
  iconCircleXl: 80,
} as const;

export const BORDER_RADIUS = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 28,
  xxxl: 32,
  full: 9999,
} as const;

export const SHADOWS_IOS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  sm: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  md: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  lg: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  xl: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
  },
} as const;

export const ELEVATION = {
  none: 0,
  sm: 1,
  md: 3,
  lg: 6,
  xl: 10,
} as const;

export const COMPONENT_SIZES = {
  button: {
    sm: { height: 48, paddingHorizontal: 16 },
    md: { height: 48, paddingHorizontal: 24 },
    lg: { height: 56, paddingHorizontal: 32 },
  },
  card: {
    padding: 24,
    borderRadius: BORDER_RADIUS.md,
  },
  badge: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.full,
  },
  textField: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.md,
  },
  switch: {
    // Compact scaling for tablet landscape (better fit in tables)
    scale: 0.9,
  },
} as const;

export const ANIMATION = {
  fast: 150,
  normal: 220,
  slow: 320,
} as const;

export const BREAKPOINTS = {
  tabletSm: 768,
  tabletMd: 1024,
  tabletLg: 1280,
  tabletXl: 1920,
} as const;

export const getShadowStyle = (elevation: keyof typeof ELEVATION) => {
  return SHADOWS_IOS[elevation === 'none' ? 'none' : elevation];
};

export const getStatusColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return COLORS.statusPending;
    case 'ACCEPTED':
      return COLORS.statusAccepted;
    case 'PREPARING':
      return COLORS.statusPreparing;
    case 'AWAITING_PAYMENT':
      return COLORS.statusAwaitingPayment;
    case 'DONE':
      return COLORS.statusDone;
    case 'PAID_SYNCED_TO_LOYVERSE':
      return COLORS.statusPaid;
    case 'PAID_SYNCING':
      return COLORS.statusPreparing;
    case 'PAID_SYNC_FAILED':
      return COLORS.statusFailed;
    case 'CANCELLED':
      return COLORS.statusCancelled;
    default:
      return COLORS.textSecondary;
  }
};

export const getStatusLabel = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return 'Pending';
    case 'ACCEPTED':
      return 'Accepted';
    case 'PREPARING':
      return 'Preparing';
    case 'AWAITING_PAYMENT':
      return 'Awaiting Payment';
    case 'DONE':
      return 'Done';
    case 'PAID_SYNCING':
      return 'Processing Payment';
    case 'PAID_SYNCED_TO_LOYVERSE':
      return 'Paid';
    case 'PAID_SYNC_FAILED':
      return 'Payment Error';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return status;
  }
};
