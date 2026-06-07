# Plan: Apply Stitch Design System to React Native App

**Project:** Olmosq Coffee Staff Portal  
**Date:** June 7, 2026  
**Status:** Planning Phase

---

## 🎯 Objective

Apply the complete Stitch design system (Fresh Sage Green branding) to the React Native app, replacing the current brown/coffee theme with the new sage green (#A7C472) palette across all 15+ screens.

---

## 📊 Current State Analysis

### Existing Implementation
- ✅ React Native 0.85.3 with TypeScript
- ✅ React Navigation configured
- ✅ 11 screens already implemented with OLD design system
- ✅ Component library (Button, Card, StatusBadge, etc.)
- ⚠️ **Current theme:** Brown/coffee palette (primary: #361F1A)
- ⚠️ Previous Stitch conversion was PARTIAL (only LoginScreen & DashboardScreen)

### Stitch Design System (Target)
**Source:** 15 HTML screens in `/home/ferostzz/Downloads/stitch_olmosq_app/`

**Brand Colors:**
- Primary: `#A7C472` (Fresh Sage Green)
- Primary Dark: `#8FB35E` (Deep Sage)
- Accent: `#739949` (Forest Green)
- Background: `#F5F9F0` (Soft Mint)
- Surface: `#FFFFFF` (White cards)
- On Surface: `#2D3426` / `#44474E` (Dark text)

**Typography:**
- Font: Hanken Grotesk (already used)
- Display Large: 57px (order numbers)
- Headline: 32px-24px
- Body: 16px-14px
- Labels: 14px-11px

**Key Patterns:**
- Navigation Rail: 80dp icon-only / 264dp expanded
- Top App Bar: 64dp with actions
- Metric Cards: 4dp left-border accent (color-coded)
- Glass Cards: Backdrop blur with rgba(255,255,255,0.7)
- Touch Targets: 48dp minimum
- Border Radius: 12dp cards, 16-24dp large cards, full circles
- Spacing: 8px grid system

---

## 🎨 Design System Migration Strategy

### Phase 1: Core Design Token Replacement (High Priority)

#### 1.1 Update Design Tokens
**File:** `src/utils/designTokens.ts`

**Actions:**
- Replace ALL color values with sage green palette
- Update primary from `#361F1A` → `#A7C472`
- Update background from `#FDF8F5` → `#F5F9F0`
- Update surface tones to match Stitch (mint-based)
- Update status colors to sage/orange scheme
- Keep typography structure (already Hanken Grotesk)
- Add missing tokens:
  - `primaryContainer: #A7C472` (10% opacity background)
  - `secondaryDark: #8FB35E`
  - `tertiary: #739949`
  - Glass effect colors

**Before:**
```typescript
primary: '#361F1A',  // Brown
background: '#FDF8F5',  // Cream
```

**After:**
```typescript
primary: '#A7C472',  // Sage Green
primaryDark: '#8FB35E',
accent: '#739949',
background: '#F5F9F0',  // Soft Mint
onBackground: '#2D3426',
```

**Estimated Time:** 30 minutes

---

#### 1.2 Verify Component Compatibility
**Files to Check:**
- `src/components/common/Button.tsx` ✅ (uses design tokens)
- `src/components/common/Card.tsx` ✅ (uses design tokens)
- `src/components/common/StatusBadge.tsx` ✅ (uses design tokens)
- `src/components/layout/NavigationRail.tsx` ✅ (uses design tokens)
- `src/components/layout/TopAppBar.tsx` ✅ (uses design tokens)

**Actions:**
- Run grep to find any hardcoded colors
- Replace `#361F1A`, `#755750`, etc. with token references
- Verify all components use `COLORS.primary` not hex values

**Estimated Time:** 20 minutes

---

### Phase 2: Screen-by-Screen Design Application (Medium Priority)

#### 2.1 LoginScreen
**Status:** Already partially implemented with glass effect

**Reference:** `staff_portal_login_android_tablet/code.html`

**Updates Needed:**
- ✅ Update colors to sage green (automatic via tokens)
- ✅ Verify gradient background: `linear-gradient(135deg, #F5F9F0 0%, #E8F0E0 100%)`
- ✅ Verify glass card opacity: `rgba(255, 255, 255, 0.7)`
- ✅ Check input field styling (pl-12, py-4)
- ✅ Verify button shadow: `shadow-primary/20`

**Estimated Time:** 15 minutes (verification + color update)

---

#### 2.2 DashboardScreen
**Status:** Implemented with old colors

**Reference:** `android_tablet_dashboard_olmosq_coffee/code.html`

**Layout Elements:**
1. **Navigation Rail** (80dp/264dp) ✅ Already implemented
2. **Top App Bar** with title + actions ✅
3. **Current Shift Card:**
   - Icon circle: 56dp, `bg-primary/10`
   - Starting cash: 48px font, font-black
   - "Manage Shift" button with shadow
4. **Metric Cards (3-column grid):**
   - 4dp left border (color-coded):
     - Pending: `#FF9800` (orange)
     - Preparing: `#A7C472` (sage)
     - Completed: `#739949` (forest)
   - Large number: 48px, font-black
   - Icon in top-right corner
5. **Quick Actions Grid (3 columns):**
   - 64dp icon circles with `bg-primary/10`
   - Rounded-xl cards with border
   - Scale effect on press (0.97)

**Updates Needed:**
- Update shift card icon background to `primary/10`
- Update metric card borders to match Stitch colors
- Update quick action tiles styling
- Add decorative background circles (optional)

**Estimated Time:** 45 minutes

---

#### 2.3 OrdersScreen
**Status:** Basic implementation

**Reference:** `staff_order_management_green_brand/code.html`

**Layout Elements:**
1. **Side NavBar** (icon-only, 80dp)
2. **Top Nav Bar:**
   - Title: "Orders"
   - Alert toggle button
   - Logout button
3. **Filter Tabs (Horizontal):**
   - All, Payment, Preparing, Done, Paid, Failed, Cancelled
   - Active tab indicator: 3px bottom border, sage green
   - Tab text: font-bold when active
4. **Order List / Empty State:**
   - Empty state: 128dp icon circle, soft background
   - "No orders found" message
   - Refresh button

**Updates Needed:**
- Implement horizontal tab bar with indicator
- Create empty state component
- Add alert toggle in TopAppBar
- Style order cards with sage green accents

**Estimated Time:** 1 hour

---

#### 2.4 OrderDetailScreen
**Status:** Basic implementation

**Reference:** `order_detail_0042_android_tablet/code.html`

**Layout Elements:**
1. **Top App Bar (Special):**
   - Back button (48dp circle)
   - Order number: 57px, font-black (`#0042`)
   - Table badge: rounded-full, sage background
2. **Status Timeline:**
   - Horizontal progress line (2px, `#E0E4D9`)
   - Status circles (active/inactive)
3. **Content Grid (12-column):**
   - Left 8 cols: Item list
   - Right 4 cols: Summary card
4. **Items List:**
   - Icon circles (40dp)
   - Item name + quantity
   - Price aligned right
5. **Action Buttons:**
   - "Mark Done" (tonal)
   - "Record Payment" (primary)

**Updates Needed:**
- Implement Display Large typography for order number
- Create status timeline component
- Implement 12-column grid layout
- Add item list with icon circles
- Style action buttons

**Estimated Time:** 1.5 hours

---

#### 2.5 PaymentScreen
**Status:** Needs implementation

**Reference:** `payment_recording_android_tablet/code.html`

**Layout Elements:**
1. **Order Summary Card:**
   - Order number + table
   - Total amount (large display)
2. **Payment Method Grid (3 columns):**
   - Cash, Card, GCash, Maya, etc.
   - Rounded-xl cards with icons
   - Selected state: sage green background
3. **Cash Calculator (if Cash selected):**
   - 3×4 number grid
   - Large display for amount entered
   - Clear button
4. **Complete Payment Button:**
   - Full width, primary color
   - Shadow effect

**Updates Needed:**
- Create payment method selector grid
- Implement calculator UI
- Add amount display
- Create complete payment action

**Estimated Time:** 2 hours

---

#### 2.6 TablesScreen
**Status:** Basic implementation

**Reference:** `table_management_android_tablet/code.html`

**Layout Elements:**
1. **Filter Bar:**
   - "All Tables", "Available", "Occupied" buttons
   - Pill-shaped, active state with sage background
2. **Table Grid (4 columns, 24dp gap):**
   - Square aspect ratio cards
   - Table number (large, centered)
   - Status indicator (badge)
   - QR icon/button
3. **Table Card States:**
   - Available: white background, green border
   - Occupied: sage background, white text
   - Active order badge (orange dot)

**Updates Needed:**
- Implement filter pills
- Create 4-column grid layout
- Design table card with status states
- Add QR code generation button

**Estimated Time:** 1.5 hours

---

#### 2.7 ShiftScreen
**Status:** Needs redesign

**Reference:** `shift_management_tablet_landscape/code.html`

**Layout Elements:**
1. **Current Shift Card:**
   - Icon (schedule, 64dp circle)
   - Shift info (start time, station)
   - Cash summary
   - "Close Shift" button (danger variant)
2. **Clock In/Out Card:**
   - Large icon
   - Current time display
   - Action button
3. **Shift History List:**
   - Card list with shift summary
   - Date, duration, cash amounts

**Updates Needed:**
- Redesign shift status card
- Add clock in/out interface
- Create shift history list
- Style with sage green theme

**Estimated Time:** 1 hour

---

#### 2.8 ShiftReportsScreen
**Status:** Basic implementation

**Reference:** `shift_reports_tablet_landscape_green/code.html`

**Layout Elements:**
1. **Filter/Date Range Selector**
2. **Report Cards (List):**
   - Shift number + date
   - Summary metrics (orders, revenue)
   - Staff name
   - Tap to view detail
3. **Metric Summaries:**
   - Total revenue
   - Total orders
   - Average order value

**Updates Needed:**
- Create report card component
- Add summary metrics section
- Style with sage green accents
- Add date range picker

**Estimated Time:** 1 hour

---

#### 2.9 ShiftReportDetailScreen
**Status:** Needs implementation

**Reference:** `shift_report_detail_android_tablet/code.html`

**Layout Elements:**
1. **Header with Shift Info**
2. **Metrics Grid (3-4 columns):**
   - Orders count
   - Revenue
   - Cash movements
   - Discrepancies
3. **Transactions List:**
   - Grouped by type
   - Time, amount, method
4. **Export Actions:**
   - PDF, CSV buttons

**Updates Needed:**
- Full implementation with sage theme
- Metric cards with left-border accents
- Transaction list component

**Estimated Time:** 1.5 hours

---

#### 2.10 CashDrawerScreen
**Status:** Needs redesign

**Reference:** `cash_drawer_management_android_tablet/code.html`

**Layout Elements:**
1. **Current Cash Display:**
   - Large amount (57px)
   - Starting cash reference
2. **Cash Movement Form:**
   - Type selector (Cash In / Cash Out)
   - Amount input with number pad
   - Reason/note field
3. **Movement History:**
   - List of recent movements
   - Time, amount, reason

**Updates Needed:**
- Redesign with sage theme
- Add cash movement form
- Create history list
- Style inputs with sage accents

**Estimated Time:** 1 hour

---

#### 2.11 MenuSyncScreen
**Status:** Needs redesign

**Reference:** `menu_settings_green_brand_tablet/code.html`

**Layout Elements:**
1. **Loyverse Sync Card:**
   - Sync buttons (Menu, Modifiers, Categories)
   - Last sync time
   - Status indicator
2. **Category List:**
   - Card grid showing menu categories
   - Item count per category
   - Edit/manage buttons
3. **Sync Status/Logs:**
   - Recent sync history
   - Error messages if any

**Updates Needed:**
- Create sync control interface
- Add category grid
- Style with sage green theme
- Add status indicators

**Estimated Time:** 1 hour

---

### Phase 3: Component Enhancements (Low Priority)

#### 3.1 Create New Components

**MetricCard** (`src/components/dashboard/MetricCard.tsx`)
- 4dp left border with color prop
- Large number display (48px)
- Icon in top-right corner
- Meta text below number

**TabBar** (`src/components/common/TabBar.tsx`)
- Horizontal tab selector
- Active indicator (3px bottom border)
- Font-bold active state

**IconCircle** (`src/components/common/IconCircle.tsx`)
- Reusable circle with icon
- Sizes: 48dp, 56dp, 64dp, 80dp
- Background: `primary/10` or custom

**EmptyState** (`src/components/common/EmptyState.tsx`)
- Large icon (128dp)
- Message text
- Optional action button

**StatusTimeline** (`src/components/orders/StatusTimeline.tsx`)
- Horizontal progress indicator
- Status circles
- Progress line

**PaymentMethodCard** (`src/components/payment/PaymentMethodCard.tsx`)
- Icon + label
- Selected state styling
- Rounded-xl with border

**TableCard** (`src/components/tables/TableCard.tsx`)
- Square aspect ratio
- Table number display
- Status badge
- QR action button

**Estimated Time:** 3 hours

---

#### 3.2 Update Existing Components

**Button** (`src/components/common/Button.tsx`)
- ✅ Already uses design tokens
- Verify shadow on primary variant: `shadow-lg shadow-primary/20`
- Verify scale effect on press: `scale-[0.98]`

**Card** (`src/components/common/Card.tsx`)
- ✅ Already uses design tokens
- Add variant for glass effect (optional)

**StatusBadge** (`src/components/common/StatusBadge.tsx`)
- Update colors to match sage theme
- Pending: orange (#FF9800)
- Preparing: sage (#A7C472)
- Done: forest (#739949)

**NavigationRail** (`src/components/layout/NavigationRail.tsx`)
- ✅ Already implemented correctly
- Verify colors update automatically

**TopAppBar** (`src/components/layout/TopAppBar.tsx`)
- ✅ Already implemented
- Add variant for order detail (Display Large number)

**Estimated Time:** 1 hour

---

### Phase 4: Assets & Polish (Low Priority)

#### 4.1 Update Logo/Branding
- Use Olmosq logo from Stitch designs
- Logo URL: `https://lh3.googleusercontent.com/aida-public/AB6AXuA5SwktFDyOyUYkWSwUKdPtbwBxzt7-xKbQ4qNinC13bH2VUntcvncvYFvNzsrS5Qaw5JioOOVRQFpA0G0EI5IdxSYI-y7pSLdcT6XfKeC-sozzvQQnhsXRJuPSLON1-5d26jz7PLCAPMApErLuPBHUg7p7qa8b75UYoU4QPY0Jk9HrT9fZLhuXvP3HQcs_iuoXzOv0iWLGsDvOFqFElXBzyee_N4FRIkdhBx9A-vDq6_3t2NEk07DuWuXc9g0Z1N_nCyoQ3TFAZvQ`
- Download and add to assets folder
- Update NavigationRail logo prop

**Estimated Time:** 15 minutes

---

#### 4.2 Add Decorative Elements
- Background blur circles (optional)
- Organic pattern SVG (bottom-right corner)
- Gradient overlays on specific screens

**Estimated Time:** 30 minutes

---

#### 4.3 Animations & Micro-interactions
- Button press scale (0.98) - partially done
- Tab indicator slide animation
- List item entrance animations
- Pull-to-refresh indicator

**Estimated Time:** 1 hour

---

## 📋 Implementation Order

### Sprint 1: Foundation (Day 1)
1. ✅ Update design tokens (30 min)
2. ✅ Verify component compatibility (20 min)
3. ✅ Update LoginScreen colors (15 min)
4. ✅ Update DashboardScreen (45 min)
5. ✅ Test on emulator (30 min)

**Total:** ~2.5 hours

---

### Sprint 2: Core Screens (Day 2)
1. ✅ OrdersScreen redesign (1 hour)
2. ✅ OrderDetailScreen redesign (1.5 hours)
3. ✅ Create MetricCard component (30 min)
4. ✅ Create TabBar component (30 min)
5. ✅ Create EmptyState component (30 min)

**Total:** ~4 hours

---

### Sprint 3: Transaction Screens (Day 3)
1. ✅ PaymentScreen implementation (2 hours)
2. ✅ TablesScreen redesign (1.5 hours)
3. ✅ Create PaymentMethodCard component (30 min)
4. ✅ Create TableCard component (30 min)

**Total:** ~4.5 hours

---

### Sprint 4: Management Screens (Day 4)
1. ✅ ShiftScreen redesign (1 hour)
2. ✅ ShiftReportsScreen redesign (1 hour)
3. ✅ ShiftReportDetailScreen implementation (1.5 hours)
4. ✅ CashDrawerScreen redesign (1 hour)
5. ✅ MenuSyncScreen redesign (1 hour)

**Total:** ~5.5 hours

---

### Sprint 5: Polish & Testing (Day 5)
1. ✅ Add logo/branding assets (15 min)
2. ✅ Add decorative elements (30 min)
3. ✅ Implement animations (1 hour)
4. ✅ Full app testing on tablet (2 hours)
5. ✅ Fix bugs and alignment issues (1.5 hours)

**Total:** ~5 hours

---

## 🎯 Success Criteria

### Design Accuracy
- [ ] All colors match sage green palette (#A7C472, #8FB35E, #739949)
- [ ] Background color is soft mint (#F5F9F0)
- [ ] Typography uses Hanken Grotesk correctly
- [ ] Spacing follows 8px grid
- [ ] Border radius values match (12dp, 16dp, 24dp)
- [ ] Touch targets ≥ 48dp

### Visual Consistency
- [ ] All screens use the same NavigationRail
- [ ] All screens use consistent TopAppBar
- [ ] All buttons use sage green as primary color
- [ ] All status badges use correct color mapping
- [ ] All cards have consistent styling

### Functional Requirements
- [ ] Navigation works across all screens
- [ ] Forms are functional with sage theme
- [ ] Status updates reflect in UI
- [ ] Real-time updates work with new design

### Code Quality
- [ ] No hardcoded colors (all use design tokens)
- [ ] TypeScript types for all components
- [ ] Reusable components extracted
- [ ] Platform-specific handling maintained

---

## ⚠️ Risk Mitigation

### Potential Issues

**1. Color Contrast**
- Risk: Sage green might have lower contrast than brown
- Mitigation: Use darker variant (#739949) for text on light backgrounds
- Test with accessibility tools

**2. Component Breaking Changes**
- Risk: Token updates might break existing components
- Mitigation: Test each screen after token update
- Keep old token file as backup temporarily

**3. Native Module Dependencies**
- Risk: BlurView or other native modules might not work
- Mitigation: Already have fallback implementations in place

**4. Performance**
- Risk: Complex layouts might lag on older tablets
- Mitigation: Use FlatList for long lists, memoize components

---

## 📦 Deliverables

### Code Artifacts
1. ✅ Updated `designTokens.ts` with sage green palette
2. ✅ 7 new component files (MetricCard, TabBar, etc.)
3. ✅ 11 redesigned screen files
4. ✅ Logo assets in `assets/` folder
5. ✅ Documentation updates

### Documentation
1. ✅ Design system reference guide
2. ✅ Component usage examples
3. ✅ Migration notes (old → new theme)
4. ✅ Screenshots of all screens with new design

### Testing
1. ✅ Manual testing checklist
2. ✅ Visual regression screenshots
3. ✅ Performance benchmarks

---

## 📊 Estimated Timeline

**Total Estimated Time:** 21-22 hours

**Breakdown:**
- Phase 1 (Tokens): 0.5 hours
- Phase 2 (Screens): 12 hours
- Phase 3 (Components): 4 hours
- Phase 4 (Polish): 2 hours
- Testing & Fixes: 2.5 hours

**Recommended Schedule:** 5 days (4-5 hours/day)

---

## 🚀 Next Steps

### Immediate Actions (Day 1)
1. Back up current `designTokens.ts`
2. Update all color tokens to sage green palette
3. Run app and verify no crashes
4. Update LoginScreen and DashboardScreen
5. Take screenshots for before/after comparison

### Follow-up Actions
1. Proceed with screen-by-screen redesign
2. Create new components as needed
3. Test on multiple tablet sizes
4. Document any deviations from original design
5. Get user feedback on new color scheme

---

## 📝 Notes

### Design Decisions
- **Kept:** 4dp left borders on metric cards (meaningful data visualization)
- **Updated:** All primary actions now use sage green instead of brown
- **Added:** Glass effect on login screen only (performance consideration)
- **Maintained:** Existing component architecture (no major refactoring)

### Stitch Source Files
All 15 Stitch designs available at:
```
/home/ferostzz/Downloads/stitch_olmosq_app/
├── android_tablet_dashboard_olmosq_coffee/
├── cash_drawer_management_android_tablet/
├── menu_settings_green_brand_tablet/
├── olmosq_staff_portal_green_brand/
├── order_detail_0042_android_tablet/
├── payment_recording_android_tablet/
├── shift_management_tablet_landscape/
├── shift_reports_tablet_landscape_green/
├── staff_order_management_green_brand/
├── staff_order_management_tablet/
├── staff_portal_login_android_tablet/
├── table_management_android_tablet/
└── tables_qr_management_green_brand/
```

Each folder contains:
- `code.html` - Full HTML implementation with Tailwind CSS
- `screen.png` - Visual reference screenshot
- `DESIGN.md` - Design system documentation (in one folder)

---

## ✅ Approval Checklist

Before starting implementation:
- [ ] User confirms sage green palette preference
- [ ] User approves estimated timeline
- [ ] User confirms all 11 screens need redesign
- [ ] User provides feedback on component priorities
- [ ] User confirms native module linking is acceptable

---

**Plan Status:** ✅ **Ready for Review**

_Generated: June 7, 2026_
