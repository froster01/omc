# Olmosq Coffee Staff Portal - Design System

**Source:** Stitch AI-generated designs (Fresh Sage Green brand)  
**Platform:** React Native Android tablet, landscape orientation  
**Last updated:** June 7, 2026

---

## Color System

### Brand Colors (Sage Green Palette)

```typescript
// Primary - Fresh Sage Green
primary: '#A7C472'           // Main brand color, primary actions, active states
primaryDark: '#8FB35E'       // Hover states, emphasis
accent: '#739949'            // Forest green, success states, tertiary actions

// Backgrounds
background: '#F5F9F0'        // Soft mint, main app background
surface: '#FFFFFF'           // White, card surfaces
surfaceContainerLow: '#F8F3F0'
surfaceContainer: '#F2EDEA'
surfaceContainerHigh: '#ECE7E4'

// Text
onBackground: '#2D3426'      // Dark text on mint background
onSurface: '#1C1B1A'         // Dark text on white cards
onSurfaceVariant: '#44474E'  // Secondary text
textSecondary: '#504442'     // Muted text
textDisabled: '#827471'      // Disabled state

// Status Colors
statusPending: '#FF9800'     // Orange - awaiting action
statusPreparing: '#A7C472'   // Sage - in progress
statusDone: '#739949'        // Forest - completed
statusPaid: '#5F7C48'        // Deep green - payment confirmed
statusFailed: '#BA1A1A'      // Red - error/failed
statusCancelled: '#827471'   // Gray - cancelled

// Interactive States
onPrimary: '#FFFFFF'         // White text on sage buttons
ripple: 'rgba(167, 196, 114, 0.12)'
hover: 'rgba(167, 196, 114, 0.08)'
pressed: 'rgba(167, 196, 114, 0.16)'
focus: 'rgba(167, 196, 114, 0.28)'

// Utility
border: '#D4C3BF'
outline: '#827471'
outlineVariant: '#D4C3BF'
shadow: 'rgba(28, 27, 26, 0.16)'
scrim: 'rgba(28, 27, 26, 0.4)'
```

### Color Strategy

**Restrained with committed accent:** Sage green carries 20-30% of interface (navigation, primary buttons, active states, success indicators). Background is soft mint for brand consistency. Cards are white for content clarity.

**Status color-coding:**
- Orange: requires immediate attention (pending orders, payment due)
- Sage: active work (preparing orders, open shift)
- Forest: completed successfully (done, paid)
- Red: errors or failures
- Gray: cancelled or inactive

**Not used:**
- Gradient backgrounds (solid colors only)
- Gradient text (banned)
- Side-stripe borders (banned - use full borders or background tints)
- Pure black (#000) or pure white (#fff) - all neutrals tinted toward sage

---

## Typography

**Font family:** Hanken Grotesk (sans-serif, modern, highly legible)

### Type Scale

```typescript
displayLg: {
  fontSize: 57,      // Order numbers (#0042)
  fontWeight: '400',
  lineHeight: 64,
  letterSpacing: 0,
}

headlineLg: {
  fontSize: 32,      // Page titles
  fontWeight: '600',
  lineHeight: 40,
  letterSpacing: 0,
}

headlineMd: {
  fontSize: 28,      // Section headings
  fontWeight: '500',
  lineHeight: 36,
  letterSpacing: 0,
}

titleLg: {
  fontSize: 22,      // Card titles
  fontWeight: '500',
  lineHeight: 28,
  letterSpacing: 0,
}

titleMd: {
  fontSize: 16,      // Button labels, list items
  fontWeight: '600',
  lineHeight: 24,
  letterSpacing: 0,
}

bodyLg: {
  fontSize: 16,      // Primary body text
  fontWeight: '400',
  lineHeight: 24,
  letterSpacing: 0,
}

bodyMd: {
  fontSize: 14,      // Secondary body text
  fontWeight: '400',
  lineHeight: 20,
  letterSpacing: 0,
}

labelLg: {
  fontSize: 14,      // Input labels, navigation
  fontWeight: '600',
  lineHeight: 20,
  letterSpacing: 0,
}

labelMd: {
  fontSize: 12,      // Small labels, metadata
  fontWeight: '500',
  lineHeight: 16,
  letterSpacing: 0,
}

labelSm: {
  fontSize: 11,      // Tiny labels, timestamps
  fontWeight: '500',
  lineHeight: 16,
  letterSpacing: 0,
}
```

### Typography Rules

- **Hierarchy through scale + weight:** Minimum 1.25 ratio between levels
- **Line length:** Cap at 65-75 characters for readability
- **Line height:** 1.5x for body text, tighter (1.25x) for headings
- **Letter spacing:** 0 for most text, wider (0.05em-0.2em) for uppercase labels
- **Font weights:** 400 (regular), 500 (medium), 600 (semibold), 700-900 (bold to black) for emphasis

---

## Spacing System

**Base unit:** 8px grid

```typescript
SPACING = {
  xxs: 2,    // Tight internal spacing
  xs: 4,     // Minimal gap
  sm: 8,     // Small gap
  md: 16,    // Standard gap
  lg: 24,    // Section spacing
  xl: 32,    // Major section spacing
  xxl: 40,   // Large spacing
  xxxl: 48,  // Maximum spacing
  
  // Touch targets
  touchTarget: 48,       // Minimum (Material Design spec)
  touchTargetLg: 56,     // Preferred for primary actions
  
  // Layout measurements
  navRailWidth: 80,          // Icon-only navigation
  navRailWidthExpanded: 264, // Icon + label navigation
  statusBarHeight: 24,       // Android status bar
  topAppBarHeight: 64,       // Top navigation bar
  bottomBarHeight: 48,       // Android navigation bar
  
  // Component spacing
  cardPadding: 24,      // Standard card padding
  cardPaddingLg: 32,    // Large card padding
  gutter: 24,           // Grid column gap
  
  // Icon circles
  iconCircleSm: 48,
  iconCircleMd: 56,
  iconCircleLg: 64,
  iconCircleXl: 80,
}
```

### Spacing Rules

- **Vary for rhythm:** Don't use the same spacing everywhere. Alternate between 16px and 24px for visual rhythm.
- **Touch targets:** Minimum 48dp height/width, prefer 56dp for primary actions
- **Grid gaps:** 16dp for tight grids (payment methods), 24dp for standard grids (tables, metrics)
- **Card padding:** 24dp standard, 32dp for important cards (shift status, order summary)
- **Section spacing:** 32dp between major page sections

---

## Border Radius

```typescript
BORDER_RADIUS = {
  none: 0,
  xs: 4,      // Minimal rounding
  sm: 8,      // Buttons, inputs, small cards
  md: 12,     // Standard cards
  lg: 16,     // Large cards
  xl: 24,     // Extra large cards (login glass card)
  xxl: 28,    // Larger special cards
  xxxl: 32,   // Maximum rounded corners
  full: 9999, // Pills, circles, fully rounded
}
```

**Usage:**
- Cards: 12dp (md)
- Buttons: 8dp (sm) for small, 12dp (md) for large, or full (9999) for pills
- Inputs: 12dp (md)
- Glass cards (login): 24dp (xl)
- Icon circles: full (9999)
- Badges/pills: full (9999)

---

## Elevation & Shadows

**iOS shadows:**
```typescript
sm: {
  shadowColor: '#1C1B1A',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
}

md: {
  shadowColor: '#1C1B1A',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
}

lg: {
  shadowColor: '#1C1B1A',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 12,
}
```

**Android elevation:**
- none: 0
- sm: 1
- md: 3
- lg: 6
- xl: 10

**Usage:**
- Cards: elevation sm (1dp)
- Floating buttons: elevation md (3dp)
- Modal overlays: elevation lg (6dp)
- Top app bar: elevation sm (1dp)

---

## Components

### NavigationRail

**Specs:**
- Width: 80dp (icon-only) or 264dp (icon + label)
- Responsive breakpoint: 1024px
- Active state: sage green (#A7C472) pill background, white icon/text
- Inactive state: text color #8FB35E, hover background rgba(167,196,114,0.1)
- Item height: 48dp minimum
- Padding: 24dp top/bottom, 8dp horizontal
- Border: 1px right border, rgba(167,196,114,0.2)

**Structure:**
1. Logo + brand text (top)
2. Navigation items (middle, flex)
3. Settings/logout (bottom)

### TopAppBar

**Specs:**
- Height: 64dp fixed
- Background: #F5F9F0 (matches app background)
- Border: 1px bottom, rgba(167,196,114,0.1)
- Padding: 24dp horizontal

**Variants:**
1. **Standard:** Title + subtitle, action buttons right
2. **Search:** Search input field, filter buttons
3. **Order detail:** Display Large order number (57px), table badge, back button

**Actions:**
- Notification button: 48dp circle
- Profile/settings: 48dp circle
- Alert toggle: pill button with switch

### Cards

**Standard card:**
- Background: #FFFFFF
- Border radius: 12dp
- Border: 1px solid rgba(167,196,114,0.1)
- Padding: 24dp
- Shadow: sm elevation

**Metric card (dashboard):**
- Standard card base
- **4dp left border** color-coded by status:
  - Pending: #FF9800 (orange)
  - Preparing: #A7C472 (sage)
  - Done: #739949 (forest)
- Large number: 48px font-black
- Icon top-right corner (24dp)
- Meta text below number

**Glass card (login only):**
- Background: rgba(255,255,255,0.7)
- Backdrop blur: 10px (iOS) or fallback opacity (Android)
- Border: 1px solid rgba(167,196,114,0.1)
- Border radius: 24dp (xl)
- Padding: 32dp

### Buttons

**Primary:**
- Background: #A7C472
- Text: #FFFFFF
- Height: 48dp (small), 56dp (large)
- Padding: 16-32dp horizontal
- Border radius: 8dp or full (pill)
- Shadow: lg with rgba(167,196,114,0.2)
- Pressed: scale(0.98)

**Secondary/Tonal:**
- Background: rgba(167,196,114,0.1)
- Text: #739949
- Border: 1px solid rgba(167,196,114,0.2)
- No shadow

**Outline:**
- Background: transparent
- Text: #A7C472
- Border: 1px solid #A7C472

**Danger:**
- Background: #BA1A1A
- Text: #FFFFFF

### Status Badges

**Pill-shaped:**
- Padding: 6px horizontal, 4px vertical
- Border radius: full (9999)
- Font: labelMd (12px, 500 weight)
- Uppercase text

**Colors:**
- Pending: bg #FFF3E0, text #FF9800
- Preparing: bg #F1F5EC, text #A7C472
- Done: bg #E8F0DD, text #739949
- Paid: bg #DDE8D6, text #5F7C48
- Failed: bg #FFDAD6, text #BA1A1A
- Cancelled: bg #E6E2DF, text #827471

### Input Fields

**Standard:**
- Height: 56dp
- Padding: 16dp horizontal
- Border radius: 12dp
- Background: #FFFFFF
- Border: 1px solid #D4C3BF
- Focus: border #A7C472, shadow rgba(167,196,114,0.15)

**With icon:**
- Icon left: absolute positioned, left 16dp
- Text padding-left: 48dp (icon + spacing)

### Icon Circles

**Sizes:**
- Small: 48dp
- Medium: 56dp (shift status)
- Large: 64dp (quick actions)
- Extra large: 80dp

**Background:** rgba(167,196,114,0.1) (primary/10)
**Icon color:** #A7C472 or #739949

### Empty States

**Structure:**
- Icon circle: 128dp, rgba(167,196,114,0.1) background
- Icon: 64dp, #A7C472, weight 200
- Heading: headlineMd, #2D3426
- Description: bodyLg, rgba(44,52,38,0.7)
- Action button: primary variant

### Tab Bar (Horizontal)

**Specs:**
- Border bottom: 1px rgba(167,196,114,0.1)
- Tab padding: 16dp horizontal, 12dp vertical
- Tab height: 48dp
- Active indicator: 3px bottom border, #A7C472
- Active text: labelLg, font-bold, #A7C472
- Inactive text: labelLg, font-medium, rgba(68,71,78,0.6)

---

## Layout Patterns

### Grid System

**12-column grid** with flexbox:
- Container: flexDirection: 'row', flexWrap: 'wrap'
- Columns: flex-based percentages (1 col = 8.33%, 4 cols = 33.33%, etc.)
- Gap: 24dp standard, 16dp tight

**Common grids:**
- 3 columns: Dashboard metrics, quick actions, payment methods
- 4 columns: Table cards
- 2 columns: Mobile-like lists (rare in landscape)

### Master-Detail

For orders, shift reports:
- Left side: List (4-6 columns width)
- Right side: Detail (6-8 columns width)
- Divider: 1px vertical, rgba(167,196,114,0.1)

### Content Area

**Dimensions:**
- Full width minus navigation rail (80dp or 264dp)
- Padding: 24-32dp all sides
- Max width: none (utilize full tablet width)
- Scroll: vertical only

---

## Motion & Animation

### Timing

```typescript
ANIMATION = {
  fast: 150,      // Quick feedback (button press)
  normal: 220,    // Standard transitions
  slow: 320,      // Complex animations
}
```

### Easing

- **Ease out:** Exponential (quart, quint, expo) for entrances
- **Ease in-out:** For position changes
- **Spring:** Only for dismissible elements (never for layout)

**Banned:**
- Bounce
- Elastic
- Layout property animations (width, height, left, top)

### Micro-interactions

**Button press:**
```typescript
transform: [{ scale: 0.98 }]
duration: 150ms
```

**Tab indicator slide:**
```typescript
translateX animation
duration: 220ms
easing: ease-out-quart
```

**List item entrance:**
```typescript
opacity: 0 → 1
translateY: 8 → 0
duration: 220ms
stagger: 30ms between items
```

---

## Accessibility

### Color Contrast

- Body text on background: minimum 4.5:1
- Large text (≥24px): minimum 3:1
- UI controls: minimum 3:1

**Passing combinations:**
- #2D3426 on #F5F9F0 ✅
- #FFFFFF on #A7C472 ✅
- #739949 on #FFFFFF ✅

### Touch Targets

- Minimum: 48dp × 48dp (Material Design spec)
- Preferred: 56dp × 56dp for primary actions
- Spacing: 8dp minimum between targets

### Status Indicators

**Never use color alone:**
- Add icons (✓ check for done, ⏱ clock for preparing)
- Add text labels
- Add position/grouping as secondary cue

---

## Platform-Specific

### Android

- Use elevation (1-10) instead of shadows
- Status bar: 24dp height, translucent
- Navigation bar: 48dp height, translucent
- Ripple effect on press (built into TouchableOpacity)
- Back button: hardware key support

### iOS (future)

- Use shadows instead of elevation
- Safe area insets: handle notch/home indicator
- Native blur for glass cards
- Spring animations for modals

---

## Design Tokens Reference

All values defined in `src/utils/designTokens.ts`:

```typescript
export const COLORS = { /* sage green palette */ }
export const TYPOGRAPHY = { /* Hanken Grotesk scales */ }
export const SPACING = { /* 8px grid */ }
export const BORDER_RADIUS = { /* rounded corners */ }
export const SHADOWS_IOS = { /* elevation maps */ }
export const ELEVATION = { /* Android elevation */ }
```

**Usage:**
```typescript
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@/utils/designTokens';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.cardPadding,
    borderRadius: BORDER_RADIUS.md,
    ...getShadowStyle('sm'),
  },
  heading: {
    ...TYPOGRAPHY.headlineLg,
    color: COLORS.onSurface,
  },
});
```

---

## Absolute Bans

Never use these patterns:

1. **Side-stripe borders:** 4px `borderLeft` or `borderRight` as colored accent (EXCEPTION: metric cards for data viz hierarchy)
2. **Gradient text:** `background-clip: text` with gradient
3. **Glassmorphism by default:** Only login screen, nowhere else
4. **Pure black/white:** Always tint toward sage green
5. **Identical card grids:** Vary card content, layout, or skip cards entirely
6. **Modal-first thinking:** Exhaust inline/progressive alternatives

---

## Implementation Notes

### React Native Specifics

**Flexbox layouts:**
- Use `flexDirection: 'row'` with `flexWrap: 'wrap'` for grids
- Gap spacing via margins, not CSS gap (not fully supported)
- Percentage-based widths for columns

**No native support for:**
- CSS Grid (use flexbox)
- backdrop-filter (use @react-native-community/blur)
- multiple box-shadows (single shadow only)
- CSS variables (use JS constants)

**Use native components:**
- TouchableOpacity for buttons (built-in press state)
- FlatList for long lists (virtualized)
- Modal for overlays (native animation)
- TextInput for forms (native keyboard)

---

## Quality Checklist

Before shipping any screen:

- [ ] No hardcoded colors (all use `COLORS.*`)
- [ ] No hardcoded sizes (all use `SPACING.*` or `BORDER_RADIUS.*`)
- [ ] Touch targets ≥ 48dp
- [ ] Text contrast ≥ 4.5:1
- [ ] Status uses icon + color + text (not color alone)
- [ ] Buttons have loading/disabled states
- [ ] Empty states are designed (not just "No data")
- [ ] Error states are designed
- [ ] Layout tested at 1280px and 1920px widths
- [ ] Press states on all interactive elements
- [ ] No gradient text
- [ ] No side-stripe borders (except metric cards)
- [ ] No glassmorphism (except login)

---

**Design system maintained:** June 7, 2026  
**Source:** Stitch design files + React Native implementation  
**Status:** Active, being applied to all 11 screens
