# Design Document: Mr. Khao Khilao Frontend

## Overview

Mr. Khao Khilao is a dark-themed, premium restaurant web application for Chef Piyush Gupta's food brand. The application is a single-page React 19 application with three distinct views — a public marketing Landing Page, a Customer Dashboard for ordering/tracking, and an Admin Dashboard for business management. There is no backend; all data is served from static mock modules in `src/data/`.

The application is designed mobile-first, uses a dark-orange color palette, and layers Framer Motion (component-level animations) and GSAP (scroll-triggered timeline and counter animations) for a polished, premium feel.

---

## Architecture

### Top-Level Component Tree

```
App
 └─ BrowserRouter
     └─ CartProvider               ← global cart state (React Context)
         └─ AppRoutes
             ├─ Route "/"          → LandingPage
             ├─ Route "/customer"  → CustomerDashboard
             ├─ Route "/admin"     → AdminDashboard
             └─ Route "*"          → <Navigate to="/" />
```

### Page Composition

#### LandingPage (`/`)

```
LandingPage
 ├─ Navbar
 ├─ HeroSection
 ├─ AchievementCounters
 ├─ JourneyTimeline
 ├─ SignatureDishes
 ├─ CustomerReviews
 ├─ OutletsSection
 ├─ FranchiseSection
 └─ Footer
```

#### CustomerDashboard (`/customer`)

```
CustomerDashboard
 ├─ CustomerHeader
 ├─ FeaturedBanner
 ├─ QuickActions
 ├─ FoodCategories
 ├─ BestSellingItems
 ├─ OrderTracking
 ├─ LiveDeliveryMap
 ├─ RewardSection
 └─ BottomNav
```

#### AdminDashboard (`/admin`)

```
AdminDashboard
 ├─ AdminSidebar
 └─ main content area
     ├─ KPICards
     ├─ SalesOverviewChart
     ├─ TopSellingPieChart
     ├─ SalesProfitLineChart
     ├─ LiveDeliveryMonitor
     ├─ RecentOrdersTable
     ├─ CustomerFeedbackChart
     └─ QuickActionsAdmin
```

---

## Routing Design

The router is configured in `src/routes/AppRoutes.jsx` using React Router v7 (the installed `react-router-dom` is v7, which ships the same component API as v6).

```jsx
// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage       from '../pages/LandingPage'
import CustomerDashboard from '../pages/CustomerDashboard'
import AdminDashboard    from '../pages/AdminDashboard'

const AppRoutes = () => (
  <Routes>
    <Route path="/"         element={<LandingPage />} />
    <Route path="/customer" element={<CustomerDashboard />} />
    <Route path="/admin"    element={<AdminDashboard />} />
    <Route path="*"         element={<Navigate to="/" replace />} />
  </Routes>
)
```

`BrowserRouter` wraps the entire tree in `src/App.jsx`, so all `<Link>` and `useNavigate` calls work without additional context. The `CartProvider` also lives in `App.jsx` so cart state persists across route transitions.

### In-App Navigation Patterns

| Trigger | Mechanism |
|---|---|
| Navbar "Order Now" button | `<Link to="/customer">` |
| Footer "Customer Portal" | `<Link to="/customer">` |
| Footer "Admin Dashboard" | `<Link to="/admin">` |
| Footer / Navbar section links | `href="#section-id"` smooth scroll |
| Unrecognized routes | `<Navigate to="/" replace />` |

---

## State Management

### CartContext

Located at `src/context/CartContext.jsx`. Wraps the entire app so any component can access cart state.

#### Context Shape

```typescript
interface CartItem {
  id:            number
  name:          string
  price:         number
  originalPrice: number
  image:         string
  category:      string
  rating:        number
  isVeg:         boolean
  quantity:      number   // always ≥ 1
}

interface CartContextValue {
  cartItems:     CartItem[]
  cartCount:     number        // sum of all item quantities
  cartTotal:     number        // sum of price × quantity
  isCartOpen:    boolean       // cart drawer open state
  setIsCartOpen: (open: boolean) => void
  addToCart:     (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart:(itemId: number) => void
  updateQuantity:(itemId: number, quantity: number) => void
  clearCart:     () => void
}
```

#### Behavioral Invariants

- `addToCart(item)`: if `item.id` is not in `cartItems`, appends `{ ...item, quantity: 1 }`. If already present, increments `quantity` by 1. Never creates duplicate entries.
- `updateQuantity(itemId, 0)`: delegates to `removeFromCart(itemId)`.
- `cartCount` is always `cartItems.reduce((s, i) => s + i.quantity, 0)`.
- `cartTotal` is always `cartItems.reduce((s, i) => s + i.price * i.quantity, 0)`.

### Local Component State Patterns

| Component | State | Type | Purpose |
|---|---|---|---|
| Navbar | `isMenuOpen` | boolean | Mobile drawer open/closed |
| Navbar | `scrolled` (via `useScrolled`) | boolean | Glassmorphism trigger |
| CustomerReviews | `currentSlide` | number | Active slider index |
| CustomerReviews | `isPaused` | boolean | Auto-advance pause |
| FoodCategories | `selectedCategory` | string | Active category chip |
| AdminSidebar | `isCollapsed` | boolean | Desktop sidebar width |
| AdminSidebar | `isMobileOpen` | boolean | Mobile drawer open/closed |
| CustomerDashboard | `activeTab` | string | Bottom nav active tab |
| CustomerHeader | `isNotifOpen` | boolean | Notification dropdown |

---

## Components and Interfaces

### Landing Page Components

#### `Navbar`

**Props:** none (reads `useScrolled`, uses React Router `<Link>`)

**State:**
- `scrolled` — from `useScrolled(80)` hook; triggers glassmorphism
- `isMenuOpen` — toggles mobile drawer

**Behavior:**
- Fixed-position, `z-50`, height `80px`.
- Two layout zones: left (logo + fire icon), center (desktop nav links, hidden `<1024px`), right ("Order Now" `<Link>` button, hidden `<1024px`; hamburger button shown `<1024px`).
- When `scrolled` is `true`, applies `navbarGlass.glass` variant via Framer Motion `animate` prop.
- Mobile drawer: `motion.div` with `x: "100%"` hidden / `x: 0` open, with an overlay backdrop `div`.

**Animation:** `navbarGlass` variant from `src/animations/variants.js`. Hamburger-to-X icon morphs using individual bar `motion.div` with `rotate` transitions.

---

#### `HeroSection`

**Props:** none

**Behavior:**
- Full `100vh` height container.
- Desktop (≥1024px): two equal columns. Left column has headline, subheading, two CTA buttons. Right column has chef image surrounded by radial gradient overlay.
- Mobile (<1024px): stacked single column, image below text.
- Three floating food emoji `motion.span` elements using `floatAnimation` variant (infinite y-loop).
- Parallax: `useScroll` + `useTransform` from Framer Motion maps `scrollY` → `y` offset for the right column image at 0.3× ratio.
- Entrance: left column uses `slideRight` variant, right column uses `slideLeft` variant, both with `initial="hidden" animate="visible"`.

---

#### `AchievementCounters`

**Props:** none

**Internal data:**
```js
const counters = [
  { label: 'Journey Started', value: 22, suffix: '+', prefix: '' },
  { label: 'Cities Experience', value: 5,  suffix: '+', prefix: '' },
  { label: 'Recipes', value: 100, suffix: '+', prefix: '' },
  { label: 'Content Reach', value: 1,   suffix: 'M+', prefix: '' },
  { label: 'Upcoming Branches', value: 3, suffix: '+', prefix: '' },
]
```

**Behavior:**
- `useInView(0.3, true)` on the section container; fires counter animation once.
- Each counter number rendered via `useCounterAnimation(target, 2000, inView)`.
- Grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`.

---

#### `JourneyTimeline`

**Props:** none

**Internal data:**
```js
const timelineSteps = [
  { year: '2018', title: 'Secure Job', description: '...', icon: '💼' },
  { year: '2019', title: 'Oberoi Experience', description: '...', icon: '🏨' },
  { year: '2020', title: '5 Cities Experience', description: '...', icon: '🗺️' },
  { year: '2021', title: 'YouTube Journey', description: '...', icon: '🎬' },
  { year: '2023', title: 'Mr. Khao Khilao Launch', description: '...', icon: '🔥' },
  { year: '2025', title: 'Franchise Expansion', description: '...', icon: '🚀' },
]
```

**Behavior:**
- Desktop (≥1024px): horizontal flex row, dots connected by a `div` line that GSAP animates from `scaleX: 0` to `scaleX: 1` using `ScrollTrigger`.
- Mobile (<1024px): vertical stack, line animates from `scaleY: 0` to `scaleY: 1`.
- Each dot gets a separate GSAP `to` tween with orange box-shadow glow triggered when it enters the viewport.
- GSAP initialization is inside a `useEffect` with cleanup `() => ScrollTrigger.getAll().forEach(t => t.kill())`.

---

#### `SignatureDishes`

**Props:** none (reads `signatureDishes` from `src/data/menuItems.js`, reads `useCart`)

**Behavior:**
- Renders the 4 bestseller dishes in a 2-column (mobile) / 4-column (desktop) responsive grid.
- Each `DishCard` subcomponent displays: image, name, price (₹ prefix), original price (line-through), tags (up to 2 `<Badge>`s), `<StarRating rating={item.rating} />`, and "Add" button.
- "Add" button calls `addToCart(item)`.
- Card hover: `motion.div` with `whileHover` mapped to `cardHover.hover` variant (scale 1.03, orange glow shadow).
- Section entrance: `staggerContainer` variant on the grid, `scaleIn` variant on each card.

---

#### `CustomerReviews`

**Props:** none (reads `customerReviews` from `src/data/reviews.js`)

**State:**
- `currentSlide: number` — 0-indexed active slide group
- `isPaused: boolean` — pauses auto-advance during user interaction

**Behavior:**
- Slides per view: 1 on mobile (<768px), 2 on tablet (768–1023px), 3 on desktop (≥1024px). Determined by a responsive variable (or via a `useWindowSize` helper).
- Total slide groups = `Math.ceil(reviews.length / slidesPerView)`.
- Auto-advance via `useEffect` with `setInterval(4000)` — clears and restarts when `currentSlide` changes or user interacts; respects `isPaused`.
- Previous/Next buttons call `setPrev`/`setNext` wrapping with modulo for circular navigation, then set a 2-second `isPaused` window.
- Dot indicators: one dot per slide group; active dot uses `orange-primary`.
- Each `ReviewCard` shows: circular avatar, name, location, `<StarRating>`, review body, `<Badge variant="verified">`, dish name.

---

#### `OutletsSection`

**Props:** none (reads `branches` from `src/data/branches.js`)

**Behavior:**
- Renders 4 `BranchCard` subcomponents in a responsive 1→2→4 column grid.
- Current outlet card (`isCurrent: true`): orange glow border (`shadow-orange-glow`, `border-orange-primary`), "Open Now" green badge, tel link, map link.
- Upcoming cards: "Coming Soon" badge, `established` field shown as Q-format string, no phone/hours.

---

#### `FranchiseSection`

**Props:** none

**Internal data:**
```js
const benefits = [
  { icon: '🏆', title: 'Proven Brand', description: '...' },
  { icon: '💰', title: 'High ROI', description: '...' },
  { icon: '🤝', title: 'Full Support', description: '...' },
  { icon: '📍', title: 'Exclusive Territory', description: '...' },
]
```

**Behavior:**
- Full-width container (`w-screen -mx-[calc((100vw-100%)/2)]` trick or `overflow-x: hidden` on parent).
- Background: 8+ `motion.div` fire particle elements, each with randomized `initial` position, looping `animate` with `y`, `opacity`, and `scale` keyframes (GSAP or Framer Motion `variants` with `repeat: Infinity`).
- "Apply Now" button: `href="mailto:franchise@mrkhaokhilao.com"` on an `<a>` tag.
- 4 benefit cards in a 2-column (mobile) / 4-column (desktop) grid using `staggerContainer` entrance.

---

#### `Footer`

**Props:** none

**Behavior:**
- Three-column layout on desktop, stacked on mobile.
- Column 1: brand logo, description, social icon links (`target="_blank" rel="noopener noreferrer"`).
- Column 2: contact info (tel link, Instagram string, address text, mailto link).
- Column 3: quick nav `<a href="#section-id">` links + `<Link to="/customer">` / `<Link to="/admin">`.

---

### Customer Dashboard Components

#### `CustomerHeader`

**Props:** none (reads `useCart`)

**State:**
- `isNotifOpen: boolean` — notification dropdown visibility

**Behavior:**
- Sticky top bar on the Customer Dashboard (not fixed-position; uses `sticky top-0 z-40`).
- Left: greeting "Hello Aman 👋" + location pill (hidden `<640px`).
- Center: search input (hidden `<768px`).
- Right: notification bell with badge, cart icon with badge (both use the badge display function).
- Badge display: count ≤ 0 → hidden; 1–9 → exact number; > 9 → "9+".
- Notification dropdown: `motion.div` with `AnimatePresence` + `scaleIn` variant. Closes on outside click via `useEffect` + `document.addEventListener('mousedown', handler)`.
- Avatar + name + "Gold Member" label on far right.

---

#### `FeaturedBanner`

**Props:** none

**Behavior:**
- Dark-to-orange radial gradient background with a repeating SVG dot pattern overlay (`background-image: url("data:image/svg+xml,...")`).
- Left column: headline in Poppins ExtraBold, subheading, two `<Button>` components.
- Right column: food image with two floating badge `motion.div` overlays using `floatAnimation` variant.
- Both CTA buttons use `onClick` handlers calling `element.scrollIntoView({ behavior: 'smooth' })` for the target section.

---

#### `QuickActions`

**Props:** none

**Internal data:**
```js
const actions = [
  { id: 'menu',    icon: FiGrid,      label: 'Menu',       sublabel: 'Explore', color: '#FF7A00', target: '#food-categories' },
  { id: 'orders',  icon: FiPackage,   label: 'My Orders',  sublabel: 'History', color: '#FFA726', target: '#order-tracking' },
  { id: 'track',   icon: FiMapPin,    label: 'Track Order',sublabel: 'Live',    color: '#FFD700', target: '#live-delivery' },
  { id: 'offers',  icon: FiTag,       label: 'Offers',     sublabel: 'Deals',   color: '#22C55E', target: '#featured-banner' },
  { id: 'rewards', icon: FiStar,      label: 'Rewards',    sublabel: 'Points',  color: '#FF7A00', target: '#reward-section' },
]
```

**Behavior:**
- 5-column grid (`grid-cols-5`), always.
- Tap animation via Framer Motion: `whileTap={{ scale: 0.95 }}` on press, then a short `animate` sequence to `scale: 1.06, y: -3` then back to `scale: 1, y: 0` using `useAnimation`.
- `onClick`: calls `document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })`.

---

#### `FoodCategories`

**Props:** none (reads `categories` from `src/data/menuItems.js`)

**State:**
- `selectedCategory: string` — default `'all'`

**Behavior:**
- Horizontal scrollable row: `flex overflow-x-auto scrollbar-hide gap-3`.
- Each chip: `motion.button` with `whileTap={{ scale: 0.95 }}`.
- Active chip: `bg-orange-primary text-white`. Inactive: `bg-bg-card text-muted border border-white/10`.
- On chip click: `setSelectedCategory(id)` + calls a callback / publishes via a shared ref to filter `BestSellingItems`.

**Communication with BestSellingItems:**
- `selectedCategory` state is lifted to `CustomerDashboard` page and passed down as props to both `FoodCategories` (setter) and `BestSellingItems` (filter value).

---

#### `BestSellingItems`

**Props:** `selectedCategory: string`

**Behavior:**
- Filters `menuItems` by `selectedCategory` (passes all when `'all'`).
- Grid: `grid-cols-2 lg:grid-cols-4`.
- Each `ItemCard` subcomponent:
  - Food image with `alt` attribute
  - Veg indicator: green circle icon
  - "Bestseller" `<Badge>` (conditional on `isBestseller`)
  - Dish name, `<StarRating>`, price (₹), original price (line-through), review count
  - **Add button vs Quantity control:**
    - If `cartItems.find(i => i.id === item.id)` is falsy → show "Add" `<Button>` calling `addToCart(item)`.
    - If found → show quantity row: `<button>−</button> {qty} <button>+</button>`.
    - `+` calls `updateQuantity(item.id, qty + 1)`.
    - `−` with qty > 1 calls `updateQuantity(item.id, qty - 1)`.
    - `−` with qty === 1 calls `removeFromCart(item.id)`.

---

#### `OrderTracking`

**Props:** none (reads `orderTrackingSteps` from `src/data/orders.js`)

**State:**
- `currentStep: number` — derived from the data (first step where `completed === false`, minus 1 as 1-indexed)

**Behavior:**
- 6-step tracker. Desktop (≥640px): horizontal row. Mobile: vertical stack.
- Step states:
  - `completed`: orange-filled icon circle, orange text.
  - `active` (current): orange icon with `animate-pulse-orange` ring wrapper.
  - `pending`: dimmed (`opacity-40`) icon, `text-muted` label.
- Progress line: a `div` or `motion.div` behind/between steps, animated via `useEffect` + Framer Motion `animate={{ width: progressPercent + '%' }}` with `transition={{ duration: 1.5, ease: 'easeOut' }}`.
- `progressPercent = ((currentStep - 1) / 5) * 100`
- ETA and "Track Live" button below the tracker.

---

#### `LiveDeliveryMap`

**Props:** none (reads `drivers` from `src/data/drivers.js`)

**State:**
- `activeDriver` — `drivers.find(d => d.status === 'On Delivery') ?? null`

**Behavior:**
- SVG container (fixed `viewBox="0 0 400 300"`).
- Road grid: static `<line>` and `<rect>` elements.
- Animated route: `<path>` element with `strokeDasharray` set to path length and `strokeDashoffset` animated from `pathLength` to `0` via Framer Motion `motion.path` over 3 seconds.
- Delivery dot: `<motion.circle>` using `offsetDistance` + `offsetPath` CSS property animation (or `motion.path` `pathLength` offset). Loops over 8 seconds.
- Outlet pin: `<text>` "🏪" at route start.
- Home pin: `<text>` "🏠" at route end.
- Driver info panel (shown if `activeDriver`): avatar, name, vehicle, `<StarRating>`, ETA. Hidden if no active driver with `status === 'On Delivery'`.

---

#### `RewardSection`

**Props:** none (reads `rewardsData`, `offers` from `src/data/rewards.js`)

**Behavior:**
- Points display: "320 pts" large heading.
- Progress bar: `useInView(0.3, true)` → `motion.div` width animates from 0 to `64%` over 1000ms on viewport entry.
- 4 milestone cards: `milestone.achieved = milestone.points <= rewardsData.currentPoints`.
- 3 offer cards: coupon code in `font-mono`, discount, expiry.
- Two `<Button>` components: "Redeem Points" (primary) and "History" (secondary/outlined).

---

#### `BottomNav`

**Props:** none (reads `useCart`)

**State:**
- `activeTab: string` — default `'home'` (lifted to `CustomerDashboard`)

**Behavior:**
- Fixed at bottom: `fixed bottom-0 left-0 right-0 z-50`.
- 5 tabs with Framer Motion `layoutId="activeTabIndicator"` pill that slides between active tabs.
- Cart badge uses same badge display logic as `CustomerHeader`.
- Tab selection scrolls to the corresponding section using `scrollIntoView`.

---

### Admin Dashboard Components

#### `AdminSidebar`

**Props:** none

**State:**
- `isCollapsed: boolean` — desktop collapse toggle
- `isMobileOpen: boolean` — mobile drawer

**Nav items:** 14 items grouped into Main (4), Management (6), System (4).

**Behavior:**
- Desktop: `motion.div` width transitions between `240px` and `72px` with `transition={{ type: 'spring', damping: 25, stiffness: 200 }}` (damping ≥ 20 per requirement 31.3).
- Collapsed state shows icons only; labels have `opacity: 0, width: 0` in a `motion.span`.
- Mobile: `position: fixed`, `x: '-100%'` when closed, `x: 0` when open. Overlay backdrop.
- Active item style: `bg-orange-primary/10 text-white border-l-2 border-orange-primary`.

---

#### `KPICards`

**Props:** none (reads `kpiData` from `src/data/analytics.js`)

**Behavior:**
- 4 cards: Today's Sales (₹12,480), Orders Today (87), Monthly Profit (₹38,200), Active Customers (1,240).
- `useInView(0.2, true)` → `useCounterAnimation(target, 2000, inView)`.
- Growth indicator: if `growth > 0` → `text-success` + up-arrow icon. If `growth < 0` → `text-danger` + down-arrow icon.
- Grid: `grid-cols-2 xl:grid-cols-4`.
- Currency formatting: `₹${value.toLocaleString('en-IN')}` for sales/profit; plain number for orders/customers.

---

#### `SalesOverviewChart`

**Props:** none (reads `monthlySalesData` from `src/data/analytics.js`)

**Behavior:**
- `<BarChart>` from Recharts. Current month bar uses `fill="#FF7A00"`, others use `fill="rgba(255,122,0,0.3)"`.
- `<YAxis tickFormatter={(v) => \`₹${v/1000}K\`} />`.
- Custom `<Tooltip content={<CustomTooltip />}>` component renders month + `₹${value.toLocaleString('en-IN')}`.
- Recharts `<ResponsiveContainer width="100%" height={300}>` wrapper.

---

#### `TopSellingPieChart`

**Props:** none (reads `topSellingItems` from `src/data/analytics.js`)

**Behavior:**
- `<PieChart>` → `<Pie dataSource={topSellingItems} innerRadius={60} outerRadius={90} dataKey="value">`.
- Each `<Cell fill={item.color} />`.
- Custom `<Tooltip>` showing item name + `${value}%`.
- Custom legend below chart: colored swatch + name + percent.

---

#### `SalesProfitLineChart`

**Props:** none (reads `monthlySalesData`)

**Behavior:**
- `<LineChart>` with two `<Line>` components:
  - Sales: `stroke="#FF7A00" type="monotone" activeDot={{ r: 6 }}`.
  - Profit: `stroke="#22C55E" type="monotone" activeDot={{ r: 6 }}`.
- Custom tooltip: month, `Sales: ₹${v}K`, `Profit: ₹${v}K`.
- `<Legend>` with matching color swatches.

---

#### `LiveDeliveryMonitor`

**Props:** none (reads `drivers`)

**Behavior:**
- Mini SVG map (similar to customer `LiveDeliveryMap`) showing dots for each `status === 'On Delivery'` driver.
- Scrollable driver list below map: avatar, name, vehicle, status badge, ETA.
- Status badge: `bg-success` for "Available", `bg-orange-primary` for "On Delivery".
- ETA: `<n> mins` or "—" if null.

---

#### `RecentOrdersTable`

**Props:** none (reads `recentOrders`)

**Behavior:**
- Desktop (≥768px): `<table>` with columns: Order ID, Customer (avatar + name), Items, Amount, Status, Time.
- Mobile (<768px): card list, each card stacks all 6 fields.
- Status badge colors from `statusColors` map in `src/data/orders.js`.

---

#### `CustomerFeedbackChart`

**Props:** none (reads `feedbackAnalytics`)

**Behavior:**
- `<RadialBarChart>` from Recharts with 3 segments (Positive 78%, Neutral 16%, Negative 6%).
- Center overlay: "4.7 /5" large text + "2,840 reviews" subtitle via absolute-positioned `div`.
- Rating distribution 5→1: `useInView(0.2, true)` → each bar `motion.div` width animates from 0 to percentage, with `transition={{ delay: index * 0.1, duration: 0.8 }}`.
- Legend: green/gold/red swatches.

---

#### `QuickActionsAdmin`

**Props:** none

**Internal data:**
```js
const adminActions = [
  { icon: FiPlusCircle, label: 'Add Menu Item',   description: '...', color: '#FF7A00' },
  { icon: FiTag,        label: 'Create Coupon',   description: '...', color: '#FFD700' },
  { icon: FiMapPin,     label: 'Add Branch',      description: '...', color: '#22C55E' },
  { icon: FiFileText,   label: 'Generate Report', description: '...', color: '#FFA726' },
]
```

**Behavior:**
- Grid: `grid-cols-2 md:grid-cols-4`.
- `whileHover={{ scale: 1.04, y: -3 }}` with `transition={{ duration: 0.2 }}`.
- `whileTap={{ scale: 0.97 }}`.
- On click: shows a toast notification or `console.log` indicating the action intent.

---

### Shared UI Components

#### `Button`

```jsx
// Props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size:    'sm' | 'md' | 'lg'
  onClick?: () => void
  href?:   string   // renders as <a> when present
  children: React.ReactNode
}
```

- `primary`: `bg-orange-primary text-white hover:bg-orange-secondary`.
- `secondary`: `border border-orange-primary text-orange-primary hover:bg-orange-primary/10`.
- `ghost`: `text-muted hover:text-white`.

#### `Badge`

```jsx
interface BadgeProps {
  variant: 'bestseller' | 'verified' | 'open' | 'coming-soon' | 'status' | 'count'
  color?:  string  // override accent
  children: React.ReactNode
}
```

#### `SectionTitle`

```jsx
interface SectionTitleProps {
  title:    string
  subtitle?: string
  align?:   'left' | 'center'
}
```

Renders an `<h2>` (Poppins ExtraBold) + optional `<p>` subtitle.

#### `StarRating`

```jsx
interface StarRatingProps {
  rating:   number  // 0–5, used as Math.floor for filled count
  size?:    'sm' | 'md'
  showValue?: boolean
}
```

Renders `Math.floor(rating)` filled stars + `(5 - Math.floor(rating))` empty stars using react-icons `FiStar` / `FiStar` filled variant.

---

## Data Models

All data lives in `src/data/` as static ES module exports. No network calls are made.

### MenuItem

```typescript
interface MenuItem {
  id:            number
  name:          string
  category:      'Chaap' | 'Paneer' | 'Rolls' | 'Momos' | 'Biryani' | 'Main Course'
  price:         number        // current price in INR
  originalPrice: number        // MRP in INR, always ≥ price
  rating:        number        // 0.0–5.0
  reviews:       number        // review count
  image:         string        // Unsplash URL
  description:   string
  isVeg:         boolean       // always true in current data
  isBestseller:  boolean
  tags:          string[]      // max 2 displayed
  calories:      number
}
```

### Category

```typescript
interface Category {
  id:   string   // 'all' | 'Chaap' | 'Paneer' | ...
  name: string
  icon: string   // emoji
}
```

### Branch

```typescript
interface Branch {
  id:           number
  name:         string
  city:         string
  state:        string
  address:      string
  phone:        string
  hours:        string
  status:       'Open Now' | 'Coming Soon'
  isCurrent:    boolean
  rating:       number | null
  totalReviews: number
  coordinates:  { lat: number; lng: number }
  image:        string
  established:  string   // e.g. "March 2023" or "Q2 2025"
}
```

### Driver

```typescript
interface Driver {
  id:              number
  name:            string
  avatar:          string   // randomuser.me URL
  phone:           string
  rating:          number
  vehicle:         string   // type + plate
  status:          'On Delivery' | 'Available'
  currentOrder:    string | null   // order ID like '#MKK-2402'
  eta:             string | null   // e.g. "12 mins"
  location:        string
  completedToday:  number
}
```

### Order

```typescript
interface Order {
  id:       string    // '#MKK-XXXX'
  customer: string
  avatar:   string
  items:    string[]  // item name strings
  amount:   number    // INR
  status:   'Delivered' | 'Out for Delivery' | 'Cooking' | 'Preparing' | 'Order Received' | 'Cancelled'
  time:     string    // relative, e.g. "2 mins ago"
  address:  string
}
```

### OrderTrackingStep

```typescript
interface OrderTrackingStep {
  id:        number      // 1–6
  label:     string
  icon:      string      // emoji
  time:      string      // scheduled time string
  completed: boolean
}
```

### Review

```typescript
interface Review {
  id:       number
  name:     string
  location: string
  avatar:   string
  rating:   number   // 1–5
  review:   string
  date:     string
  dish:     string
  verified: boolean
}
```

### RewardsData

```typescript
interface RewardsData {
  currentPoints: number
  nextMilestone: number
  totalEarned:   number
  totalRedeemed: number
  tier:          string
  tierBenefits:  string[]
  history:       RewardHistoryEntry[]
  milestones:    { points: number; reward: string; achieved: boolean }[]
}

interface RewardHistoryEntry {
  id:          number
  type:        'earned' | 'redeemed'
  points:      number   // negative for redeemed
  description: string
  date:        string
}
```

### Analytics

```typescript
interface MonthlySalesPoint {
  month:  string   // 3-letter abbreviation
  sales:  number   // INR
  orders: number
  profit: number   // INR
}

interface TopSellingItem {
  name:  string
  value: number   // percentage, all 5 items sum to 100
  color: string   // hex
}

interface KPIData {
  todaySales:       number
  ordersToday:      number
  monthlyProfit:    number
  activeCustomers:  number
  salesGrowth:      number   // %
  ordersGrowth:     number   // %
  profitGrowth:     number   // %
  customersGrowth:  number   // %
}
```

---

## Animation Strategy

### Library Roles

| Task | Library |
|---|---|
| Component entrance/exit (fade-up, slide, scale) | Framer Motion |
| Card hover interactions | Framer Motion `whileHover` |
| Tap / press feedback | Framer Motion `whileTap` |
| Layout-based indicator transitions (bottom nav pill) | Framer Motion `layoutId` |
| Navbar glassmorphism state change | Framer Motion `animate` |
| Mobile drawer slide-in/out | Framer Motion `AnimatePresence` + `motion.div` |
| Counter animations (0 → target) | GSAP / custom `useCounterAnimation` hook (rAF) |
| Timeline line draw on scroll | GSAP `ScrollTrigger` |
| Timeline dot glow on scroll | GSAP `ScrollTrigger` tweens |
| SVG route path draw | Framer Motion `motion.path` with `pathLength` |
| Driver dot route animation | CSS `offsetDistance` animation or Framer Motion |
| Reward/KPI progress bar entrance | Framer Motion `animate` triggered by `useInView` |
| Fire particle loops | Framer Motion `variants` with `repeat: Infinity` |

### Shared Framer Motion Variants (`src/animations/variants.js`)

| Export | Usage |
|---|---|
| `fadeUp` | Section containers, heading reveals |
| `fadeIn` | Overlay/backdrop elements |
| `slideLeft` | Hero right-column image |
| `slideRight` | Hero left-column text |
| `scaleIn` | Dish cards, KPI cards |
| `staggerContainer` | Grid parents (stagger 0.1s) |
| `staggerContainerFast` | Dense grids (stagger 0.07s) |
| `cardHover` | `motion.div` rest/hover states |
| `floatAnimation` | Floating emoji / badge overlays |
| `pulseGlow` | Active order tracking step ring |
| `navbarGlass` | Navbar background state |

### GSAP Integration Pattern

All GSAP usage lives inside `useEffect` with cleanup to prevent ScrollTrigger leaks:

```js
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])
```

### Reduced Motion

A `useReducedMotion` hook (from Framer Motion's `useReducedMotion`) or a CSS `@media (prefers-reduced-motion: reduce)` query gates all animations:

```js
const shouldReduceMotion = useReducedMotion()

// In variants:
const fadeUpVariant = shouldReduceMotion
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : fadeUp
```

GSAP animations check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before initializing ScrollTrigger tweens.

---

## Styling Conventions

### Tailwind Theme Extensions

All custom tokens are defined in `tailwind.config.js`:

```js
colors: {
  'bg-primary':       '#0D0D0D',   // page root background
  'bg-secondary':     '#161616',   // headers, sidebars, alternate sections
  'bg-card':          '#1A1A1A',   // card and modal surfaces
  'orange-primary':   '#FF7A00',   // primary CTA and accent
  'orange-secondary': '#FFA726',   // secondary accent / warm highlight
  'gold':             '#FFD700',   // premium highlight
  'muted':            '#B3B3B3',   // secondary/disabled text
  'success':          '#22C55E',   // positive states, available status
  'danger':           '#EF4444',   // negative states, error, cancelled
}
```

### Typography Tokens

| Element | Font | Weight | Class |
|---|---|---|---|
| h1–h6 | Poppins | 800 | `font-poppins font-extrabold` |
| Body, paragraphs | Inter | 400 | `font-inter font-normal` |
| Labels, sublabels | Inter | 500 | `font-inter font-medium` |
| Coupon codes | system monospace | 600 | `font-mono font-semibold` |

Fonts are loaded via `<link>` preconnects in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Custom Box Shadows

```js
boxShadow: {
  'orange-glow': '0 0 20px rgba(255, 122, 0, 0.4)',
  'gold-glow':   '0 0 20px rgba(255, 215, 0, 0.3)',
  'card':        '0 4px 24px rgba(0, 0, 0, 0.4)',
}
```

### Custom Animations

```js
animation: {
  'float':        'float 3s ease-in-out infinite',
  'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
  'fire':         'fire 1.5s ease-in-out infinite alternate',
}
```

### Naming Conventions

- Component files: PascalCase (`CustomerHeader.jsx`)
- Utility / data files: camelCase (`menuItems.js`)
- Tailwind classes: utility-first, no `@apply` except in `index.css` for base resets
- Color references always use the named token (e.g., `text-orange-primary`), never raw hex strings in JSX classnames

---

## Responsive Design Breakpoints

The application uses Tailwind's default breakpoint scale with a mobile-first approach (base = 375px):

| Breakpoint | Min-width | Tailwind Prefix | Notes |
|---|---|---|---|
| Mobile S | 375px | (base) | Default styles |
| Mobile L | 425px | (base+) | Minor tweaks if needed |
| Tablet | 640px | `sm:` | Grid column changes, show sublabels |
| Tablet L | 768px | `md:` | Show search in CustomerHeader, table view for orders |
| Desktop | 1024px | `lg:` | Desktop nav links, horizontal timeline, 4-col grid |
| Desktop L | 1280px | `xl:` | KPI cards 4-col, admin sidebar full |
| Desktop 2K | 1536px | `2xl:` | Max content width caps |

### Key Responsive Behaviors

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Navbar | Hamburger menu, no links | Hamburger menu | Full nav links + Order Now |
| Hero Section | Single column, image below | Single column | Two equal columns |
| Achievement Counters | 2 cols | 3 cols | 5 cols |
| Journey Timeline | Vertical, top-to-bottom | Vertical | Horizontal, left-to-right |
| Signature Dishes | 2 cols | 2 cols | 4 cols |
| Customer Reviews | 1 per slide | 2 per slide | 3 per slide |
| Best Selling Items | 2 cols | 2 cols | 4 cols |
| Order Tracker | Vertical steps | Horizontal steps | Horizontal steps |
| Admin Sidebar | Hidden (slide-in drawer) | Hidden (slide-in drawer) | Fixed left panel |
| KPI Cards | 2 cols | 2 cols | 4 cols (xl:) |
| Admin Quick Actions | 2 cols | 4 cols | 4 cols |
| Recent Orders Table | Card list | Full table | Full table |

### Touch Target Minimum

All interactive elements on touch viewports maintain a minimum touch target of 44×44px. Smaller icon buttons use padding to pad out to the minimum without changing visual size.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Counter Animation Convergence and Monotonicity

*For any* non-negative integer target value `t` and duration `d > 0`, the `useCounterAnimation` hook must satisfy two invariants: (1) the value returned at progress = 1.0 equals `t` exactly, and (2) for any two elapsed time points `e1 < e2`, the computed counter value at `e1` is less than or equal to the computed value at `e2` (the animation never goes backward).

**Validates: Requirements 4.2, 21.2**

---

### Property 2: Cart — New Item Creates Entry with Quantity 1

*For any* menu item whose `id` is not present in the current `cartItems` array, calling `addToCart(item)` must result in `cartItems` containing exactly one new entry with `id === item.id` and `quantity === 1`, and `cartCount` must increase by exactly 1.

**Validates: Requirements 6.4, 15.3**

---

### Property 3: Cart — Existing Item Increments Quantity, No Duplicate

*For any* `cartItems` array containing an item with `id === x` at quantity `q`, calling `addToCart({ id: x, ... })` must result in `cartItems` still containing exactly one entry for `id === x` with `quantity === q + 1`, and `cartItems.length` must be unchanged (no duplicate entry).

**Validates: Requirements 6.5, 15.4**

---

### Property 4: Badge Display Formatting

*For any* non-negative integer count `n`, the badge display function must satisfy: if `n === 0` the badge is hidden (returns null or empty); if `1 ≤ n ≤ 9` the badge displays the exact string representation of `n`; if `n > 9` the badge displays the string `"9+"` regardless of the actual value of `n`.

**Validates: Requirements 11.3, 11.4, 19.4**

---

### Property 5: Category Filter — All Results Match Selected Category

*For any* non-empty array of menu items and any selected category string `c ≠ "all"`, the result of filtering by `c` must contain only items where `item.category === c`. For the special case `c === "all"`, the result must contain every item from the original array. The filter must never add items not present in the input array.

**Validates: Requirements 14.4**

---

### Property 6: Milestone Achievement Is Determined by Threshold Comparison

*For any* current points value `p` and any milestone threshold `m`, the milestone must be in the "Achieved" state if and only if `m <= p`. For any two milestones with thresholds `m1 < m2` where `m2` is achieved, `m1` must also be achieved (the achieved set is always a prefix of the sorted milestone list).

**Validates: Requirements 18.4**

---

### Property 7: Percentage Bar Fill Is Clamped to [0, 100]

*For any* current value `v ≥ 0` and maximum value `max > 0`, the computed bar fill percentage `(v / max) * 100` must lie in the closed interval `[0, 100]`. When `v > max` (over-threshold edge case), the display must be capped at 100 and must not overflow the bar container.

**Validates: Requirements 18.1, 26.3**

---

### Property 8: KPI Growth Color Indicator Correctness

*For any* growth percentage value `g`, the indicator must display in `success` green (#22C55E) with an upward arrow if `g > 0`, and in `danger` red (#EF4444) with a downward arrow if `g < 0`. The indicator for `g === 0` must also display in `success` green (non-negative treated as positive). This must hold for all real-valued growth inputs including fractional and very large values.

**Validates: Requirements 21.3**

---

### Property 9: Chart Tooltip Contains Required Data Fields

*For any* monthly analytics data point object `{ month, sales, profit }`, the custom Recharts tooltip renderer must produce output that contains the `month` string label and a `₹`-prefixed numeric representation of the relevant value. The output must not be empty or null for any valid data point, and the numeric representation must use the Indian locale comma-separator format.

**Validates: Requirements 22.3, 24.4**

---

### Property 10: Unknown Routes Always Redirect to Landing Page

*For any* URL path string that does not exactly match `"/"`, `"/customer"`, or `"/admin"`, the router must render the `LandingPage` component (via `<Navigate to="/" replace />`). This must hold for arbitrary path strings including deeply nested paths, paths with query strings, and paths with special characters.

**Validates: Requirements 1.5**

---

## Error Handling

Since this is a frontend-only application with static mock data, error states are limited to UI-level concerns:

| Scenario | Handling Strategy |
|---|---|
| Image load failure | `onError` handler sets `src` to a local placeholder SVG fallback |
| Empty cart on Customer Dashboard | Conditional render: show "Your cart is empty" with an illustration |
| No active delivery driver | `LiveDeliveryMap` renders "No Active Delivery" placeholder message |
| `useCart` used outside `CartProvider` | Throws a descriptive error: `"useCart must be used within CartProvider"` |
| GSAP `ScrollTrigger` on SSR | Guard with `typeof window !== 'undefined'` check (not applicable for Vite/CSR, but defensive) |
| `useInView` with no ref attached | `IntersectionObserver` guard: `if (el) observer.observe(el)` prevents null reference |

---

## Testing Strategy

### Dual Testing Approach

The application uses both unit/example tests and property-based tests for comprehensive coverage.

**Unit tests** focus on:
- Specific rendering examples with concrete props
- Integration between CartContext and components
- Edge cases (empty cart, 0 reviews, max badge count)
- Routing examples (known and unknown paths)

**Property-based tests** focus on:
- Universal behavioral invariants (cart operations, counter animation, badge formatting, filters)
- Boundary and input-space coverage via randomized generation

### Recommended Testing Libraries

| Concern | Library |
|---|---|
| Unit / component tests | Vitest + React Testing Library |
| Property-based tests | `fast-check` (TypeScript-first PBT library for JS) |
| DOM assertions | `@testing-library/jest-dom` |

### Property-Based Test Configuration

- Minimum **100 iterations** per property test (`fc.assert(..., { numRuns: 100 })`).
- Each property test is tagged with a comment referencing the design document property:
  ```js
  // Feature: mr-khao-khilao-frontend, Property 2: Cart new item creates entry with quantity 1
  ```

### Property Test Examples

```js
// Property 2 — Cart add new item
import fc from 'fast-check'
import { cartReducer } from '../context/cartReducer'

test('Property 2: Cart — new item always creates entry with quantity 1', () => {
  // Feature: mr-khao-khilao-frontend, Property 2: Cart new item creates entry with quantity 1
  fc.assert(
    fc.property(
      fc.record({ id: fc.integer({ min: 1, max: 9999 }), name: fc.string(), price: fc.float({ min: 1 }) }),
      (item) => {
        const before = []
        const after = addToCart(before, item)
        const entry = after.find(i => i.id === item.id)
        return entry !== undefined && entry.quantity === 1 && after.length === 1
      }
    ),
    { numRuns: 100 }
  )
})

// Property 4 — Badge formatting
test('Property 4: Badge display formatting', () => {
  // Feature: mr-khao-khilao-frontend, Property 4: Badge display formatting
  fc.assert(
    fc.property(fc.nat(), (n) => {
      const display = getBadgeDisplay(n)
      if (n === 0) return display === null
      if (n <= 9) return display === String(n)
      return display === '9+'
    }),
    { numRuns: 100 }
  )
})
```

### Unit Test Examples

```js
// Routing smoke tests
test('renders LandingPage at /', () => { /* render App at '/', assert LandingPage content */ })
test('renders CustomerDashboard at /customer', () => { /* ... */ })
test('redirects unknown routes to /', () => { /* render App at '/xyz', assert LandingPage */ })

// Component examples
test('StarRating renders correct number of filled stars', () => { /* rating=4.8 → 4 filled, 1 empty */ })
test('OutletCard shows orange glow border for current outlet', () => { /* ... */ })
test('KPI growth indicator shows green for positive growth', () => { /* growth=12.5 → success class */ })
test('KPI growth indicator shows red for negative growth', () => { /* growth=-3.2 → danger class */ })
```

### What Is Not Property-Tested

- SVG map rendering (visual output, not a computable function)
- GSAP scroll animations (require DOM + scroll simulation, use integration/E2E instead)
- Recharts chart rendering (third-party library internals)
- Responsive layout at specific breakpoints (use visual regression or manual testing)
