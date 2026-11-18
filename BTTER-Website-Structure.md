# BTTR — Website Structure

## Website Purpose

An online store that presents BTTR’s visual identity, allows customers to explore and purchase products, and provides order tracking. A private admin dashboard allows the brand owner to manage the store and its content.

This document records the agreed website structure and the role of each page. The final design, platform, payment methods, and shipping arrangements will be decided later.

## 1. Home

**Purpose:** Introduce BTTR visually and bring customers into the brand’s world.

- A hero image or video reflecting the brand identity.
- A short introduction and a clear call to shop.
- Featured collections and selected products.
- A brief brand story linking to About BTTR.

**Links to:** Store, collections, product pages, and About BTTR.

## 2. About BTTR — Brand Identity and Story

**Purpose:** Explain the brand, its brief, and the philosophy behind its products.

- Introduce the approved name BTTR. Its final naming explanation remains to be confirmed; the earlier BUTTER-to-BTTER explanation is historical.
- The concepts of softness, comfort, femininity, and confidence.
- The brand personality and visual direction.
- An introduction to materials and the wearing experience, based on verified product information.
- A call to explore the store.

**Links to:** Home and Store.

## 3. Store

**Purpose:** Display products and help customers find the right options.

- All available products and collections.
- Product cards showing images, names, prices, and available colors.
- Filters for size, color, price, and availability, with sorting options.
- Preserved filters and browsing position when returning from a product page.

**Links to:** Product pages, collections, and Cart.

### 3.1. Product Details

**Purpose:** Provide the information needed to choose a product and add it to the cart.

- Product photography, material details, and video when available.
- Product name, price, description, and what is included in the set.
- Color and size selection with availability information.
- Size guide and measurement instructions.
- Materials and care instructions.
- Relevant shipping, exchange, and return information.
- Quantity selection and an Add to Cart button.
- Complementary products when available.

**Links to:** Store, Cart, size guide, and shipping and return policies.

## 4. Cart

**Purpose:** Review selected items before checkout.

- Selected products with images, colors, sizes, quantities, and prices.
- Options to change quantities or remove items.
- Product subtotal, discounts, and any known fees.
- A clear explanation of when shipping costs are calculated if they depend on the delivery address.
- Notice of any changes in product availability before proceeding.
- Options to continue shopping or proceed to checkout.

**Links to:** Store, product pages, and Checkout.

## 5. Checkout

**Purpose:** Collect delivery and payment information and confirm the purchase.

- Contact information.
- Delivery address.
- Shipping method and cost.
- Payment selection from the approved options.
- Order summary and final total before confirmation.
- Ability to review and edit information without losing entered details.
- Guest checkout without requiring an account.
- Clear confirmation when the order succeeds, or an actionable message if it cannot be completed.

**Links to:** Cart, support and policies, then Order Details after successful order confirmation.

## 6. Order Details & Tracking

**Purpose:** Confirm the order and allow customers to return to its details and track progress.

- Order number and date.
- Products, sizes, colors, and quantities.
- Cost breakdown and delivery address.
- Payment status.
- Order status: received, preparing, shipped, and delivered.
- Shipment information or a tracking link when available.
- A support option associated with the order number.

**Access:** Immediately after purchase and through Track Order. Customers can look up an order using its number and verify their identity before viewing its details. The verification method will be defined during implementation.

**Links to:** Shipment tracking, support, and Store.

## 7. Admin Dashboard

**Purpose:** Allow the brand owner to manage the store and its content through a private interface protected by login and appropriate permissions.

### Products and Inventory

- Add, edit, and hide products.
- Manage images, descriptions, prices, materials, and care instructions.
- Manage sizes, colors, and stock for each size and color combination.
- Manage categories, collections, and product ordering.

### Orders

- View and search orders and their details.
- Monitor payment status and update order preparation status.
- Add shipment and tracking information.
- Handle cancellations and returns according to the approved policy and the capabilities of the payment and shipping providers.

### Content and Settings

- Edit homepage images, text, and links.
- Edit About BTTR, help pages, and policies.
- Manage discounts and promotional codes.
- Manage store, shipping, and payment settings within the capabilities of the selected platform and providers.
- View summaries of sales, orders, and inventory.

**Connection to the website:** Approved product and content changes appear in the storefront. New orders appear in the dashboard, and order status updates appear on the customer’s tracking page.

## Navigation and Page Connections

### Purchase Journey

```text
Home → Store / Collection → Product Details → Cart → Checkout → Order Details
```

### Brand Discovery Journey

```text
Home → About BTTR → Store → Product Details
```

### Tracking an Existing Order

```text
Track Order → Customer Verification → Order Details & Tracking
```

### Main Navigation

- Home.
- About BTTR.
- Store, with the categories available at launch.
- Cart icon.
- A clearly accessible Track Order link.

The admin dashboard has a private entry point and does not appear in the customer shopping navigation.

### Footer and Supporting Pages

- Contact.
- Frequently asked questions.
- Size guide.
- Shipping policy.
- Exchange and return policy.
- Privacy policy and terms.
- Brand social accounts.

Support information is also linked where customers need it: the size guide beside size selection, and shipping and return information on product and cart pages.

## Principles for a Connected Experience

- A consistent visual identity using warm tones, soft imagery, and typography and spacing aligned with the BTTR brief.
- Consistent writing style, product names, and category names throughout the website.
- A mobile-friendly browsing and purchasing experience.
- Preserved cart contents and customer selections while navigating.
- A clear next step at every stage.
- Reduced navigation during checkout while retaining the brand identity, access to support, and a route back to the cart.
- A complete purchase journey for customers entering directly through a product advertisement or external link.
- Consistent inventory and order status updates between the storefront and admin dashboard.

## Decisions to Confirm Later

- Target market, delivery countries, and currency.
- Website language or supported languages.
- Launch products, categories, product information, and photography.
- Final brand tagline and product scope.
- Payment methods, shipping providers, and approved policies.
- Implementation platform, hosting, and domain.
- Channels for order confirmations and status updates.
- Customer verification method for accessing order details.
- Whether customer accounts, wishlists, and reviews are needed at launch or in a later phase.


## Approved Single-Page Arrangement — 2026-10-31

Home, About BTTR, and Store appear consecutively as scrollable sections of `website/public/index.html`, in exactly that order. Main navigation uses section anchors. Header search operates on the embedded Store section. Existing About/Store URLs forward to their corresponding main-page sections. This arrangement supersedes the earlier separate-page presentation for these three areas; future cart, checkout, tracking and admin scope remains unchanged.


## Store Preview Refinement — 2026-10-31

The main page retains Home → About BTTR → Store. The Store section now presents exactly three product previews plus a fourth See more card. See more opens `website/public/store.html`, a dedicated full-collection page with search, category/color filters and sorting. Header search also opens the full collection. About remains a main-page section. This supersedes the earlier embedded full-store/filter presentation and Store redirect.
