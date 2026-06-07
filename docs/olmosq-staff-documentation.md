# Olmosq Coffee Staff Portal - Web Exploration Documentation

**Date:** June 7, 2026  
**URL:** https://staging.olmosq-coffee.com/staff  
**Purpose:** Complete documentation for Android tablet app design

---

## Overview

The Olmosq Coffee Staff Portal is a QR-based ordering system management interface for cafe staff. It includes order management, shift tracking, menu configuration, and table/QR code management.

---

## Design System Analysis

### Color Scheme
- **Primary Brand Color:** Coffee brown/orange tones
- **Background:** White/light gray
- **Status Colors:**
  - Active/Success: Green badges
  - Temp/Warning: Orange badges
  - Alert: Red
- **Text:** Dark gray/black on light backgrounds

### Typography
- **Headings:** Bold, sans-serif
- **Body:** Regular sans-serif
- **Hierarchy:** Clear distinction between h1, h2, and body text

### UI Components
- **Navigation:** Top horizontal bar with icons + text labels
- **Buttons:** Rounded corners with icons
- **Cards:** White cards with subtle shadows
- **Tables/Lists:** Row-based with clear separators
- **Status Badges:** Colored pill-shaped badges
- **Forms:** Standard input fields with labels

### Layout Patterns
- **Header:** Fixed top navigation bar (64px height)
- **Main Content:** Full-width content area with 16px padding
- **Sections:** Card-based layouts with clear grouping

---

## Page-by-Page Documentation

### 1. Login Page
**URL:** `/staff/login`

**Purpose:** Staff authentication

**Components:**
- Logo + "Olmosq Staff" branding
- Username field
- Password field
- Sign in button

**Screenshot:** `staff-login-page.png`

---

### 2. Orders Page
**URL:** `/staff/orders`

**Purpose:** View and manage customer orders by status

**Key Features:**
- Shift context display (e.g., "Shift 8 orders only")
- Tab navigation for order statuses:
  - All
  - Payment
  - Preparing
  - Done
  - Paid
  - Failed
  - Cancelled
- Order list/grid (currently empty: "No orders found")

**Actions:**
- View orders by status
- Process orders through workflow

**Screenshot:** `orders-page.png`

---

### 3. Shift Management Page
**URL:** `/staff/shift`

**Purpose:** Open/close shifts, track cash drawer, manage cash movements

**Key Sections:**

#### Shift Status
- Current shift indicator (Shift 8)
- Open timestamp
- "Close Shift" button

#### Shift Reports Access
- Link to view closed shift reports
- Shows count of closed shifts (7 closed shifts)

#### Cash Tracking Dashboard
- **Expected cash:** RM 100.00
- **Starting cash:** RM 100.00
- **Cash sales:** RM 0.00
- **Cash in:** RM 0.00
- **Cash out:** RM 0.00
- **Change given:** RM 0.00

#### Current Shift Cash Orders
- List of cash payments during current shift
- Currently empty state

#### Cash Movement Section
- Toggle buttons: "Cash In" / "Cash Out"
- Amount input (spinbutton)
- Note field (reason for movement)
- "Save Movement" button

#### Movement History
- Shows current-shift entries count (0)
- Link to view full history in shift reports

**Screenshot:** `shift-page.png`

---

### 4. Menu Settings Page
**URL:** `/staff/menu-settings`

**Purpose:** Sync menu from Loyverse POS and manage category settings

**Key Sections:**

#### Loyverse Sync Controls
- **Sync menu** button (refresh menu items)
- **Payments** button (sync payment types)
- **Reset menu** button
- **Reset payments** button

#### Category Management Table
**Columns:**
- Category name (with item count)
- Order (up/down arrows to reorder)
- Status (Visible/Hidden badge)
- Menu (Shown/Hidden button)
- Temperature (Hot/Cold, No temp button)

**Categories (8 total):**
1. **Coffee** - 16 items, Visible, Temp, Shown, Hot/Cold
2. **Non-Coffee** - 7 items, Visible, Temp, Shown, Hot/Cold
3. **Matcha** - 5 items, Visible, Temp, Shown, Hot/Cold
4. **Sparklings** - 6 items, Visible, Temp, Shown, Hot/Cold
5. **Food** - 18 items, Visible, No temp, Shown
6. **Pastry** - 14 items, Visible, No temp, Shown
7. **Add On** - 5 items, Visible, No temp, Shown
8. **Moreh** - 1 item, Hidden, No temp, Hidden

**Actions:**
- Reorder categories (move up/down)
- Toggle visibility
- Toggle temperature options
- Sync with POS

**Screenshot:** `menu-settings-page.png`

---

### 5. Tables & QR Codes Page
**URL:** `/staff/tables`

**Purpose:** Manage table QR codes for customer ordering

**Key Features:**

#### QR Generation Controls
- **QR count** input (spinbutton, currently: 10)
- **Generate** button
- Status display: "10 tables, 10 active"

#### Table List (10 tables)
Each table row contains:
- **Table number badge** (1-10)
- **Table details:**
  - Table name (e.g., "Table 1")
  - Status badge (Active/Inactive)
  - Display name + Short code (e.g., "Table 1", "T1")
  - Some tables have location suffix (e.g., "Table 6 (Outdoor)")
- **QR Code image** (108x152px)
- **Ordering link:** Full URL (e.g., `https://staging.olmosq-coffee.com/table/T1`)
- **Action buttons:**
  - Open (test link)
  - Copy link
  - PNG (download QR code)

**Tables:**
1. Table 1 (T1)
2. Table 2 (T2)
3. Table 3 (T3)
4. Table 4 (T4)
5. Table 5 (T5)
6. Table 6 (Outdoor) (T6)
7. Table 7 (Outdoor) (T7)
8. Table 8 (Outdoor) (T8)
9. Table 9 (Outdoor) (T9)
10. Table 10 (Outdoor) (T10)

**Screenshot:** `tables-qr-page.png`

---

### 6. Shift Reports Page
**URL:** `/staff/shift-reports`

**Purpose:** View history of cash movements and closed shift summaries

**Key Sections:**

#### Current Shift Movement History
- Shows manual cash in/out for open shift
- Displays:
  - Shift number (Shift 8)
  - Expected cash (RM 100.00)
  - Cash in (RM 0.00)
  - Cash out (RM 0.00)
- Currently empty state: "No manual cash movements recorded"

#### Closed Shift Reports (7 shifts)
Each shift card shows:
- **Shift name** (e.g., "Shift 7")
- **Date/time range** (start - end)
- **Total expected cash** (right-aligned)
- **Statistics:**
  - Orders count
  - Expected amount
  - Movement count
- **View Report** button (links to individual shift detail)

**Closed Shifts Listed:**
1. Shift 7 - 5 Jun 2026 - RM 224.00 - 1 order
2. Shift 6 - 2 Jun 2026 - RM 120.00 - 1 order
3. Shift 5 - 31 May 2026 - RM 16.00 - 39 orders
4. Shift 4 - 31 May 2026 - RM 2009.00 - 1 order
5. Shift 3 - 30-31 May 2026 - RM 177.00 - 8 orders
6. Shift 2 - 30 May 2026 - RM 100.00 - 1 order
7. Shift 1 - 30 May 2026 - RM 110.00 - 2 orders

**Navigation:**
- "Back to Shift" button at top

**Screenshot:** `shift-reports-page.png`

---

## Navigation Structure

### Primary Navigation (Top Bar)
1. **Olmosq Staff** (logo + brand) - Links to /staff/orders
2. **Orders** - Order management
3. **Shift** - Shift and cash management
4. **Menu** - Menu settings and sync
5. **Tables & QR** - QR code management

### Utility Navigation (Right Side)
- **Alert off/on** toggle
- **Sign out** button

### Secondary Navigation (In-page)
- Shift → Shift Reports
- Shift Reports → Back to Shift

---

## Data Patterns

### Order Statuses
- All, Payment, Preparing, Done, Paid, Failed, Cancelled

### Payment Types
- Cash (physical)
- Digital/QR payments

### Cash Flow Types
- Cash In (manual additions)
- Cash Out (manual removals)
- Cash Sales (from orders)
- Change Given

### Category Temperature Options
- Hot/Cold (beverages)
- No temp (food items)

---

## User Workflows

### 1. Order Processing Flow
Orders → View by status → Process through stages → Mark as done/paid

### 2. Shift Management Flow
Open Shift → Track orders/cash → Record movements → Close shift → Review report

### 3. Menu Management Flow
Sync from Loyverse → Adjust category visibility → Reorder categories → Set temperature options

### 4. Table Setup Flow
Generate QR codes → Print/download codes → Place at tables → Test ordering links

---

## Technical Notes

### Responsive Behavior
- Current web design appears to be desktop/tablet optimized
- Minimum content width ~900px based on screenshots
- Card-based layouts should adapt well to tablet landscape

### State Management
- Shift context persists across pages
- Active shift shows in header context
- Real-time order updates likely via polling or websockets

### Integration Points
- Loyverse POS (menu sync)
- QR code generation service
- Payment processing

---

## Design Considerations for Android Tablet

### Landscape Optimization
- Utilize horizontal space with side-by-side panels
- Master-detail patterns for lists (e.g., orders list + detail)
- Persistent navigation sidebar vs top bar

### Touch Interactions
- Larger touch targets (minimum 48dp)
- Swipe gestures for order status changes
- Pull-to-refresh for orders page

### Material Design Patterns
- Floating Action Buttons for primary actions
- Bottom sheets for secondary actions
- Cards for content grouping
- Chips for status badges

### Information Density
- Show more data per screen (utilize landscape space)
- Multi-column layouts where appropriate
- Collapsible sections for less-used features

### Android-Specific Features
- Hardware back button support
- Split-screen multitasking support
- Notification integration for new orders

---

## Screenshots Reference

All screenshots saved:
- `staff-login-page.png`
- `orders-page.png`
- `shift-page.png`
- `menu-settings-page.png`
- `tables-qr-page.png`
- `shift-reports-page.png`

---

**End of Documentation**
