# Olmosq Coffee Staff Portal

**Register:** product  
**Platform:** Android tablet (landscape), React Native 0.85.3  
**Design source:** Stitch AI-generated designs (Fresh Sage Green brand)

---

## Users

**Primary:** Cafe staff (baristas, cashiers, shift managers)  
**Context:** Fast-paced coffee shop environment, tablet mounted at counter or kitchen prep station  
**Technical level:** Low to medium; needs to work under pressure during rush hours  
**Device:** Android tablets (10-13 inches), landscape orientation only, touch-first  
**Environment:** Bright cafe lighting, potential glare, need to work with wet/sticky hands

**User goals:**
- Process orders quickly during busy periods
- Track cash drawer accurately across shifts
- Sync menu changes from Loyverse POS
- Generate and manage table QR codes
- Review shift performance and cash discrepancies

**Pain points:**
- Too many taps to complete common actions
- Hard to see status at a glance during rush
- Cash calculations need to be foolproof
- Menu sync failures cause confusion
- Small touch targets lead to errors

---

## Product Purpose

QR-based ordering system management interface for cafe staff. Design SERVES the product: staff need to work fast, accurately, and under pressure. Interface must be efficient, clear, and forgiving of errors.

**Core workflows:**
1. **Order processing:** View incoming orders → Accept → Prepare → Mark done → Record payment
2. **Shift management:** Open shift with starting cash → Track orders and cash movements → Close shift and reconcile
3. **Menu administration:** Sync from Loyverse → Adjust category visibility and ordering
4. **Table setup:** Generate QR codes → Print/download for tables

**Critical requirements:**
- Real-time order updates (WebSocket)
- Offline-first architecture (handle network drops)
- Large touch targets (≥48dp, prefer 56dp)
- Clear status indicators visible from distance
- Fast navigation between orders and shift management
- Error prevention in cash calculations

---

## Brand Identity

**Olmosq Coffee** - Fresh, natural, sustainable coffee brand  
**Tone:** Professional but approachable, efficient but calm, modern but warm

**Visual identity:**
- **Primary color:** Fresh Sage Green (#A7C472) - natural, organic, sustainable
- **Secondary:** Deep Sage (#8FB35E), Forest Green (#739949)
- **Background:** Soft Mint (#F5F9F0) - light, clean, refreshing
- **Typography:** Hanken Grotesk - modern, clean, highly legible
- **Aesthetic:** Clean efficiency with organic warmth, Material Design 3 influenced

**Not:** Corporate blue, SaaS cream-and-teal, dark mode for aesthetic reasons, decorative gradients, heavy shadows

---

## Anti-references

What this product is NOT:

**Visual:**
- ❌ Dark mode by default (staff work in bright cafe environment)
- ❌ Minimalist to the point of vague (status must be obvious at a glance)
- ❌ Glassmorphism everywhere (only login screen, if anywhere)
- ❌ Gradient text or decorative gradients
- ❌ Side-stripe borders on cards (never)
- ❌ Tiny monochrome icons without labels

**Interaction:**
- ❌ Modal dialogs for everything (use inline editing, bottom sheets sparingly)
- ❌ Multi-step wizards for common actions (make it direct)
- ❌ Confirmation dialogs for reversible actions
- ❌ Hidden functionality behind gestures (make it visible)
- ❌ Tiny touch targets <48dp

**Architecture:**
- ❌ SaaS dashboard with metric hero cards
- ❌ Identical card grids everywhere
- ❌ Generic Material Design template
- ❌ Web-first design adapted poorly to touch

---

## Strategic Principles

### 1. Speed over decoration
Staff don't have time to admire the interface. Every pixel serves function. If a visual element doesn't help them work faster or prevent errors, remove it.

### 2. Status must scream
Order status, shift status, cash discrepancies - these need to be visible from arm's length. Use color, size, position. No hunting for information.

### 3. Touch-first, not mouse-adapted
Designed for thumbs and fingers, not cursors. Large targets, clear spacing, no hover states. Pressure states, long-press for secondary actions.

### 4. Forgive mistakes quickly
Cash calculations are high-stakes. Allow easy correction. Show what will happen before it happens. Undo over confirmation dialogs.

### 5. Persistent context
Staff should always know: which shift, how much cash, how many pending orders. Context anchored in UI, not hidden in navigation.

### 6. Natural material palette
The sage green isn't decoration - it's brand identity. But use it purposefully: primary actions, active states, success confirmation. Don't drench everything.

---

## Design Constraints

**Platform:**
- React Native 0.85.3, Android-only initially
- Landscape orientation locked
- Tablet screen sizes: 10-13 inches (1280x800 to 1920x1200)
- Touch targets: minimum 48dp, prefer 56dp for primary actions
- No native navigation gestures (no swipe-back)

**Technical:**
- REST API + WebSocket for real-time updates
- Offline-first architecture (React Query cache)
- JWT Bearer token authentication
- Loyverse POS integration via API
- QR code generation with react-native-qrcode-svg

**Performance:**
- FlatList for order lists (virtual scrolling)
- Memoize expensive components
- Optimize images (logo, QR codes)
- Fast cold start (<2 seconds)

**Accessibility:**
- High contrast for readability
- No color-only status indicators (add icons/text)
- Large readable type (minimum 14px body)
- Touch target spacing prevents fat-finger errors

---

## Existing State

**Implemented screens (brown theme, needs redesign):**
- LoginScreen
- DashboardScreen  
- OrdersScreen
- OrderDetailScreen
- PaymentScreen
- TablesScreen
- ShiftScreen
- ShiftReportsScreen
- ShiftReportDetailScreen
- CashDrawerScreen
- MenuSyncScreen

**Component library:**
- Button, Card, StatusBadge, LoadingSpinner, EmptyState
- NavigationRail (80dp/264dp responsive)
- TopAppBar (standard + search variants)
- GlassCard (login screen only)
- MaterialIcon (icon mapping system)

**Design tokens:**
- Currently brown/coffee theme (primary: #361F1A)
- Needs full replacement with sage green palette
- Typography already uses Hanken Grotesk
- Spacing follows 8px grid

---

## Current Task

**Apply Stitch Fresh Sage Green design system** across all 11 screens, replacing the brown/coffee theme with the new brand palette. This is a complete visual redesign while maintaining the existing component architecture and functionality.

**Source materials:** 15 Stitch HTML designs in `/home/ferostzz/Downloads/stitch_olmosq_app/` showing pixel-perfect implementations of each screen with the new sage green branding.

**Approach:** Design token replacement → screen-by-screen component updates → new component creation → polish and animations. Maintain existing navigation and state management. Focus on visual transformation, not refactoring.
