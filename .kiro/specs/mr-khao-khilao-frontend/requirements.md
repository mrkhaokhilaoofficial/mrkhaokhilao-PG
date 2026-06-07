# Requirements Document

## Introduction

Mr. Khao Khilao is a premium restaurant web application for Chef Piyush Gupta's food brand based in Gondia, Maharashtra. The application consists of a public-facing Landing Page, a Customer Dashboard for ordering and tracking, and an Admin Dashboard for business management. The tech stack is React 19 + Vite + TailwindCSS + Framer Motion + GSAP + Recharts.

## Glossary

- **Landing_Page**: The public-facing marketing page at route `/`
- **Customer_Dashboard**: The customer-facing ordering and tracking portal at route `/customer`
- **Admin_Dashboard**: The business management portal at route `/admin`
- **Navbar**: The fixed top navigation bar on the Landing Page
- **Hero_Section**: The full-screen first section of the Landing Page
- **Counter_Card**: An animated statistics display card
- **Timeline**: The horizontal/vertical journey display on the Landing Page
- **Dish_Card**: A card displaying food item information
- **Review_Card**: A card displaying a customer testimonial
- **Order_Tracker**: The multi-step order status component
- **KPI_Card**: Key Performance Indicator display card in the Admin Dashboard
- **Sidebar**: The collapsible left navigation in the Admin Dashboard

---

## Requirements

### Requirement 1: Application Routing

**User Story:** As a visitor, I want to navigate between the Landing Page, Customer Dashboard, and Admin Dashboard, so that I can access each section of the application.

#### Acceptance Criteria

1. WHEN the browser navigates to route `/`, THE Landing_Page SHALL render and be the only visible page content
2. WHEN the browser navigates to route `/customer`, THE Customer_Dashboard SHALL render and be the only visible page content
3. WHEN the browser navigates to route `/admin`, THE Admin_Dashboard SHALL render and be the only visible page content
4. WHEN a user navigates between routes using in-app links, THE Application SHALL update the displayed page without triggering a full browser page reload
5. WHEN the browser navigates to an unmatched route (e.g., `/unknown`), THE Application SHALL redirect to the Landing_Page at route `/`

---

### Requirement 2: Landing Page — Navbar

**User Story:** As a visitor, I want a clear navigation bar, so that I can explore different sections of the site.

#### Acceptance Criteria

1. THE Navbar SHALL have a fixed height of 80px and remain fixed at the top of the viewport (position: fixed) during scroll, always visible above page content
2. THE Navbar SHALL display the logo "Mr. Khao Khilao" with a fire icon on the left side
3. THE Navbar SHALL display navigation links (Home, Journey, Menu, Reviews, Franchise, Contact) centered on viewports ≥1024px; these links SHALL be hidden on viewports <1024px
4. THE Navbar SHALL display an "Order Now" button on the right side that navigates to `/customer` when clicked
5. WHEN the user scrolls more than 80px from the top, THE Navbar SHALL apply a glassmorphism effect (backdrop-filter blur, semi-transparent dark background, visible bottom border)
6. THE Navbar SHALL display a hamburger menu button on viewports narrower than 1024px; this button SHALL be hidden on viewports ≥1024px
7. WHEN the hamburger button is tapped, THE Navbar SHALL display a mobile menu drawer that slides in from the right side of the viewport
8. WHEN the mobile menu drawer is open and the user taps the overlay backdrop or the close (X) button, THE drawer SHALL slide out and close

---

### Requirement 3: Landing Page — Hero Section

**User Story:** As a visitor, I want a compelling hero section, so that I immediately understand the brand and can take action.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy exactly 100vh height on all viewport sizes
2. THE Hero_Section SHALL display a two-column layout with equal 50% width columns on desktop viewports (≥1024px); left column contains text, right column contains the chef image; on mobile (<1024px) the layout SHALL stack vertically
3. THE Hero_Section SHALL display the headline text "Taste Se Shuruaat... Brand Tak Ka Safar" in Poppins ExtraBold
4. THE Hero_Section SHALL display a subheading that references Chef Piyush Gupta's journey from a secure job to building a food brand
5. THE Hero_Section SHALL display two buttons: "Explore Menu" (links to the menu section) and "Our Journey" (scrolls to the timeline section)
6. THE Hero_Section SHALL display a large chef image on the right column with fire-colored radial gradient and blurred smoke-like overlay effects surrounding it
7. THE Hero_Section SHALL display at least 3 floating food emoji elements (chili 🌶️, tomato 🍅, herbs 🌿) that continuously animate with a vertical float (translateY) loop using Framer Motion
8. WHEN the user scrolls down from the top of the page, THE right-column chef image SHALL translate vertically (parallax) in the opposite direction at a reduced scroll ratio (e.g., 0.3× scroll distance), creating a depth effect
9. WHEN the Hero_Section first renders, THE left-column content SHALL animate with a fade-up entrance (opacity 0→1, translateY 40px→0) and the right-column image SHALL animate with a slide-in-right entrance (opacity 0→1, translateX 60px→0)

---

### Requirement 4: Landing Page — Achievement Counters

**User Story:** As a visitor, I want to see the brand's achievements, so that I can understand its scale and credibility.

#### Acceptance Criteria

1. THE Counter_Section SHALL display exactly 5 Counter_Cards with the following label text in order: "22+ Journey Started", "5+ Cities Experience", "100+ Recipes", "1M+ Content Reach", "3+ Upcoming Branches"
2. WHEN a Counter_Card enters the viewport (at least 30% visible), THE Counter_Card SHALL animate the numeric portion of its label from 0 to its target value over 2000ms using an ease-out cubic timing function; this animation SHALL fire only once per page load
3. THE Counter_Cards SHALL be displayed in a responsive grid: 2 columns on viewports <640px, 3 columns on viewports 640px–1023px, and 5 columns on viewports ≥1024px

---

### Requirement 5: Landing Page — Journey Timeline

**User Story:** As a visitor, I want to see Chef Piyush's journey, so that I can connect with the brand story.

#### Acceptance Criteria

1. THE Timeline SHALL display exactly 6 steps in this order: Secure Job, Oberoi Experience, 5 Cities Experience, YouTube Journey, Mr. Khao Khilao Launch, Franchise Expansion; each step SHALL display a year, title, short description, and icon
2. THE Timeline SHALL display horizontally (steps arranged left-to-right in a single row with a horizontal connecting line) on viewports ≥1024px
3. THE Timeline SHALL display vertically (steps stacked top-to-bottom with a vertical connecting line) on viewports <1024px
4. WHEN the Timeline section enters the viewport during scroll, THE horizontal connecting line SHALL animate from 0% to 100% width (left to right) using GSAP ScrollTrigger on desktop; on mobile, the vertical line SHALL animate from 0% to 100% height (top to bottom)
5. WHEN each Timeline step's dot node enters the viewport, THE dot SHALL transition from its default state (dim, no glow) to an active state with an orange box-shadow glow (e.g., 0 0 12px rgba(255,122,0,0.8)) applied via GSAP

---

### Requirement 6: Landing Page — Signature Dishes

**User Story:** As a visitor, I want to browse signature dishes, so that I can see what the restaurant offers.

#### Acceptance Criteria

1. THE Dishes_Section SHALL display exactly 4 Dish_Cards in this order: Saoji Chaap Roll, Classic Paneer Tikka, Makhani Momos, Chaap Biryani
2. WHEN the Dishes_Section renders, EACH Dish_Card SHALL display: a food image, dish name, current price with ₹ prefix, original price with ₹ prefix rendered with CSS `line-through`, up to 2 tag chips, a row of filled/unfilled star icons derived from `Math.floor(rating)` out of 5, and an "Add" button with a cart icon
3. WHEN a Dish_Card is hovered on desktop, THE Dish_Card SHALL scale to 1.03 and display an orange-tinted box shadow (e.g., `0 8px 40px rgba(255,122,0,0.3)`)
4. WHEN the Add button on a Dish_Card is clicked and the item is not already in the cart, THE item SHALL be added to the global CartContext with quantity 1
5. WHEN the Add button is clicked for an item already present in the cart, THE CartContext SHALL increment that item's quantity by 1 rather than adding a duplicate entry

---

### Requirement 7: Landing Page — Customer Reviews

**User Story:** As a visitor, I want to read customer reviews, so that I can trust the brand.

#### Acceptance Criteria

1. THE Reviews_Section SHALL display Review_Cards in a responsive slider showing 1 card on mobile (<768px), 2 cards on tablet (768px–1023px), and 3 cards on desktop (≥1024px)
2. WHEN the Reviews_Section renders, EACH Review_Card SHALL display: a circular customer avatar image, customer name, location, a numeric 1–5 star rating rendered as filled star icons, review text body, a "Verified" badge, and the name of the reviewed dish
3. THE Reviews slider SHALL automatically advance to the next slide every 4 seconds while the user has not recently interacted with it
4. THE Reviews slider SHALL display navigation dot indicators (one per slide group) and previous/next arrow buttons
5. WHEN the previous or next button is clicked, THE slider SHALL immediately navigate to the adjacent slide, pause the auto-advance timer, and restart the 4-second auto-advance interval from zero after the interaction
6. WHEN the slider reaches the last slide and advances, it SHALL wrap around to the first slide (circular navigation)

---

### Requirement 8: Landing Page — Outlets Section

**User Story:** As a visitor, I want to see where the restaurant is located, so that I can find or visit it.

#### Acceptance Criteria

1. THE Outlets_Section SHALL display exactly 4 outlet cards in the following order: the current outlet first (Railtoly, Gondia), followed by 3 upcoming branches (Nagpur, Amravati, Wardha)
2. THE current outlet card SHALL display: outlet name, full street address, phone number as a `tel:` link, opening hours string, a green "Open Now" status badge, a numeric star rating (e.g., 4.8) with review count, and a "View on Map" link
3. THE upcoming branch cards SHALL each display a "Coming Soon" status badge and an expected opening timeline in quarter-and-year format (e.g., "Q3 2025")
4. THE current outlet card SHALL have an orange glow border (e.g., `border-color: #FF7A00; box-shadow: 0 0 20px rgba(255,122,0,0.25)`) visually distinguishing it from the upcoming branch cards

---

### Requirement 9: Landing Page — Franchise Section

**User Story:** As a potential investor, I want to see franchise information, so that I can consider becoming a franchise partner.

#### Acceptance Criteria

1. THE Franchise_Section SHALL span the full width of the viewport (100vw) with no horizontal padding on its outer container
2. THE Franchise_Section SHALL display the headline text "Become A Franchise Partner" in Poppins ExtraBold
3. THE Franchise_Section SHALL display a subheading that communicates the brand's rapid growth and invites partnership (e.g., "Join the fastest growing food brand in Central India")
4. THE Franchise_Section SHALL display an "Apply Now" button that opens `mailto:franchise@mrkhaokhilao.com` when clicked
5. THE Franchise_Section SHALL display at least 8 animated fire particle elements as background decoration, each cycling through a looping float-and-fade animation using GSAP or Framer Motion
6. THE Franchise_Section SHALL display exactly 4 benefit cards in this order: Proven Brand, High ROI, Full Support, Exclusive Territory; each card SHALL display an icon, a bold title, and a one-line description

---

### Requirement 10: Landing Page — Footer

**User Story:** As a visitor, I want a footer with contact information, so that I can reach the restaurant.

#### Acceptance Criteria

1. THE Footer SHALL display the brand logo, a short brand description, and social media icon links for Instagram, YouTube, Facebook, and Twitter; each icon link SHALL open the target social profile in a new browser tab (`target="_blank"`)
2. THE Footer SHALL display the phone number as a `tel:` link, Instagram handle as a visible text string, physical address as plain text, and email address as a `mailto:` link
3. THE Footer SHALL display quick navigation links for the following sections in order: Home, Journey, Menu, Reviews, Franchise, Outlets, Contact; clicking each link SHALL smooth-scroll to the corresponding section on the Landing Page
4. THE Footer SHALL display two dashboard links labeled "Customer Portal" (navigates to `/customer`) and "Admin Dashboard" (navigates to `/admin`) using React Router `<Link>` components

---

### Requirement 11: Customer Dashboard — Header

**User Story:** As a logged-in customer, I want a personalized header, so that I can access notifications and my profile.

#### Acceptance Criteria

1. THE Customer_Dashboard header SHALL display a greeting in the format "Hello [Name] 👋" using the dummy customer name "Aman"; the greeting and location indicator SHALL be visible on viewports ≥640px
2. THE Customer_Dashboard header SHALL display a location indicator showing the label "Civil Lines, Gondia" with a map-pin icon
3. THE Customer_Dashboard header SHALL display a notification bell icon button; the bell SHALL render an orange badge showing the unread notification count; IF the count exceeds 9, THE badge SHALL display "9+" instead of the exact number
4. THE Customer_Dashboard header SHALL display a cart icon button linked to the CartContext; IF cartCount > 0, THE button SHALL render an orange badge showing the cart item count; IF cartCount > 9, THE badge SHALL display "9+"; IF cartCount === 0, THE badge SHALL be hidden
5. THE Customer_Dashboard header SHALL display a circular customer avatar image with the customer's name and a membership tier label (e.g., "Gold Member") beside it
6. THE Customer_Dashboard header SHALL display a search input field on viewports ≥768px; this search field SHALL be hidden on viewports <768px
7. WHEN the notification bell is clicked, THE header SHALL toggle a dropdown panel listing the most recent notifications with timestamps; clicking outside the panel SHALL close it

---

### Requirement 12: Customer Dashboard — Featured Banner

**User Story:** As a customer, I want to see a featured promotion, so that I can be inspired to order.

#### Acceptance Criteria

1. THE Featured_Banner SHALL display the tagline "Taste Jo Dil Se Bante Hai" as the primary headline in Poppins ExtraBold
2. THE Featured_Banner SHALL display an "Order Now" primary button that scrolls to the Best Selling Items section and a "View Menu" secondary button that scrolls to the Food Categories section; both buttons SHALL be focusable and keyboard-activatable
3. THE Featured_Banner SHALL display a featured food image on the right side with at least 2 floating badge overlays (e.g., "⭐ 4.9 Rating", "🔥 Bestseller") that animate with a continuous vertical float loop
4. THE Featured_Banner SHALL use a dark-to-orange radial gradient background (`from #1A1A1A to rgba(255,122,0,0.15)`) overlaid with a repeating dot pattern SVG for texture

---

### Requirement 13: Customer Dashboard — Quick Actions

**User Story:** As a customer, I want quick access to key functions, so that I can navigate efficiently.

#### Acceptance Criteria

1. THE Quick_Actions SHALL display exactly 5 action cards in this order: Menu, My Orders, Track Order, Offers, Rewards
2. WHEN the Quick_Actions renders, EACH action card SHALL display a colored icon, a bold label, and a sublabel on viewports ≥640px; on viewports <640px the sublabel MAY be hidden to preserve space
3. WHEN an action card is tapped (pointer down), THE card SHALL animate to scale 0.95; WHEN the tap is released (pointer up), THE card SHALL animate to scale 1.06 with a translateY of −3px, then return to default scale 1.0
4. THE Quick_Actions SHALL be displayed in a 5-column grid on all viewport sizes (≥375px)
5. WHEN an action card is tapped, THE application SHALL scroll to or highlight the corresponding dashboard section (Menu → Food Categories, My Orders → Recent Orders, Track Order → Order Tracking, Offers → banner, Rewards → Reward Section)

---

### Requirement 14: Customer Dashboard — Food Categories

**User Story:** As a customer, I want to filter items by food category, so that I can find what I want quickly.

#### Acceptance Criteria

1. THE Food_Categories SHALL display exactly 7 category chips in this order: All, Chaap, Paneer, Rolls, Momos, Biryani, Main Course; the chip row SHALL be horizontally scrollable on viewports where all chips do not fit in view
2. WHEN the Food_Categories renders, EACH category chip SHALL display an emoji icon followed by the category name as text
3. WHEN a category chip is selected, THE chip SHALL display a highlighted style using the `orange-primary` (#FF7A00) accent color as background or border, and only one chip SHALL be in the selected state at a time
4. WHEN a category chip is selected, THE Best_Selling_Section below SHALL update to display only items whose `category` field matches the selected category value; selecting "All" SHALL display all items
5. WHEN the Food_Categories first renders, THE "All" chip SHALL be in the selected/active state by default

---

### Requirement 15: Customer Dashboard — Best Selling Items

**User Story:** As a customer, I want to see popular items, so that I can make quick ordering decisions.

#### Acceptance Criteria

1. THE Best_Selling_Section SHALL display bestseller menu items in a 2-column grid on viewports <1024px and a 4-column grid on viewports ≥1024px
2. WHEN the Best_Selling_Section renders, EACH item card SHALL display: a food image with an `alt` attribute, the dish name, a star rating with numeric value, the current price with ₹ prefix, the original price with ₹ prefix and `line-through` styling, a veg indicator icon (green circle), a "Bestseller" badge, and a review count
3. WHEN the "Add" button on an item card is clicked and the item is not in the cart, THE item SHALL be added to the CartContext with quantity 1
4. WHEN an item IS in the cart, THE "Add" button SHALL be replaced by a quantity control row showing a "−" button, the current quantity, and a "+" button; WHEN "+" is clicked, THE CartContext quantity increments by 1; WHEN "−" is clicked and quantity > 1, THE CartContext quantity decrements by 1; WHEN "−" is clicked and quantity === 1, THE item SHALL be removed from the cart and the "Add" button SHALL reappear

---

### Requirement 16: Customer Dashboard — Order Tracking

**User Story:** As a customer, I want to track my active order, so that I know when my food will arrive.

#### Acceptance Criteria

1. THE Order_Tracker SHALL display exactly 6 steps in this order: Order Received (step 1), Preparing (step 2), Cooking (step 3), Packed (step 4), Out For Delivery (step 5), Delivered (step 6)
2. EACH step SHALL display one of three distinct visual states: completed (orange-filled icon + orange label text), active/current (orange icon with a pulsing ring + bold orange label), or pending (dimmed icon + muted label text)
3. THE current active step SHALL display a pulsing orange dot/ring indicator that continuously animates (scale + opacity loop) to draw attention
4. WHEN the Order_Tracker component mounts, THE horizontal/vertical connecting progress line SHALL animate from 0% to `((currentStep − 1) / 5) × 100%` over 1500ms with an ease-out timing function
5. THE Order_Tracker SHALL display a horizontal step layout on viewports ≥640px and a vertical step layout on viewports <640px
6. THE Order_Tracker SHALL display the estimated delivery time (ETA) and a "Track Live" button below the step indicators

---

### Requirement 17: Customer Dashboard — Live Delivery Tracking

**User Story:** As a customer, I want to see a live map of my delivery, so that I can know exactly where my order is.

#### Acceptance Criteria

1. WHILE an active delivery order exists, THE Delivery_Map SHALL display a stylized SVG map placeholder containing a road grid pattern, an animated orange route line, a restaurant outlet pin, and a customer location pin
2. THE orange route line SHALL animate using SVG `stroke-dasharray` / `stroke-dashoffset` technique, fully drawing itself from the outlet pin to the customer pin over 2–4 seconds on mount, then looping or holding in the drawn state
3. THE delivery driver dot SHALL animate along the route path from the outlet to the customer location over a 6–10 second loop, repeating continuously to simulate live movement
4. THE map SHALL display a distinct restaurant icon pin at the outlet position and a distinct home/flag icon pin at the customer location
5. WHILE an active delivery driver exists, THE component SHALL display below the map: the driver's avatar image, full name, vehicle type, star rating, and ETA expressed in whole minutes (e.g., "12 mins")
6. IF no active delivery driver has status "On Delivery", THE driver info panel SHALL be hidden and a "No Active Delivery" placeholder message SHALL be shown instead

---

### Requirement 18: Customer Dashboard — Reward Section

**User Story:** As a customer, I want to track my reward points, so that I can redeem them for discounts.

#### Acceptance Criteria

1. THE Reward_Section SHALL display the current points balance as "320 pts" and a labeled progress bar showing progress toward the next milestone of 500 pts; the bar fill width SHALL be `(320 / 500) × 100%` = 64%
2. WHEN the Reward_Section enters the viewport, THE progress bar fill width SHALL animate from 0% to 64% over 1000ms with an ease-out timing function, firing only once per page load
3. THE Reward_Section SHALL display a "Redeem Points" primary button and a "History" secondary button; both SHALL be focusable and keyboard-activatable
4. THE Reward_Section SHALL display exactly 4 milestone cards (e.g., 100 pts, 250 pts, 500 pts, 1000 pts); milestones at or below the current balance (320 pts) SHALL render with an "Achieved" state (colored icon, checkmark); milestones above SHALL render with a "Pending" state (dimmed icon, lock icon)
5. THE Reward_Section SHALL display exactly 3 active offer cards; EACH offer card SHALL display a coupon code (monospace font), discount description, and validity expiry date

---

### Requirement 19: Customer Dashboard — Bottom Navigation

**User Story:** As a mobile customer, I want a bottom navigation bar, so that I can switch between sections easily.

#### Acceptance Criteria

1. THE Bottom_Nav SHALL be fixed at the bottom of the viewport (`position: fixed; bottom: 0`) on viewport widths from 375px to 1920px, always rendering above page content
2. THE Bottom_Nav SHALL display exactly 5 tabs in this order: Home, Menu, Cart, Orders, Profile; each tab SHALL display an icon and a text label
3. WHEN a tab is selected, THE tab's icon and label SHALL apply the `orange-primary` (#FF7A00) accent color and an animated background indicator (e.g., a pill shape using Framer Motion `layoutId`) SHALL transition to highlight the active tab; only one tab SHALL be active at a time
4. IF the CartContext `cartCount` is between 1 and 9 inclusive, THE Cart tab SHALL display a badge with the exact count; IF `cartCount` > 9, THE badge SHALL display "9+"; IF `cartCount` === 0, THE badge SHALL be hidden
5. WHEN the Home tab is active, THE Customer_Dashboard SHALL scroll to the top; WHEN other tabs are selected, THE corresponding dashboard section SHALL be scrolled into view or visually highlighted
6. WHEN the Customer_Dashboard first renders, THE Home tab SHALL be in the active state by default

---

### Requirement 20: Admin Dashboard — Sidebar

**User Story:** As an admin, I want a navigation sidebar, so that I can manage all aspects of the business.

#### Acceptance Criteria

1. THE Sidebar SHALL display exactly 14 navigation items on initial render, with "Dashboard" as the default active item, grouped into 3 sections: Main (Dashboard, Orders, Live Tracking, Analytics), Management (Menu Items, Customers, Coupons, Inventory, Branches, Employees), and System (Feedback, Reports, Settings, Logout)
2. THE Sidebar SHALL be collapsible on desktop viewports (≥1024px): WHEN the collapse toggle is clicked, THE Sidebar width SHALL transition between 240px (expanded, shows icons + labels) and 72px (collapsed, shows icons only) with a ≤300ms spring animation
3. THE Sidebar SHALL display as a slide-in drawer overlay from the left on mobile viewports (<1024px); it SHALL be hidden off-screen by default and a hamburger button SHALL be visible to trigger it
4. WHEN a nav item is selected, THE item SHALL apply an active style with `orange-primary` background fill on the icon area, white label text, and a left-side accent bar; all other items SHALL revert to their default muted style
5. WHEN the mobile sidebar drawer is open and the user taps the overlay backdrop or a close button, THE drawer SHALL slide out and close

---

### Requirement 21: Admin Dashboard — KPI Cards

**User Story:** As an admin, I want to see key business metrics, so that I can monitor daily performance.

#### Acceptance Criteria

1. THE KPI_Section SHALL display exactly 4 KPI_Cards; each card SHALL display: a labeled metric (Today's Sales, Orders Today, Monthly Profit, Active Customers), a formatted numeric value, a relevant icon, and a growth indicator; the dummy values SHALL be ₹12,480, 87, ₹38,200, and 1,240 respectively
2. WHEN a KPI_Card enters the viewport, THE displayed numeric value SHALL animate from 0 to the target value over 2000ms using an ease-out timing function; this animation SHALL fire only once per viewport entry per page load
3. IF the growth indicator value is positive (> 0%), THE growth indicator SHALL display the percentage in `success` green (#22C55E) with an upward arrow and the label "vs last month"; IF the value is 0%, it SHALL also display in green; IF the value is negative (< 0%), it SHALL display in `danger` red (#EF4444) with a downward arrow
4. THE KPI_Cards SHALL be arranged in a 2-column grid on viewports <1280px and a 4-column grid on viewports ≥1280px (Tailwind `xl:` breakpoint)

---

### Requirement 22: Admin Dashboard — Sales Overview Chart

**User Story:** As an admin, I want to see monthly sales data as a bar chart, so that I can identify trends.

#### Acceptance Criteria

1. THE Sales_Chart SHALL render a `<BarChart>` component from Recharts displaying 12 months of sales data sourced from `src/data/analytics.js`
2. THE bar representing the current month SHALL render in solid `orange-primary` (#FF7A00); all other month bars SHALL render at 30% opacity of `orange-primary`
3. WHEN the user hovers over a bar, THE chart SHALL display a custom tooltip containing the month name label and the full rupee sales value formatted with Indian-locale comma separators (e.g., ₹1,24,800)
4. THE Y-axis tick labels SHALL format values using ₹K notation (e.g., 50000 → "₹50K")

---

### Requirement 23: Admin Dashboard — Top Selling Items Pie Chart

**User Story:** As an admin, I want to see item sales distribution, so that I can understand what sells best.

#### Acceptance Criteria

1. THE Pie_Chart SHALL render a `<PieChart>` from Recharts displaying 5 segments sourced from `src/data/analytics.js`; each segment SHALL represent a menu item's percentage share of total sales and the 5 values SHALL sum to 100%
2. THE Pie_Chart SHALL use a donut format with `innerRadius` set to at least 50% of `outerRadius` (e.g., innerRadius=60, outerRadius=90)
3. THE Pie_Chart SHALL display a custom legend below or beside the chart; each legend row SHALL display: a colored swatch matching the segment color, the item name, and the percentage value with a `%` suffix
4. WHEN the user hovers over a pie segment, THE chart SHALL display a custom tooltip containing the item name and its percentage value

---

### Requirement 24: Admin Dashboard — Sales vs Profit Line Chart

**User Story:** As an admin, I want to compare monthly sales and profit, so that I can track profitability.

#### Acceptance Criteria

1. THE Line_Chart SHALL render a `<LineChart>` from Recharts displaying two data series sourced from `src/data/analytics.js`: a "Sales" line in `orange-primary` (#FF7A00) and a "Profit" line in `success` (#22C55E)
2. THE Line_Chart SHALL use `type="monotone"` on both `<Line>` components for smooth curve interpolation
3. WHEN the user hovers over a data point, THE chart SHALL display an active dot (enlarged fill circle) on both lines at the hovered x-axis position
4. WHEN the user hovers over a data point, THE chart SHALL display a custom tooltip showing the month label, the Sales value, and the Profit value both formatted as ₹K notation

---

### Requirement 25: Admin Dashboard — Live Delivery Monitoring

**User Story:** As an admin, I want to monitor all active deliveries, so that I can ensure timely delivery.

#### Acceptance Criteria

1. WHEN the Delivery_Monitor renders, THE component SHALL display a mini SVG animated map showing all drivers with status "On Delivery" as animated moving dots along their respective route lines; the animation SHALL loop continuously
2. THE Delivery_Monitor SHALL display a scrollable list of all drivers from `src/data/drivers.js`; each driver row SHALL display the driver's avatar image, full name, vehicle type, status badge, and ETA
3. THE status badge for each driver SHALL apply `success` green (#22C55E) styling when the driver's status is "Available" and `orange-primary` (#FF7A00) styling when the status is "On Delivery"
4. IF a driver's ETA is null or unavailable (e.g., status is "Available"), THE driver row SHALL omit the ETA field rather than displaying "null" or an empty string

---

### Requirement 26: Admin Dashboard — Customer Feedback Analytics

**User Story:** As an admin, I want to see customer satisfaction data, so that I can improve the service.

#### Acceptance Criteria

1. THE Feedback_Section SHALL render a `<RadialBarChart>` from Recharts displaying 3 sentiment segments: Positive (78%), Neutral (16%), Negative (6%), each with a distinct color
2. THE center of the radial chart SHALL display the average rating value "4.7" in a large font with a "/5" suffix and a total review count subtitle (e.g., "2,840 reviews")
3. THE Feedback_Section SHALL display a rating distribution list for ratings 5-star through 1-star; each row SHALL display the star count label, an animated fill bar, and a percentage value
4. WHEN the rating distribution bars enter the viewport, EACH bar fill SHALL animate from 0% to its actual percentage over 800ms with a 100ms stagger between rows, firing only once per viewport entry
5. THE Feedback_Section SHALL display a legend identifying the Positive (green), Neutral (yellow/gold), and Negative (red) sentiment colors used in the radial chart

---

### Requirement 27: Admin Dashboard — Recent Orders Table

**User Story:** As an admin, I want to see recent orders in a table, so that I can monitor activity.

#### Acceptance Criteria

1. THE Orders_Table SHALL display the 5 most recent orders sourced from `src/data/orders.js`; on viewports ≥768px the data SHALL render as a `<table>` with columns: Order ID, Customer (avatar + name), Items (item names list), Amount (₹ formatted), Status, and Time
2. EACH status badge SHALL use the following color mapping: "Delivered" → `success` green (#22C55E), "Out for Delivery" → `orange-primary` (#FF7A00), "Preparing" → `gold` (#FFD700), "Cancelled" → `danger` red (#EF4444)
3. ON viewports <768px, THE table SHALL be replaced by a card-based vertical list, each card showing all 6 data fields stacked, to prevent horizontal overflow

---

### Requirement 28: Admin Dashboard — Quick Actions

**User Story:** As an admin, I want quick access to common management tasks, so that I can act fast.

#### Acceptance Criteria

1. THE Admin_Quick_Actions SHALL display exactly 4 action cards in this order: Add Menu Item, Create Coupon, Add Branch, Generate Report
2. EACH card SHALL display a colored icon (using a color from the approved accent palette: orange-primary, gold, success, or secondary orange), a bold label title, and a short description; WHEN the card is hovered, THE card SHALL animate with scale 1.04 and translateY −3px using Framer Motion
3. THE cards SHALL be displayed in a 2-column grid on viewports <768px and a 4-column grid on viewports ≥768px
4. WHEN a card is clicked, THE card SHALL display a visual click feedback (brief scale-down to 0.97 via `whileTap`) and log or display a toast notification confirming the action intent

---

### Requirement 29: Responsive Layout

**User Story:** As a user on any device, I want the app to display correctly, so that I can use it on mobile and desktop.

#### Acceptance Criteria

1. THE Application SHALL render without horizontal scroll overflow, overlapping elements, or unreachable interactive targets at the following viewport widths: 375px, 425px, 768px, 1024px, 1440px, 1920px
2. THE Application SHALL use a mobile-first CSS approach: base styles target 375px and progressively apply wider breakpoint overrides using Tailwind's `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), and `2xl:` (1536px) prefixes; all tap targets SHALL be at least 44×44px on touch viewports
3. IF the viewport width is below 1024px, THE Landing_Page Navbar SHALL display the hamburger button and hide the desktop nav links and the "Order Now" CTA button from the desktop nav row
4. IF the viewport width is below 1024px, THE Admin_Sidebar SHALL be hidden off-screen by default; a hamburger toggle button SHALL be visible; WHEN the toggle is clicked, THE Sidebar SHALL slide in from the left as a full-height drawer overlay; WHEN the overlay backdrop is tapped or a close button is clicked, THE drawer SHALL slide out and close

---

### Requirement 30: Color System and Typography

**User Story:** As a user, I want a consistent visual design, so that the application feels premium and cohesive.

#### Acceptance Criteria

1. THE Application SHALL use #0D0D0D as the page body/root background color, #1A1A1A as the card and modal surface background color, and #161616 as the secondary surface background (headers, sidebars, section alternates)
2. THE Application SHALL use #FF7A00 (orange-primary) as the primary CTA and accent color, #FFA726 (orange-secondary) as the secondary accent, #FFD700 (gold) as the premium highlight color, and #FFFFFF as the primary text color on dark backgrounds
3. THE Application SHALL apply `font-family: 'Poppins', sans-serif` with `font-weight: 800` to all h1–h6 heading elements; a generic `sans-serif` fallback SHALL be specified in the font stack
4. THE Application SHALL apply `font-family: 'Inter', sans-serif` with a base `font-weight: 400` to all body text, paragraphs, labels, and UI strings; a generic `sans-serif` fallback SHALL be specified in the font stack
5. THE Application SHALL NOT import or use Bootstrap, Material UI (MUI), jQuery, Chakra UI, or Ant Design packages

---

### Requirement 31: Animation System

**User Story:** As a user, I want smooth, purposeful animations, so that the interface feels polished and premium.

#### Acceptance Criteria

1. THE Application SHALL use Framer Motion for all UI component entrance/exit animations including fade-up, fade-in, slide-left, slide-right, scale-in, and card-hover interactions
2. WHEN GSAP counter animations or GSAP ScrollTrigger animations are needed (timeline line draw, section scroll-triggered reveals), THE Application SHALL use GSAP; WHEN the triggering element enters the viewport, THE GSAP animation SHALL initialize and play
3. THE Application SHALL NOT implement any bounce (`type: "spring"` with exaggerated overshoot) or random-direction spin animations; spring animations used for micro-interactions SHALL have `damping ≥ 20` to prevent visible overshoot
4. WHEN a Landing Page section enters the viewport (at least 20% visible), THE section container SHALL animate with a fade-up entrance (opacity 0→1, translateY 30px→0) over 500ms using Framer Motion `whileInView`
5. WHEN a dashboard card is hovered on desktop, THE card SHALL animate with a scale from 1.0 to a value in the range 1.02–1.04 and a translateY from 0 to a value in the range −4px to −8px over 200ms using Framer Motion `whileHover`
6. IF the user's OS has `prefers-reduced-motion: reduce` set, THE Application SHALL disable or minimally reduce all Framer Motion and GSAP animations (e.g., skip translate/scale transforms, keep opacity transitions only)
