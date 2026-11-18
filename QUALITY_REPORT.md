# Final Project Quality Report

Team: Alua, Assiya, Moldir. Date: 18 November 2026.

## Executed checks

- Static smoke suite: 10 HTML pages, 354 local asset/link references, 24 distinct costume photographs and six matched museum artworks.
- Browser suite: 155 assertions covering sign-up, hashed storage, incorrect/correct login, profile, rental/contact validation, saved requests, guestbook, product reviews, theme persistence, filters, favorites, API success/failure and responsive overflow.
- Quality audit: 122 page/viewport/accessibility/interaction checks. Ten representative routes at widths 320, 360, 375, 390, 768, 820, 1024, 1280, 1440 and 1920 px, plus WCAG A/AA axe checks in both themes and password controls. No reported findings.
- Product suite: 81 assertions covering all 24 product routes and forms, favorite-button feedback, missing fields, short comments, escaped review text, product isolation, invalid IDs and mobile-menu keyboard dismissal.
- Live API probe: The Met returned matching public-domain artwork Mask, object ID 22739.

## Changes completed from PR #8

Each costume has a detail page and its own validated review form. The three supplied lookbook photographs are matched to Alua / Storybook Princess, Assiya / The Phantom and Moldir / Midnight Ballgown. Lookbook captions remain clearly identified as examples without fabricated star ratings. Actual visitor reviews are stored locally, shown only on the matching product and available through the homepage review manager.

Fixed pointer interception on rating controls, persistent-filter interference in tests, image-decode timing, missing product screenshot output and stale favorite-button feedback. Added product regression checks to CI and a dependency lockfile. No source-code comments were added.

## Scope and limitations

Browser checks were executed in desktop Chromium/Chrome; they do not certify every physical device or browser. Automated accessibility checks do not replace manual assistive-technology testing. Live API availability can change; controlled failure/success tests verify the gallery fallback and retry flow. Accounts, messages, requests, favorites and reviews remain in the current browser. There is no backend, shared review database, real booking or payment. Presentation scoring depends on the team demonstration.

## Submission

Website: https://al0ni.github.io/MASQUERADE_AND_MOON/

Repository: https://github.com/al0ni/MASQUERADE_AND_MOON

PR: https://github.com/al0ni/MASQUERADE_AND_MOON/pull/8
