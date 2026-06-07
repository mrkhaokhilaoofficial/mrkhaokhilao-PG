# Implementation Plan: Mr. Khao Khilao Frontend

## Overview

Implement the Mr. Khao Khilao React 19 + Vite + TailwindCSS single-page application incrementally, wiring up routing, global cart state, static data modules, shared UI components, all landing page sections, the customer dashboard, and the admin dashboard — each validated with property-based and unit tests using Vitest + fast-check + React Testing Library.

---

## Tasks

- [ ] 1. Project foundations — config, fonts, globals, animation variants, and test scaffold
  - Verify `tailwind.config.js` has all custom color tokens (`bg-primary`, `bg-secondary`, `bg-card`, `orange-primary`, `orange-secondary`, `gold`, `muted`, `success`, `danger`) and custom `boxShadow` / `animation` / `keyframes` entries
  - Ensure `src/index.css` resets `body` background to `#0D0D0D`, sets Poppins h1–h6 and Inter body fonts via Tailwind base layer
  - Ensure `index.html` has Google Fonts `<link>` preconnects for Poppins (weights 400–800) and Inter (400–600)
  - Ensure `src/animations/variants.js` exports all required Framer Motion variant objects: `fadeUp`, `fadeIn`, `slideLeft`, `slideRight`, `scaleIn`, `staggerContainer`, `staggerContainerFast`, `cardHover`, `floatAnimation`, `pulseGlow`, `navbarGlass`
  - Install and configure Vitest + React Testing Library + fast-check: update `vite.config.js` with `test` block, add `setupTests.js` with `@testing-library/jest-dom`, update `package.json` test script
  - _Requirements: 30.1, 30.2, 30.3, 30.4, 30.5, 31.1, 31.3_

- [ ] 2. Static data modules
  - [ ] 2.1 Implement `src/data/menuItems.js`
    - Export `menuItems` array of at least 8 `MenuItem` objects covering all 6 categories (Chaap, Paneer, Rolls, Momos, Biryani, Main Course); include the 4 signature dishes as `isBestseller: true`; export `categories` array of 7 `Category` objects (All + 6 named); all items `isVeg: true`; `originalPrice >= price`; `tags.length <= 2`
    - _Requirements: 6.1, 14.1, 15.2_

  - [ ] 2.2 Implement `src/data/branches.js`
    - Export `branches` array of exactly 4 `Branch` objects: index 0 = Railtoly Gondia (`isCurrent: true`, `status: 'Open Now'`), indices 1–3 = upcoming branches with `status: 'Coming Soon'`; include `coordinates`, `established`, `phone`, `hours`, `rating`, `totalReviews`, `image`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 2.3 Implement `src/data/reviews.js`
    - Export `customerReviews` array of at least 6 `Review` objects; each has `id`, `name`, `location`, `avatar` (randomuser.me URL), `rating` (1–5), `review`, `date`, `dish`, `verified`
    - _Requirements: 7.1, 7.2_

  - [ ] 2.4 Implement `src/data/orders.js`
    - Export `orderTrackingSteps` array of exactly 6 `OrderTrackingStep` objects (Order Received → Delivered) with some `completed: true` and one `completed: false` to define the active step; export `recentOrders` array of 5 `Order` objects covering all status variants; export `statusColors` map
    - _Requirements: 16.1, 27.1, 27.2_

  - [ ] 2.5 Implement `src/data/drivers.js`
    - Export `drivers` array of at least 3 `Driver` objects; at least one with `status: 'On Delivery'` and a non-null `eta`; include `avatar`, `vehicle`, `rating`, `currentOrder`, `completedToday`
    - _Requirements: 17.5, 25.2, 25.3, 25.4_

  - [ ] 2.6 Implement `src/data/rewards.js`
    - Export `rewardsData` object with `currentPoints: 320`, `nextMilestone: 500`, `tier`, `tierBenefits`, `history` (array of `RewardHistoryEntry`), `milestones` (exactly 4 thresholds: 100, 250, 500, 1000); export `offers` array of exactly 3 offer objects with `code`, `discount`, `expiry`
    - _Requirements: 18.1, 18.4, 18.5_

  - [ ] 2.7 Implement `src/data/analytics.js`
    - Export `kpiData` (`KPIData` shape with `todaySales: 12480`, `ordersToday: 87`, `monthlyProfit: 38200`, `activeCustomers: 1240`, plus growth percentages); export `monthlySalesData` array of 12 `MonthlySalesPoint` objects; export `topSellingItems` array of 5 `TopSellingItem` objects whose `value` fields sum to exactly 100; export `feedbackAnalytics` (Positive 78%, Neutral 16%, Negative 6%, rating distribution 1–5)
    - _Requirements: 21.1, 22.1, 23.1, 24.1, 26.1, 26.2_

- [ ] 3. Custom hooks
  - [ ] 3.1 Implement `src/hooks/useInView.js`
    - Export `useInView(threshold, once)` using `IntersectionObserver`; returns `[ref, inView]`; guards `if (el) observer.observe(el)`; unobserves when `once && inView`
    - _Requirements: 4.2, 18.2, 21.2, 26.4_

  - [ ] 3.2 Implement `src/hooks/useCounterAnimation.js`
    - Export `useCounterAnimation(target, duration, active)`; uses `requestAnimationFrame` with cubic ease-out; returns monotonically increasing integer value from 0 to `target`; returns `target` exactly when progress reaches 1.0
    - _Requirements: 4.2, 21.2_

  - [ ]* 3.3 Write property test for `useCounterAnimation`
    - **Property 1: Counter Animation Convergence and Monotonicity** — for any non-negative integer target `t` and duration `d > 0`, the value at progress=1.0 equals `t` exactly, and for any `e1 < e2` the value at `e1 ≤` value at `e2`
    - **Validates: Requirements 4.2, 21.2**

  - [ ] 3.4 Implement `src/hooks/useScrolled.js`
    - Export `useScrolled(threshold)` using `window.addEventListener('scroll', ...)` with cleanup; returns boolean `true` when `window.scrollY > threshold`
    - _Requirements: 2.5_

- [ ] 4. Shared UI components
  - [ ] 4.1 Implement `src/components/ui/Button.jsx`
    - Accept props `variant` ('primary' | 'secondary' | 'ghost'), `size` ('sm' | 'md' | 'lg'), `onClick`, `href`, `children`; render `<a>` when `href` is provided, otherwise `<button>`; apply correct Tailwind classes per variant; min touch target 44×44px; `type="button"` on button elements
    - _Requirements: 12.2, 18.3, 30.1_

  - [ ] 4.2 Implement `src/components/ui/Badge.jsx`
    - Accept props `variant` ('bestseller' | 'verified' | 'open' | 'coming-soon' | 'status' | 'count'), `color` (optional override), `children`; render correct background/text color per variant
    - _Requirements: 6.2, 7.2, 8.2, 8.3_

  - [ ] 4.3 Implement `src/components/ui/StarRating.jsx`
    - Accept `rating` (0–5), `size` ('sm'|'md'), `showValue` (boolean); render `Math.floor(rating)` filled stars + `(5 - Math.floor(rating))` empty stars using react-icons `FiStar`; optionally show numeric value
    - _Requirements: 6.2, 7.2_

  - [ ] 4.4 Implement `src/components/ui/SectionTitle.jsx`
    - Accept `title`, `subtitle`, `align` ('left'|'center'); render `<h2>` in Poppins ExtraBold + optional `<p>` subtitle; apply alignment class
    - _Requirements: 30.3_

- [ ] 5. CartContext and routing skeleton
  - [ ] 5.1 Implement `src/context/CartContext.jsx`
    - Export `CartProvider` and `useCart`; internal state: `cartItems`, `isCartOpen`; expose `cartCount`, `cartTotal`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `setIsCartOpen`; `addToCart` appends new entry at `quantity: 1` if `id` not present, else increments `quantity`; `updateQuantity(id, 0)` delegates to `removeFromCart`; `cartCount = cartItems.reduce((s,i) => s+i.quantity, 0)`; `cartTotal = cartItems.reduce((s,i) => s+i.price*i.quantity, 0)`; throw descriptive error if `useCart` called outside `CartProvider`
    - _Requirements: 6.4, 6.5, 15.3, 15.4, 11.4, 19.4_

  - [ ]* 5.2 Write property tests for `CartContext` operations
    - **Property 2: Cart — New Item Creates Entry with Quantity 1** — for any item whose id is absent from `cartItems`, `addToCart` produces exactly one entry with `quantity === 1` and `cartCount` increases by 1
    - **Property 3: Cart — Existing Item Increments Quantity, No Duplicate** — for any existing item at quantity `q`, `addToCart` with same id yields `quantity === q+1` and `cartItems.length` unchanged
    - **Validates: Requirements 6.4, 6.5, 15.3, 15.4**

  - [ ] 5.3 Implement `src/routes/AppRoutes.jsx`
    - Use React Router v7 `<Routes>`/`<Route>`; define routes for `/` → `LandingPage`, `/customer` → `CustomerDashboard`, `/admin` → `AdminDashboard`, `*` → `<Navigate to="/" replace />`
    - _Requirements: 1.1, 1.2, 1.3, 1.5_

  - [ ] 5.4 Implement `src/App.jsx`
    - Wrap tree: `<BrowserRouter>` → `<CartProvider>` → `<AppRoutes>`; no extra layout wrappers
    - _Requirements: 1.4_

  - [ ]* 5.5 Write property test for routing — unknown paths redirect to Landing Page
    - **Property 10: Unknown Routes Always Redirect to Landing Page** — for any path string not matching `/`, `/customer`, or `/admin`, the router renders `LandingPage`; use `fc.string()` filtered to exclude known paths; use `MemoryRouter` with initial entry
    - **Validates: Requirements 1.5**

- [ ] 6. Checkpoint — run tests, verify routing and CartContext
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Landing Page — Navbar
  - [ ] 7.1 Implement `src/components/landing/Navbar.jsx`
    - Fixed position, `z-50`, height 80px; left: logo "Mr. Khao Khilao" + fire icon; center: nav links (Home, Journey, Menu, Reviews, Franchise, Contact) as `href="#section-id"` anchors, `hidden lg:flex`; right: `<Link to="/customer">` "Order Now" button, `hidden lg:block`; hamburger button `lg:hidden`; `useScrolled(80)` drives glassmorphism via `navbarGlass` Framer Motion variant on `animate` prop; hamburger-to-X bar morphing via individual bar `motion.div` `rotate` transitions; mobile drawer `motion.div` `x: "100%"` → `x: 0` with `AnimatePresence` and overlay backdrop `div`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 29.3_

- [ ] 8. Landing Page — HeroSection
  - [ ] 8.1 Implement `src/components/landing/HeroSection.jsx`
    - Container `min-h-screen` (100vh); desktop (`lg:`): two equal 50% columns — left: headline "Taste Se Shuruaat... Brand Tak Ka Safar" in Poppins ExtraBold, subheading, "Explore Menu" + "Our Journey" `<Button>` pair; right: chef image with radial gradient + blurred overlay; mobile: single column stack; at least 3 floating emoji (`🌶️ 🍅 🌿`) as `motion.span` with `floatAnimation` infinite y-loop; parallax via `useScroll` + `useTransform` 0.3× ratio on right column; entrance: left uses `slideRight`, right uses `slideLeft` variants; `useReducedMotion` guard
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 31.6_

- [ ] 9. Landing Page — AchievementCounters
  - [ ] 9.1 Implement `src/components/landing/AchievementCounters.jsx`
    - 5 counter cards with labels and values: 22+ Journey Started, 5+ Cities Experience, 100+ Recipes, 1M+ Content Reach, 3+ Upcoming Branches; `useInView(0.3, true)` fires once; each number from `useCounterAnimation(target, 2000, inView)`; responsive grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`; `staggerContainer` on grid, `scaleIn` on each card
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 10. Landing Page — JourneyTimeline
  - [ ] 10.1 Implement `src/components/landing/JourneyTimeline.jsx`
    - 6 timeline steps (Secure Job 2018, Oberoi Experience 2019, 5 Cities Experience 2020, YouTube Journey 2021, Mr. Khao Khilao Launch 2023, Franchise Expansion 2025) each with year, title, description, icon; desktop (`lg:`): horizontal flex row, `div` connecting line with `ref` animated via GSAP `scaleX: 0 → 1` with `ScrollTrigger scrub: 1`, `transformOrigin: 'left center'`; mobile: vertical stack, line animated `scaleY: 0 → 1`; each dot gets GSAP `to` tween adding orange box-shadow glow when it enters viewport; cleanup `ctx.revert()` in `useEffect` return; `prefers-reduced-motion` guard
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 31.2, 31.6_

- [ ] 11. Landing Page — SignatureDishes
  - [ ] 11.1 Implement `src/components/landing/SignatureDishes.jsx`
    - Read 4 bestseller dishes from `menuItems` (filter `isBestseller: true`, take first 4 in order: Saoji Chaap Roll, Classic Paneer Tikka, Makhani Momos, Chaap Biryani); `useCart` for `addToCart`; responsive grid `grid-cols-2 lg:grid-cols-4`; `DishCard` subcomponent shows: image, name, `₹price`, `₹originalPrice` with `line-through`, up to 2 `<Badge>` tags, `<StarRating>`, "Add" button with cart icon; card uses `motion.div whileHover` with `cardHover` variant (scale 1.03, orange glow shadow); section uses `staggerContainer` + `scaleIn` entrance
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 12. Landing Page — CustomerReviews
  - [ ] 12.1 Implement `src/components/landing/CustomerReviews.jsx`
    - Read from `customerReviews`; state: `currentSlide`, `isPaused`; responsive slides-per-view: 1 mobile (<768px), 2 tablet (768–1023px), 3 desktop (≥1024px); computed from `window.innerWidth` or `matchMedia`; total groups = `Math.ceil(reviews.length / slidesPerView)`; `ReviewCard` shows circular avatar, name, location, `<StarRating>`, review body, `<Badge variant="verified">`, dish name; auto-advance `setInterval(4000)` clears on slide change or interaction; previous/next buttons set 2-second `isPaused`; dot indicators; circular navigation with modulo
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 13. Landing Page — OutletsSection
  - [ ] 13.1 Implement `src/components/landing/OutletsSection.jsx`
    - Read from `branches`; responsive grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`; `BranchCard` for current outlet (`isCurrent: true`): name, address, `tel:` link, hours, `<Badge variant="open">` "Open Now", star rating + review count, "View on Map" link; upcoming cards: `<Badge variant="coming-soon">`, `established` as Q-format; current outlet card styled with `border-orange-primary shadow-orange-glow`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 14. Landing Page — FranchiseSection
  - [ ] 14.1 Implement `src/components/landing/FranchiseSection.jsx`
    - Full-width container (100vw, negative margin trick or `overflow-hidden` on parent); headline "Become A Franchise Partner" Poppins ExtraBold; subheading text; "Apply Now" `<a href="mailto:franchise@mrkhaokhilao.com">` button; at least 8 `motion.div` fire particle elements with looping `y`, `opacity`, `scale` keyframe animations (`repeat: Infinity`); 4 benefit cards (Proven Brand, High ROI, Full Support, Exclusive Territory) in `grid-cols-2 lg:grid-cols-4` using `staggerContainer` entrance; `useReducedMotion` disables particles
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 15. Landing Page — Footer
  - [ ] 15.1 Implement `src/components/landing/Footer.jsx`
    - Three-column desktop, stacked mobile; col 1: brand logo, description, social icon links (Instagram, YouTube, Facebook, Twitter) each `target="_blank" rel="noopener noreferrer"`; col 2: `tel:` link, Instagram handle string, address text, `mailto:` link; col 3: quick nav `<a href="#section-id">` links (Home, Journey, Menu, Reviews, Franchise, Outlets, Contact) + `<Link to="/customer">` "Customer Portal" + `<Link to="/admin">` "Admin Dashboard"
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [ ] 16. Assemble LandingPage
  - [ ] 16.1 Implement `src/pages/LandingPage.jsx`
    - Import and compose all 9 landing components in order: `Navbar`, `HeroSection`, `AchievementCounters`, `JourneyTimeline`, `SignatureDishes`, `CustomerReviews`, `OutletsSection`, `FranchiseSection`, `Footer`; assign section `id` attributes for smooth scroll anchors; `bg-bg-primary` root background
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1_

- [ ] 17. Checkpoint — Landing Page visible and routing works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 18. Customer Dashboard — CustomerHeader
  - [ ] 18.1 Implement `src/components/customer/CustomerHeader.jsx`
    - `useCart` for `cartCount`; sticky `top-0 z-40`; left: greeting "Hello Aman 👋" + location pill "Civil Lines, Gondia" with map-pin icon (`hidden sm:flex`); center: search input (`hidden md:block`); right: notification bell with orange badge (count badge using `badgeDisplay` helper: 0→hidden, 1–9→exact, >9→"9+"), cart icon with same badge logic; `isNotifOpen` state toggles `motion.div` notification dropdown with `AnimatePresence + scaleIn`; close-on-outside-click via `useEffect + document.addEventListener('mousedown')`; avatar + "Aman" + "Gold Member" label
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

  - [ ]* 18.2 Write property test for badge display helper
    - **Property 4: Badge Display Formatting** — for any `fc.nat()` value `n`: `n===0` → `null`; `1≤n≤9` → exact string; `n>9` → `"9+"`; export `getBadgeDisplay` as a pure helper from `src/utils/badgeDisplay.js` for testability
    - **Validates: Requirements 11.3, 11.4, 19.4**

- [ ] 19. Customer Dashboard — FeaturedBanner
  - [ ] 19.1 Implement `src/components/customer/FeaturedBanner.jsx`
    - Headline "Taste Jo Dil Se Bante Hai" in Poppins ExtraBold; "Order Now" primary `<Button>` (scrolls to best-selling section) + "View Menu" secondary `<Button>` (scrolls to food-categories); both keyboard-focusable; right: food image with 2 floating badge `motion.div` overlays (⭐ 4.9 Rating, 🔥 Bestseller) using `floatAnimation`; dark-to-orange radial gradient background with SVG dot pattern overlay
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [ ] 20. Customer Dashboard — QuickActions
  - [ ] 20.1 Implement `src/components/customer/QuickActions.jsx`
    - 5 action cards (Menu → `#food-categories`, My Orders → `#order-tracking`, Track Order → `#live-delivery`, Offers → `#featured-banner`, Rewards → `#reward-section`); `grid-cols-5` always; each card: colored react-icons icon, bold label, sublabel (`hidden sm:block`); tap animation via Framer Motion `useAnimation`: pointer-down → `scale: 0.95`, release → `scale: 1.06, y: -3` then back to `1, 0`; `onClick` calls `scrollIntoView({ behavior: 'smooth' })`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 21. Customer Dashboard — FoodCategories and BestSellingItems
  - [ ] 21.1 Implement `src/components/customer/FoodCategories.jsx`
    - Accept `selectedCategory` and `setSelectedCategory` props; render 7 category chips (All, Chaap, Paneer, Rolls, Momos, Biryani, Main Course) from `categories`; `flex overflow-x-auto scrollbar-hide gap-3`; each chip `motion.button whileTap={{ scale: 0.95 }}`; active: `bg-orange-primary text-white`; inactive: `bg-bg-card text-muted border border-white/10`; default active: `'all'`
    - _Requirements: 14.1, 14.2, 14.3, 14.5_

  - [ ]* 21.2 Write property test for category filter
    - **Property 5: Category Filter — All Results Match Selected Category** — for any non-empty items array and any `c ≠ "all"`, filtered result contains only items where `item.category === c`; for `c === "all"`, result equals full array; filter never adds items not in input; test with `fc.array(fc.record(...))` and `fc.constantFrom(...categories)`
    - **Validates: Requirements 14.4**

  - [ ] 21.3 Implement `src/components/customer/BestSellingItems.jsx`
    - Accept `selectedCategory` prop; filter `menuItems` by category; `grid-cols-2 lg:grid-cols-4`; `ItemCard`: image with `alt`, veg indicator (green circle), `<Badge>` "Bestseller" (conditional), name, `<StarRating>`, `₹price`, `₹originalPrice line-through`, review count; if item not in cart → "Add" `<Button>` calling `addToCart`; if in cart → quantity row: `−` / qty / `+` buttons; `+` → `updateQuantity(id, qty+1)`; `−` with qty>1 → `updateQuantity(id, qty-1)`; `−` with qty===1 → `removeFromCart(id)` and "Add" reappears
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 22. Customer Dashboard — OrderTracking
  - [ ] 22.1 Implement `src/components/customer/OrderTracking.jsx`
    - Read `orderTrackingSteps` from `orders.js`; derive `currentStep` (index of first `completed === false`); 6 steps: Order Received, Preparing, Cooking, Packed, Out For Delivery, Delivered; horizontal layout `sm:` and above, vertical below; step visual states: completed (orange icon + orange text), active (orange + `animate-pulse-orange` ring wrapper via `pulseGlow` variant), pending (`opacity-40 text-muted`); progress line `motion.div` animates from 0 to `((currentStep-1)/5)*100%` over 1500ms ease-out on mount; ETA text + "Track Live" button below
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

- [ ] 23. Customer Dashboard — LiveDeliveryMap
  - [ ] 23.1 Implement `src/components/customer/LiveDeliveryMap.jsx`
    - Read from `drivers`; `activeDriver = drivers.find(d => d.status === 'On Delivery') ?? null`; SVG `viewBox="0 0 400 300"`; static road grid `<line>`/`<rect>` elements; animated route `motion.path` with `strokeDasharray` + `strokeDashoffset` animating from `pathLength` to `0` over 3s on mount; delivery dot `motion.circle` looping over 8s using CSS `offsetDistance`/`offsetPath` or Framer Motion; outlet pin 🏪 `<text>` at route start; home pin 🏠 at route end; driver info panel below map if `activeDriver` (avatar, name, vehicle, `<StarRating>`, ETA); "No Active Delivery" placeholder if `!activeDriver`
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [ ] 24. Customer Dashboard — RewardSection
  - [ ] 24.1 Implement `src/components/customer/RewardSection.jsx`
    - Read `rewardsData` and `offers` from `rewards.js`; "320 pts" large heading; `useInView(0.3, true)` triggers `motion.div` progress bar width 0% → 64% over 1000ms ease-out, fires once; 4 milestone cards with achieved/pending states (`milestone.points <= rewardsData.currentPoints` → achieved: colored + checkmark; else pending: dimmed + lock); 3 offer cards with `code` in `font-mono`, discount, expiry; "Redeem Points" primary + "History" secondary `<Button>`s, both keyboard-focusable
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

  - [ ]* 24.2 Write property tests for milestone achievement and progress bar
    - **Property 6: Milestone Achievement Is Determined by Threshold Comparison** — for any `p` and `m`, achieved iff `m <= p`; achieved set is always a prefix of sorted milestones; use `fc.integer` for both
    - **Property 7: Percentage Bar Fill Is Clamped to [0, 100]** — for any `v ≥ 0` and `max > 0`, `(v/max)*100` is in `[0, 100]`; when `v > max` result is capped at 100; export pure helpers `isMilestoneAchieved` and `computeBarFill` from `src/utils/rewardsUtils.js`
    - **Validates: Requirements 18.1, 18.4, 26.3**

- [ ] 25. Customer Dashboard — BottomNav
  - [ ] 25.1 Implement `src/components/customer/BottomNav.jsx`
    - Accept `activeTab`/`setActiveTab` props (lifted to `CustomerDashboard`); `fixed bottom-0 left-0 right-0 z-50`; 5 tabs (Home, Menu, Cart, Orders, Profile); Framer Motion `layoutId="activeTabIndicator"` pill slides between active tabs; active tab: `text-orange-primary`; cart badge via `badgeDisplay` helper; tab click scrolls to corresponding section via `scrollIntoView`; Home → scroll to top; default active: 'home'
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

- [ ] 26. Assemble CustomerDashboard
  - [ ] 26.1 Implement `src/pages/CustomerDashboard.jsx`
    - Lift `selectedCategory` (default `'all'`) and `activeTab` (default `'home'`) state here; compose: `CustomerHeader`, `FeaturedBanner` (`id="featured-banner"`), `QuickActions`, `FoodCategories` (pass `selectedCategory`/`setSelectedCategory`), `BestSellingItems` (pass `selectedCategory`) (`id="food-categories"`), `OrderTracking` (`id="order-tracking"`), `LiveDeliveryMap` (`id="live-delivery"`), `RewardSection` (`id="reward-section"`), `BottomNav` (pass `activeTab`/`setActiveTab`); `bg-bg-primary pb-20` (space for BottomNav)
    - _Requirements: 1.2, 11.1, 12.1, 13.1, 14.1, 15.1, 16.1, 17.1, 18.1, 19.1_

- [ ] 27. Checkpoint — Customer Dashboard fully functional
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 28. Admin Dashboard — AdminSidebar
  - [ ] 28.1 Implement `src/components/admin/AdminSidebar.jsx`
    - State: `isCollapsed` (desktop), `isMobileOpen` (mobile); 14 nav items grouped: Main (Dashboard, Orders, Live Tracking, Analytics), Management (Menu Items, Customers, Coupons, Inventory, Branches, Employees), System (Feedback, Reports, Settings, Logout); desktop: `motion.div` width spring between 240px and 72px (`damping: 25, stiffness: 200`); collapsed: labels `opacity: 0, width: 0` via `motion.span`; mobile: `position: fixed, x: '-100%' / x: 0` with overlay backdrop; active item: `bg-orange-primary/10 text-white border-l-2 border-orange-primary`; hamburger toggle button visible `<1024px`
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 29.4, 31.3_

- [ ] 29. Admin Dashboard — KPICards
  - [ ] 29.1 Implement `src/components/admin/KPICards.jsx`
    - Read `kpiData`; 4 cards: Today's Sales ₹12,480, Orders Today 87, Monthly Profit ₹38,200, Active Customers 1,240; `useInView(0.2, true)` + `useCounterAnimation(target, 2000, inView)` per card; growth indicator: `g > 0` or `g === 0` → `text-success` + up arrow; `g < 0` → `text-danger` + down arrow + label "vs last month"; currency: `₹${v.toLocaleString('en-IN')}`; grid `grid-cols-2 xl:grid-cols-4`; `scaleIn` entrance with `staggerContainer`
    - _Requirements: 21.1, 21.2, 21.3, 21.4_

  - [ ]* 29.2 Write property test for KPI growth color indicator
    - **Property 8: KPI Growth Color Indicator Correctness** — for any `fc.float()` value `g`: `g > 0` → success green + up arrow; `g < 0` → danger red + down arrow; `g === 0` → success green; export pure `getGrowthIndicator(g)` helper from `src/utils/kpiUtils.js`
    - **Validates: Requirements 21.3**

- [ ] 30. Admin Dashboard — SalesOverviewChart
  - [ ] 30.1 Implement `src/components/admin/SalesOverviewChart.jsx`
    - Read `monthlySalesData`; Recharts `<ResponsiveContainer width="100%" height={300}>`; `<BarChart>`; current month bar `fill="#FF7A00"`, others `fill="rgba(255,122,0,0.3)"`; `<YAxis tickFormatter={(v) => \`₹${v/1000}K\`} />`; `<Tooltip content={<CustomTooltip />}>` renders month + `₹${value.toLocaleString('en-IN')}`; dark chart background via `fill="transparent"` container
    - _Requirements: 22.1, 22.2, 22.3, 22.4_

- [ ] 31. Admin Dashboard — TopSellingPieChart
  - [ ] 31.1 Implement `src/components/admin/TopSellingPieChart.jsx`
    - Read `topSellingItems` (5 segments summing to 100%); `<ResponsiveContainer>`; `<PieChart>` → `<Pie innerRadius={60} outerRadius={90} dataKey="value">`; `<Cell fill={item.color}/>` per segment; custom `<Tooltip>` showing name + `${value}%`; custom legend below: colored swatch + name + percent
    - _Requirements: 23.1, 23.2, 23.3, 23.4_

- [ ] 32. Admin Dashboard — SalesProfitLineChart
  - [ ] 32.1 Implement `src/components/admin/SalesProfitLineChart.jsx`
    - Read `monthlySalesData`; `<ResponsiveContainer>`; `<LineChart>`; two `<Line type="monotone">`: Sales `stroke="#FF7A00" activeDot={{ r: 6 }}`, Profit `stroke="#22C55E" activeDot={{ r: 6 }}`; custom tooltip: month, `Sales: ₹${v}K`, `Profit: ₹${v}K`; `<Legend>` with color swatches
    - _Requirements: 24.1, 24.2, 24.3, 24.4_

  - [ ]* 32.2 Write property test for chart tooltip data fields
    - **Property 9: Chart Tooltip Contains Required Data Fields** — for any `{ month, sales, profit }` data point, tooltip renderer returns string containing the `month`, a `₹`-prefixed value, and Indian locale comma formatting; export pure `formatTooltipValue(value)` and `formatTooltipRow(month, sales, profit)` helpers from `src/utils/chartUtils.js`
    - **Validates: Requirements 22.3, 24.4**

- [ ] 33. Admin Dashboard — LiveDeliveryMonitor
  - [ ] 33.1 Implement `src/components/admin/LiveDeliveryMonitor.jsx`
    - Read `drivers`; mini SVG map showing each driver with `status === 'On Delivery'` as an animated `motion.circle` looping along a route line; scrollable driver list below map: avatar, name, vehicle, status badge, ETA; badge `bg-success` for "Available", `bg-orange-primary` for "On Delivery"; ETA: `${n} mins` or "—" if null
    - _Requirements: 25.1, 25.2, 25.3, 25.4_

- [ ] 34. Admin Dashboard — RecentOrdersTable
  - [ ] 34.1 Implement `src/components/admin/RecentOrdersTable.jsx`
    - Read first 5 orders from `recentOrders`; desktop (≥768px): `<table>` with columns Order ID, Customer (avatar + name), Items (names list), Amount (`₹` + Indian locale), Status badge, Time; mobile (<768px): card list with all 6 fields stacked; status badge colors from `statusColors` map: Delivered → `#22C55E`, Out for Delivery → `#FF7A00`, Preparing → `#FFD700`, Cancelled → `#EF4444`
    - _Requirements: 27.1, 27.2, 27.3_

- [ ] 35. Admin Dashboard — CustomerFeedbackChart
  - [ ] 35.1 Implement `src/components/admin/CustomerFeedbackChart.jsx`
    - Read `feedbackAnalytics`; Recharts `<RadialBarChart>` with 3 segments (Positive 78% green, Neutral 16% gold, Negative 6% red); center overlay `div` (absolute): "4.7 /5" large + "2,840 reviews" subtitle; rating distribution 5→1: `useInView(0.2, true)` triggers each `motion.div` bar width 0% → actual % over 800ms with `delay: index * 0.1`; legend: green/gold/red swatches
    - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.5_

- [ ] 36. Admin Dashboard — QuickActionsAdmin
  - [ ] 36.1 Implement `src/components/admin/QuickActionsAdmin.jsx`
    - 4 action cards (Add Menu Item, Create Coupon, Add Branch, Generate Report) with react-icons icon, bold label, description; `grid-cols-2 md:grid-cols-4`; `whileHover={{ scale: 1.04, y: -3 }} transition={{ duration: 0.2 }}`; `whileTap={{ scale: 0.97 }}`; `onClick` triggers toast notification or `console.log` with action label
    - _Requirements: 28.1, 28.2, 28.3, 28.4_

- [ ] 37. Assemble AdminDashboard
  - [ ] 37.1 Implement `src/pages/AdminDashboard.jsx`
    - `flex` root: `AdminSidebar` on left + `<main>` scrollable content area on right; main: `KPICards`, `SalesOverviewChart`, `TopSellingPieChart`, `SalesProfitLineChart`, `LiveDeliveryMonitor`, `RecentOrdersTable`, `CustomerFeedbackChart`, `QuickActionsAdmin`; responsive padding and layout — sidebar `lg:block`, main `lg:ml-60` (expanded) or `lg:ml-[72px]` (collapsed); `bg-bg-primary`
    - _Requirements: 1.3, 20.1, 21.1, 22.1, 23.1, 24.1, 25.1, 26.1, 27.1, 28.1_

- [ ] 38. Accessibility, reduced motion, and error boundaries
  - [ ] 38.1 Audit and fix accessibility throughout
    - All interactive elements have `aria-label` or visible labels; `FiStar` icons have `aria-hidden="true"`; badge counters use `aria-label`; nav links have descriptive text; images have `alt`; modals/drawers use focus trapping and `aria-modal`; min 44×44px tap targets via padding
    - _Requirements: 29.2_

  - [ ] 38.2 Implement reduced motion guards
    - Add `useReducedMotion()` from Framer Motion to `HeroSection`, `FranchiseSection`, `JourneyTimeline`; wrap GSAP init in `window.matchMedia('(prefers-reduced-motion: reduce)').matches` check in `JourneyTimeline`; all animated sections respect the user preference
    - _Requirements: 31.6_

  - [ ] 38.3 Implement image error fallbacks and `useCart` error guard
    - Add `onError` handler to all `<img>` elements setting `src` to a local placeholder SVG; ensure `useCart` throws `"useCart must be used within CartProvider"` when used outside provider; add `IntersectionObserver` null guard in `useInView`
    - _Requirements: (Design error handling section)_

- [ ] 39. Final checkpoint — full application review
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests require `fast-check` — run with `npm run test` (Vitest)
- Pure helper functions extracted for PBT: `getBadgeDisplay` (5.2/18.2), `cartReducer` or equivalent (5.2), `isMilestoneAchieved`/`computeBarFill` (24.2), `getGrowthIndicator` (29.2), `formatTooltipValue`/`formatTooltipRow` (32.2)
- All chart components require Recharts `<ResponsiveContainer>` wrapper
- GSAP `ScrollTrigger` must be registered: `gsap.registerPlugin(ScrollTrigger)` inside the component `useEffect` or at module level
- The `selectedCategory` and `activeTab` state are lifted to `CustomerDashboard` to allow sibling communication between `FoodCategories` and `BestSellingItems`, and `BottomNav`
- All `<Link>` components require React Router context — they work correctly because `BrowserRouter` wraps the tree in `App.jsx`

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7"] },
    { "id": 1, "tasks": ["3.1", "3.2", "3.4", "4.1", "4.2", "4.3", "4.4"] },
    { "id": 2, "tasks": ["3.3", "5.1"] },
    { "id": 3, "tasks": ["5.2", "5.3"] },
    { "id": 4, "tasks": ["5.4", "5.5"] },
    { "id": 5, "tasks": ["7.1", "8.1", "9.1", "10.1", "11.1", "12.1", "13.1", "14.1", "15.1"] },
    { "id": 6, "tasks": ["16.1"] },
    { "id": 7, "tasks": ["18.1", "19.1", "20.1", "21.1", "22.1", "23.1", "24.1", "25.1"] },
    { "id": 8, "tasks": ["18.2", "21.2", "21.3", "24.2"] },
    { "id": 9, "tasks": ["26.1"] },
    { "id": 10, "tasks": ["28.1", "29.1", "30.1", "31.1", "32.1", "33.1", "34.1", "35.1", "36.1"] },
    { "id": 11, "tasks": ["29.2", "32.2"] },
    { "id": 12, "tasks": ["37.1"] },
    { "id": 13, "tasks": ["38.1", "38.2", "38.3"] }
  ]
}
```
