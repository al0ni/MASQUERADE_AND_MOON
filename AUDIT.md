# Strict Final Project Audit

This note documents implementation and checks; it does not claim a guaranteed grade.

| Requirement | Implementation | Verification |
|---|---|---|
| Responsive (10) | CSS Grid and Flexbox, mobile navigation, 2-column mobile catalog, no overflow | Automated Chromium at 375, 768, 1024, 1440px |
| Hosting (5) | GitHub Pages on main | Confirm a successful Pages deployment after merge |
| Dark/light (5) | Theme button; `localStorage` key `mm_final_theme` | Theme survives page navigation |
| Design & UX (20) | Editorial color palette, accessible focus styles, 19 curated pieces, optimized imagery | Visual previews and keyboard checks |
| Auth (5.1) | Sign up / login / profile with browser-only salted password digest | Sign up, failed login and successful login tests |
| Forms (5.2) | Inline JavaScript validation, novalidate forms, phone and password rules | Invalid/valid form submissions tested |
| Search & filtering (5.3) | Live search, collection shortcuts, sort, saved filter | Filter and search browser tests |
| Animations (5) | Hover/focus transitions and modal interactions; prefers-reduced-motion | CSS + browser checks |
| External API (10) | Art Institute of Chicago API, fetch, progress, retry, error state | Browser tests with simulated API success and failure |
| Cohesion (10) | Costume discovery, saved looks, rental preview, art inspiration, character quiz | Functional flows connect pages |
| Presentation (5) | Team must explain the code and demo actual features | Requires team preparation |
| Code organization (5) | Nine HTML pages, shared CSS and JS, tests and scripts | Smoke checks and syntax checks |

## Findings and fixes
- Previously large JPEG files (~30 MB total) were recompressed for mobile performance (~6 MB total).
- Multiple cards had descriptions that did not match their photos. Product names and descriptions were corrected.
- Product images looked clickable but were not interactive. They are now native buttons with proper labels.
- The mobile account link did not reflect sign-in state. It now does.
- Invalid rental dates such as impossible calendar dates are rejected.
- Category shortcut controls and 'recently admired' now give visitors useful reasons to return.
- All product images are local and checked for existence; no stock photo URLs are relied on for storefront cards.

## Known limitations
- Browser-only authentication is a **simulation** and must not be used to protect actual accounts.
- Rental requests and contact messages remain in the browser; they are **not** orders, emails or real reservations.
- Product prices are illustrative, and no online checkout, payment or inventory backend exists.
- The museum service is external and may be temporarily unavailable; the site displays a retry option.
- Source and licensing rights for existing photographs should be checked before any public commercial use.
