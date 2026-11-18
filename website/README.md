# BTTR frontend — first visual build

## Run locally

Serve only `website/public/` with a static HTTP server, for example from the project root:

```text
python -m http.server 4173 --bind 127.0.0.1 --directory website/public
```

Open http://127.0.0.1:4173. No build step, package install, environment variables, or API keys are required. HTML, CSS and vanilla JavaScript only.

## Implemented

- Responsive single-page layout: Home → About BTTR → three-product Store preview with a See more card, with section navigation and an active-section indicator.
- Visible header search bar, rounded category navigation, always-visible mobile navbar, category/color/search filters, name sorting, URL-persisted filter state, dedicated product pages, and informative bag/help panels.
- Off-white dominant theme, rounded buttons/image containers/dialogs, restrained brand accents, small motion effects with reduced-motion support, keyboard focus and native accessible dialogs.

## Preview boundaries

All collection items and editorial copy are illustrative proposals, not approved catalog data or a final tagline. Images were extracted unchanged from the supplied brand brief as local development references; confirm replacement or usage rights before publication. They are temporarily local for frontend review, not the final admin-managed media architecture.

No checkout, customer collection, order tracking, admin authentication, payment, database, analytics, or real stock is implemented. The preview bag supports only local sample selections and quantities. There are no fabricated prices or stock levels. Bag, sizing and policy panels explicitly explain their preview state. The initial store omits size/price filters, price sorts and best sellers until real product data and commerce behavior are supplied.

## Layout

- `public/index.html`: complete scrollable main page. `store.html` displays the full collection and filters; `about.html` forwards to the About section.
- `public/assets/css/base.css`: theme, layouts and responsive rules.
- `public/assets/js/main.js`: local frontend interactions and sample references. Product and bag details live in `public/assets/js/details.js`; sample data lives in `public/assets/js/catalog.js`.
- `public/assets/images/`: development reference imagery.
- `server/`, `tests/`: reserved folders, not served publicly.

Next decisions: review this visual direction, then build the next requested page and its states. Provider selections remain open.

## Verification performed

Browser checks passed at 360, 390, 768, 1024 and 1440 pixels across all three pages, including search, combined filters, empty/reset states, URL persistence, product and information dialogs, mobile navigation, reduced motion, image loading and horizontal overflow. No JavaScript runtime errors were observed. Desktop/mobile screenshots are in the project outputs folder. The development smoke script is in `tests/frontend-smoke.cjs`; its local Playwright/browser paths are environment-specific.


Navigation uses same-origin cross-document view transitions where supported, including a curved Store entrance/return and shared navbar highlight. Short-lived sessionStorage records only route/selection/timestamp data for the visual transition, never customer or payment information.


## Detail UI implemented

Product pages now include gallery thumbnails, zoom, sample size selection, local preview-bag addition, detail accordions and related pieces. The bag is a responsive drawer with quantity/remove controls and local persistence; checkout is disabled. The size guide has cm/in tabs and measurement instructions, with blank measurements until real charts are supplied. Store controls include a filter drawer (category/color/sample size), custom sort menu and keyboard-operable search suggestions. Price filters remain disabled without real prices. The main page still has no search bar.

Verified end-to-end with `tests/commerce-details.cjs`: filtering, keyboard suggestions, product navigation, size selection, size guide, preview-bag quantity/persistence/removal, zoom, return context, invalid products and four screen widths.
