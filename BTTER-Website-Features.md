# BTTR — Website Features

## Status

Requirements collected during planning. Proposed implementation rules are identified separately and remain subject to confirmation. This document does not indicate that the features have been implemented.

## 1. Responsive Website

**Requirement:** The entire website, including the admin dashboard, must adapt to mobile, tablet, and desktop screens.

- Responsive layouts, images, navigation, and forms.
- Readable content and usable touch and mouse controls.
- No unintended clipping or horizontal overflow.
- Consistent BTTR identity across screen sizes.
- Verification across representative screen sizes and portrait and landscape orientations.

## 2. Payment Gateway

**Requirement:** Integrate an online payment gateway. Paymob is a provisional candidate, not a confirmed provider.

- Connect checkout payments to the relevant order.
- Verify payment results with the gateway on the server before updating payment status.
- Display payment status in customer order details and the admin dashboard.
- Handle pending payments, failures, retries, and duplicate notifications without duplicate charges or orders.
- Use the provider’s payment collection interface; keep secret credentials on the server.
- Confirm supported methods, refund capabilities, and account activation requirements with the selected provider during implementation.

## 3. Admin Dashboard — Orders, Financial Overview, Inventory, Customers and Analytics

### User Requirements

- Receive and display all orders.
- Include financial records and calculations; the exact meaning and scope of “all accounts” must be clarified.
- Automatically decrease available stock as orders are processed.
- Show website visitor activity and customer information where available.
- Show order counts and performance for different periods.
- Allow the owner to select a custom date range and view analysis for that period.

### Orders

- Searchable order list with customer details, items, quantities, totals, payment status, and fulfillment status.
- Filters for date range, payment status, and order status.
- Individual order details linked to payment and shipment records.

### Financial Overview — Proposed Scope

- Gross sales, discounts, refunds, shipping charges, and net sales, each with an explicit definition.
- Separate collected payments from pending, failed, or unpaid orders.
- Show cash-on-delivery collections separately if that payment method is enabled.
- Profit reporting requires product costs and an agreed scope for fees and expenses; sales alone do not establish profit.
- Full accounting, tax reporting, and expense management are not yet confirmed requirements.

### Inventory

- Track stock for each product, size, and color combination.
- Record stock changes with the associated order or admin action.
- Show out-of-stock products and low-stock alerts.
- Prevent concurrent orders from overselling available stock.

**Proposed inventory lifecycle, to confirm:** Reserve units during the agreed checkout/order stage, commit the deduction at the appropriate payment or order confirmation stage, and release reservations after failure, expiry, or cancellation. Restock returned items only after an approved inventory decision. Online payment and cash-on-delivery may require different confirmation rules.

### Visitors and Customers

- Distinguish visitors, sessions, registered users, and purchasing customers.
- Show aggregate traffic and browsing activity, subject to applicable consent and tracking settings.
- Anonymous visitors are not automatically identifiable people or registered customers.
- Link identifiable customer details to orders or accounts when those details have been provided.
- Customer account registration is still optional and has not been confirmed for launch.

### Analytics and Date Filters

- Presets such as today, the last 7 days, the last 30 days, and a custom start and end date.
- Apply the selected period consistently across dashboard cards, charts, and relevant tables.
- Show order count, sales, collected payments, refunds, average order value, and top products.
- Show visitors and purchase conversion when the required analytics events are available.
- Show order and payment status breakdowns.
- Define whether each metric uses order creation, payment collection, or refund date, and label it clearly.
- Use a consistent store timezone and explicit inclusive date boundaries.
- Current inventory is a live value; historical stock reporting requires inventory change records and must be labeled separately from period sales.

### Connections

```text
Website activity → Analytics events → Visitor and conversion reporting
Checkout → Order → Payment result → Payment status and financial reporting
Order lifecycle → Inventory changes → Available storefront stock
Admin fulfillment updates → Customer order tracking
Date range selection → Filtered dashboard metrics, charts and tables
```

### Decisions to Confirm

- Whether financial requirements mean sales/payment reporting or full accounting and expenses.
- Whether customer accounts will be included at launch.
- The final payment provider and whether cash on delivery is supported.
- Inventory reservation, expiry, cancellation, and return rules.
- Analytics provider, event definitions, tracking consent behavior, and store timezone.
- Whether period comparisons and historical inventory reporting are required. Report exports are approved in Section 8.7.


## 4. Admin Product and Stock Management

**Requirement:** The owner can manage website products and inventory directly from the admin dashboard. Saved and published changes automatically appear in the storefront without editing website code.

### Product Management

- Add new products and edit existing products.
- Manage product names, descriptions, images, prices, categories, and collections.
- Manage available sizes and colors and their associated stock.
- Publish products, keep them as drafts, or hide/archive them from the storefront.
- Preserve historical order details when a product is changed or archived.

### Stock Management

- Add new stock and adjust existing stock for each product, size, and color combination.
- Record the quantity adjustment, reason, time, and responsible admin.
- Update storefront availability automatically after a successful save.
- Make restocked variants purchasable when they belong to a published product.
- Prevent purchases of unavailable variants and revalidate availability at checkout.
- Coordinate manual adjustments with order reservations and deductions to avoid overselling.

### Publication and Synchronization

- The admin dashboard and storefront use the same authoritative product and inventory data.
- Saving a published product updates its storefront content and availability automatically, including any required cache refresh.
- Saving a draft does not make it publicly visible; publishing is an explicit admin action.
- Show clear saving, success, and error states in the admin dashboard.
- Failed updates must not be presented as successful changes.
- Existing carts must recheck current prices and availability before order confirmation.

### Connections

```text
Admin adds or edits a product → Save / Publish → Store and product page update
Admin adds or adjusts variant stock → Save → Storefront availability updates
Customer places an order → Inventory lifecycle → Admin and storefront reflect availability
```


## 5. Database and Media Storage

### Central Database

**Requirement:** Use a central database to connect the storefront, admin dashboard, products, inventory, customers, orders, payments, shipping, discounts, and editable website content.

- Supabase and Firebase are candidates; the final provider is not selected yet.
- Supabase uses PostgreSQL and SQL. MySQL is a separate database system, not a language to run inside Supabase or Firebase.
- Validate sensitive operations, including pricing, payment confirmation, inventory changes, and admin authorization, on the server or equivalent trusted backend.
- Store media references and metadata in the database rather than image file contents.

### Approved Media Split

**Static design assets:** Keep logos, icons, and fixed design backgrounds in website project files, for example `website/public/assets/images/`.

**Admin-managed media:** Store product images and other editable media in managed object storage. This includes homepage images when the owner needs to change them from the admin dashboard.

- Upload and replace editable images through the admin dashboard.
- Store the media object reference, display order, and relevant metadata in the database.
- Publish saved media changes automatically to the relevant storefront content without a website code change or redeployment.
- Apply upload validation and access rules so only authorized admins can manage media.
- Do not delete a shared image while it is still referenced by active content.
- The exact storage provider, bucket structure, and image delivery rules will be defined during implementation.

### Connections

```text
Website project assets → Fixed visual elements
Admin media upload → Object storage → Database media reference → Storefront display
Admin image replacement → Saved content update → Updated storefront image
```


## 6. Security, Privacy and Unique Identifiers

**Requirement:** Protect customer information, payment integrity, and administrative operations. Use unique identifiers for records and keep all secret credentials private.

### Credentials and API Access

- Keep payment secrets, database passwords, privileged service keys, and webhook secrets exclusively in server-side environment configuration or a managed secret store.
- Never place secrets in frontend code, public files, source control, logs, screenshots, or API responses.
- Some providers intentionally expose a publishable client identifier or key. Such values are not server secrets and must never grant privileged access; use them only when required by the selected provider and backed by authorization rules.
- Public-facing API endpoints must expose only intended operations and data, with authentication and authorization wherever required. An API being reachable does not make its private data public.
- Use separate development and production credentials and support secret rotation.

### UID and Record Ownership

- Use the authentication provider’s UID as the stable identity of an authenticated user.
- Use unique record identifiers, such as UUIDs, for products, orders, payments, and inventory records where appropriate.
- Enforce ownership and role checks on every protected read and write. Knowing a UID, UUID, or order number must not grant access.
- Keep customer-facing order numbers separate from access authorization.
- For guest orders, use a verified access mechanism; do not expose order details through an order number alone.

### Customer Data and Admin Access

- Collect only necessary customer information and limit returned fields to what each operation requires.
- Apply database access policies appropriate to the chosen provider, including row-level policies or equivalent security rules.
- Customers may access only their own protected data; anonymous visitors may access only deliberately public content.
- Restrict product, stock, financial, and order management to authorized admin roles.
- Require multi-factor authentication for privileged admin access.
- Use encrypted transport and secure session handling; avoid leaking personal information or secrets into logs.
- Establish retention, deletion, backup, and recovery procedures.

### Payment and Inventory Integrity

- Calculate authoritative prices, discounts, shipping charges, and totals on the trusted backend.
- Confirm payments through verified gateway notifications and/or server-side verification, checking the order, amount, currency, and payment reference.
- Never mark an order paid based solely on a browser redirect or client-provided status.
- Process retries and repeated notifications idempotently.
- Keep a traceable payment and refund history and reconcile transactions with the gateway.
- Do not store raw card details or card security codes in the application database.
- Apply atomic inventory changes or equivalent concurrency controls to prevent overselling.
- Restrict and audit refunds, financial adjustments, and manual inventory changes.

### Validation and Verification

- Validate input and uploaded files on the trusted backend.
- Apply suitable rate limits and abuse protection to login, checkout, order lookup, and other sensitive operations.
- Use appropriate protections for the selected authentication and session design.
- Before launch, verify cross-customer isolation, anonymous access restrictions, admin authorization, secret exposure, payment verification, and duplicate payment handling.
- Test backup recovery and review dependency security as part of launch preparation and maintenance.

**Implementation status:** These are required controls, not a claim that the unbuilt website is already secure. Provider-specific configuration and security tests will be completed during implementation.


## 7. Store Filters and Sorting

**Approved requirement:** Customers can combine filters and sort the product list.

### Filters

- Price range with minimum and maximum values.
- Size.
- Color.
- Product type or collection.
- In-stock availability.
- When size, color, and availability are combined, results must reflect matching purchasable variants rather than unrelated variants of the same product.

### Sorting

- Price: low to high.
- Price: high to low.
- Newest first.
- Best selling, calculated from actual orders using a defined treatment of cancellations and returns.

### Experience

- Show result count and active filters.
- Remove an individual filter or clear all filters.
- Preserve filters, sorting, and browsing position when returning from a product page.
- Provide a mobile filter panel with a clear Show Results action.
- Show a useful empty state when no products match.

## 8. Additional Approved Launch Features

The following suggestions were approved for the launch scope.

### 8.1. Product-Specific Size Guides

- Provide measurement tables appropriate to each product type and explain how to measure.
- Show model height and worn size when verified information is available.
- Make the relevant guide accessible beside product size selection without losing selections.

### 8.2. Store Search

- Search by product name and product type.
- Show suggestions and clear search results.
- Provide a useful no-results state.
- Return only published products visible to customers.

### 8.3. Shipping Estimate Before Payment

- Let customers select their delivery area and see the shipping charge and expected delivery timeframe before confirming the order.
- Base estimates on configured service areas and shipping rules.
- Recalculate and confirm the final charge when the delivery address is entered or changed.

### 8.4. Order Confirmations and Updates

- Send confirmation after an order is successfully created and updates when it ships.
- Include a secure route to order tracking without exposing private order details through an order number alone.
- Keep payment confirmation distinct from order receipt for pending or unpaid orders.
- The delivery channel will be selected later.

### 8.5. Admin Alerts

- New orders.
- Low stock, with configurable thresholds.
- Payments requiring review, based on explicit exception rules rather than every ordinary unsuccessful attempt.
- Admin alert channels will be selected later.

### 8.6. Admin Change History

- Record who changed a price, inventory quantity, or order status and when.
- Retain previous and new values and a reason where appropriate.
- Limit access to authorized administrators and protect audit records from ordinary editing.
- Avoid recording secrets or unnecessary personal data.

### 8.7. Report Exports

- Export orders and sales for a selected date range in a spreadsheet-compatible format.
- Respect active filters, reporting definitions, timezone, and admin permissions.
- Include only the fields necessary for the report and protect customer data.
- Export format and columns will be finalized during implementation.

### 8.8. Complete the Set

- Suggest complementary pieces from the relevant color family or collection on product pages.
- Allow a separate size selection for each piece.
- Show individual prices, availability, and the combined total clearly.
- Add only explicitly selected, available items to the cart.
- Let the admin manage product associations.
- No automatic bundle discount is implied by this feature.

## Scope Exclusions from the Latest Suggestions

The following suggestions were not approved for the current launch scope:

- Gift options, gift messages, and gift wrapping.
- A product-specific help-to-choose contact feature.
- Wishlist.
- Back-in-stock notifications.
- Customer product reviews.

These exclusions do not remove the already agreed general contact/support information, order support, or admin inventory alerts. They do not constitute a commitment to a later release.
