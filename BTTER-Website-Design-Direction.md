# BTTR — Website Design Direction

## Core Requirement

The website must feel modern, calm, and internationally polished, with a distinctive identity rather than a generic AI-style template. Every visual detail and interaction must connect to BTTR, its name, and its brand brief.

## Principles

- **Modern and calm:** generous space, clear hierarchy, considered layouts, and subtle movement with a purpose.
- **International quality:** refined typography, art-directed imagery, careful proportions, and attention to mobile and desktop details.
- **Distinct identity:** a visual language specific to BTTR, avoiding repetitive template styling and arbitrary decoration.
- **Connected to the name:** translate softness, fluidity, comfort, femininity, and quiet confidence into the digital experience.

## Application

- **Color:** warm cream, butter-inspired tones, beige, and espresso, informed by the brand brief.
- **Imagery:** soft light, tactile materials, and a consistent photographic direction.
- **Typography and layout:** refined type, editorial spacing, and consistent hierarchy.
- **Motion:** gentle, purposeful transitions that support usability.
- **Shopping:** clear product options, easy navigation, and a calm checkout experience.
- **Voice:** concise, confident language consistent with the brand.
- **Consistency:** shared visual and interaction rules across every page, from Home through order tracking.

## Review Standard

Every design choice should strengthen BTTR’s identity, support the customer, and feel part of the same brand world.

This is an approved direction brief, not a final website mockup. Specific typefaces, layouts, motion behavior, and final visual treatments remain to be developed.


## Approved Name Update — 2026-10-31

The current brand name is **BTTR**. Earlier images and the original PDF retain the previous name as historical references. Use BTTR for new designs; the revised naming explanation remains to be confirmed.


## Approved Frontend Direction — 2026-10-31

Creamy, smooth, fast and well organized. Off-white should dominate approximately 70% of the visual treatment, with remaining color drawn from the brand PDF and action buttons. Use simple, purposeful animations. The current build is a frontend-only interpretation for review; earlier image concepts are not approved templates.


## Frontend Refinement — 2026-10-31

Use a more rounded treatment for image containers, buttons, dialogs, search and navigation. Provide a visible search bar and a clear navigation bar. All current images are temporary examples; the owner will supply replacement photography later. This does not request an upload service or backend implementation yet.


## Compact Navigation — 2026-10-31

On desktop, the navigation pill is content-width with a small inset around Home, About BTTR and Store, centered directly beneath the logo. Tracking remains accessible through the footer rather than widening this main navigation. Mobile retains its collapsible menu.


## Liquid Navigation Motion — 2026-11-01

The active navbar highlight stretches into a soft bridge and fades toward the selected section, then settles into a rounded pill. Text remains crisp. Rapid clicks retarget from the current visual position, smooth scrolling preserves the clicked destination during travel, and reduced-motion preferences disable the morph.


## Navigation Selection Stability — 2026-11-01

Use one controller for main-page section navigation. Keep the clicked destination selected during smooth scrolling; do not use a fixed expiry to recompute selection while traveling. Manual scrolling selects the section at the reading line, and history/deep links restore the matching section without an initial highlight animation. Verified repeated/rapid clicks, idle stability, interrupted scrolling, direct hashes, Back navigation, reduced motion and mobile selection.


## Full Store Entrance — 2026-11-01

Same-origin page navigation uses a short soft fade with a gentle upward entrance. Shared header and announcement remain visually stable. The full Store heading and filter controls enter in a small sequence; browsers without cross-document transitions retain the entrance. Reduced-motion preferences remove these effects. Native links, keyboard navigation, new tabs and browser history remain intact.


## Bidirectional Store Transition Refinement — 2026-11-01

Replace the earlier simple fade with an 850ms curved content wipe, reversing direction when returning from the full Store. Shared header and announcement remain steady; the active navbar pill is a shared element with soft blur/fade during its cross-document movement. Preserve short-lived source/target visual state for return links and history restoration. Respect reduced motion and retain native navigation when visual-state storage is unavailable. Verified return links to Home/About/Store, pill alignment, browser Back, reduced motion and mobile navigation.


## Mobile Navbar — 2026-11-03

Phones use the same always-visible compact three-link pill as desktop, centered beneath the logo/search area, with the liquid selected-section highlight. No hamburger expansion is needed. Keep touch targets at least 44px high, fit narrow screens without horizontal scrolling, and remeasure the highlight after orientation or navbar size changes. Tracking stays in the footer. This replaces earlier collapsible mobile navigation requirements.


## Centered Section Landing — 2026-11-03

Navbar links center the target section in the visible viewport below the sticky header, clamped to the available page scroll range. Section detection uses the same visible center line so the selected highlight remains consistent. The same positioning applies to direct anchors and returning from the full Store.


## Screenshot-Matched Section Framing — 2026-11-03

Supersedes whole-section centering. Desktop Home places the hero image immediately below the sticky header. About lands at the image-and-copy block with a 35px gap, skipping its introductory heading. Store lands at its preview heading with a 16px gap so product cards follow in view. Phones use a 24px gap and Home targets its introductory copy rather than skipping to the image. Apply the same focal anchors for navbar clicks, direct links and returns from the full Store.


## Search Placement — 2026-11-03

Search appears only on the dedicated full Store page. The main Home/About/Store-preview page has no search field. Its mobile header places the compact navbar directly below the logo row.


## Store Grid — 2026-11-05

The dedicated full Store uses four products per row on desktop (above 1100px), three on tablets (701–1100px), and two on phones (up to 700px). The main-page preview remains three products plus its See more card.


## Warm Brand Palette — 2026-11-05

Based on the user-supplied palette image: Butter Cream, Ivory, Beige, Caramel, Brown, Espresso and Black. The implementation uses visually interpreted working hex values, not verified official codes: #F1E7D4, #F8F6EF, #CBB69B, #BB936F, #80563F, #493127, #171715. Ivory remains dominant. Pair ivory/espresso for content, butter/brown for the brand-story pause, caramel/espresso for See more, and espresso/ivory for the footer. Actions use a short warm-color glaze, the collection invitation has a soft expanding butter fill, and product/link hover responses stay restrained. Reduced motion removes decorative movement. Theme rules are isolated in website/public/assets/css/theme.css.


## Commerce Detail Interfaces — 2026-11-05

Added rounded bag/filter drawers, dedicated product page with gallery/zoom/sample size selection, size-chart panel with cm/in controls, custom sort menu and keyboard search suggestions. Sample bag state persists locally without personal data; checkout remains disabled. Measurements stay blank, prices remain unconfirmed and sample sizes are labeled. Product return links preserve Store filters and browsing position. These interfaces use ivory/butter surfaces, espresso actions, subtle borders and reduced-motion-aware transitions.
