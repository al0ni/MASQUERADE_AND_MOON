# Strict Final Project Audit

This note documents implementation and checks; it does not claim a guaranteed grade.

| Requirement | Implementation | Verification |
|---|---|---|
| Responsive (10) | CSS Grid and Flexbox, mobile navigation, 2-column mobile catalog, no overflow | Automated Chromium at 10 widths from 320 to 1920px; image decoding checks |
| Hosting (5) | GitHub Pages on main | Confirm a successful Pages deployment after merge |
| Dark/light (5) | Theme button; `localStorage` key `mm_final_theme` | Theme survives page navigation |
| Design & UX (20) | Editorial color palette, accessible focus styles, 19 curated pieces, optimized imagery | Desktop/mobile previews, keyboard checks, WCAG scans in both themes |
| Auth (5.1) | Sign up / login / profile with browser-only salted password digest | Sign up, failed login and successful login tests |
| Forms (5.2) | Inline JavaScript validation, novalidate forms, phone and password rules | Invalid/valid form submissions tested |
| Search & filtering (5.3) | Live search, collection shortcuts, sort, saved filter | Filter and search browser tests |
| Animations (5) | Hover/focus transitions and modal interactions; prefers-reduced-motion | CSS + browser checks |
| External API (10) | Art Institute of Chicago API, fetch, progress, retry, error state | Browser success/error fixtures plus an optional live API probe |
| Cohesion (10) | Costume discovery, saved looks, rental preview, art inspiration, character quiz | Functional flows connect pages |
| Presentation (5) | Team must explain the code and demo actual features | Requires team preparation |
| Code organization (5) | Nine HTML pages, shared CSS and JS, tests and scripts | Prettier formatting, smoke checks, browser tests, and accessibility audit |

## Findings and fixes
- Previously large JPEG files (~30 MB total) were recompressed for mobile performance (~6 MB total).
- Multiple cards had descriptions that did not match their photos. Product names and descriptions were corrected.
- Product images looked clickable but were not interactive. They are now native buttons with proper labels.
- The mobile account link did not reflect sign-in state. It now does.
- Invalid rental dates such as impossible calendar dates are rejected.
- Category shortcut controls and 'recently admired' now give visitors useful reasons to return.
- All product images are local and checked for existence; no stock photo URLs are relied on for storefront cards.

## Final critical-audit improvements
- All core HTML, CSS and JavaScript were formatted consistently, with no explanatory code comments.
- Updated mismatched product descriptions so the visible accessory or costume matches the listing.
- Password visibility controls make sign-up and login easier to use on phones without changing validation.
- Local account retrieval tolerates malformed stored user lists rather than crashing login.
- Museum requests have a 12-second timeout, informative fallback and retry, plus local images for unavailable artwork photos.
- Image decoding and horizontal overflow are checked across all nine pages at 320, 360, 375, 390, 768, 820, 1024, 1280, 1440 and 1920 pixels.
- Automated WCAG accessibility checks cover nine pages in both light and dark themes.
- Live API health can be checked independently without claiming the external museum is always online.

## Known limitations
- Browser-only authentication is a **simulation** and must not be used to protect actual accounts.
- Rental requests and contact messages remain in the browser; they are **not** orders, emails or real reservations.
- Product prices are illustrative, and no online checkout, payment or inventory backend exists.
- The museum service is external and may be temporarily unavailable; the site displays a retry option.
- Source and licensing rights for existing photographs should be checked before any public commercial use.
