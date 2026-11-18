# Final Project Quality Report — 18 November 2026

**Source reviewed:** the ZIP `MASQUERADE_AND_MOON_API_PHOTOS_FIXED.zip`, followed by small fixes to the account redirect handling, duplicate editorial image, source formatting and defense documentation. This report describes source checks and an isolated browser test. It does **not** certify an independent, complete run of the deployed GitHub Pages website.

## Results by grading criterion

| Criterion | Source finding | Remaining risk / defense action |
| --- | --- | --- |
| 1. Responsiveness (10) | CSS Grid, Flexbox, media queries; all nine pages tested in a Chromium rendering harness at 320, 375, 768, 1024 and 1440 px without horizontal overflow. | Also verify real-device scrolling and click targets before submission. |
| 2. Hosting (5) | All nine pages and 323 local references are structurally valid; local photos decode. | **BLOCKER:** the current GitHub `main` still contains the older site. Publish this ZIP to `main`, verify the Pages deployment, and submit both URLs. |
| 3. Light/Dark (5) | A button changes `data-theme`, with persistent localStorage. Main theme colors meet at least 4.5:1 contrast for text, muted text and accent against the primary backgrounds. | Check any image-backed headings in both themes on the deployed site. |
| 4. Design/UX (20) | Consistent costume atelier theme, 24 distinct costume photographs, separate editorial imagery and six matched museum images. All static form controls have accessible labels. | Design scoring is subjective. Look over all nine pages at native resolution. |
| 5. Enhanced JS (25) | Browser-local sign-up/login/profile, inline validation, password hashing, phone checks, category filtering, search, sorting, favorites, rental previews, reviews and saved state. | Authentication is a simulation and is not secure for real accounts. Show both invalid and valid flows in a hosted secure context. |
| 6. Animated UI (5) | CSS hover/focus transitions and a `prefers-reduced-motion` safeguard. | Use mouse and keyboard to demonstrate the effect. |
| 7. External API (10) | Real Met Museum object IDs, `fetch()`, `async/await`, loading, timeout, errors and Retry; six matched photographs saved locally. Offline behavior tested. | Live API availability could not be independently verified here. Test it from the published site immediately before defense. |
| 8. Cohesion (10) | All core features relate to costume discovery, rental planning or event inspiration. | Demonstrate purpose, not the number of decorative effects. |
| 9. Overall presentation (5) | A team demonstration guide and common Q&A are included. | Cannot be verified by automated tests. All three presenters must rehearse and explain their sections. |
| 10. Code organization (5) | Nine HTML files; one main CSS, one main JavaScript, images, data, tests, documentation. No comments are included in source code, per team preference. | The rubric specifically asks for comments on complex code. Explain the functions clearly, or reconsider this preference if the teacher requires comments. |

## Executed checks

- 9 HTML pages found; 24 unique costume images and 6 matched museum object images.
- 323 local link and asset references checked; relative targets were present.
- Anchor targets across pages checked: none missing.
- 40 image files passed image integrity verification.
- No exact duplicate image files found; a few costumes use deliberately similar neutral studio backgrounds.
- JavaScript passes `node --check` and the project's static smoke script.
- An isolated Chromium rendering harness performed **116 checks**, including responsive overflow, decoded images, search, sorting, filtering, favorites, detail dialog, offline museum state, reviews and invalid form messages; no findings after lazy images were explicitly loaded.
- A second isolated browser test performed **10 checks** for sign-up data, hashed storage, incorrect and correct credentials, saved rental data, profile rendering and contact storage. A test-only cryptography stub was required because the restricted browser cannot navigate to a secure local origin.
- Core theme color contrast checked by WCAG contrast formulas: dark mode primary/secondary/accent text = approximately 7.7–16.6:1; light mode = approximately 5.9–15.8:1 against the primary page and card surfaces.
- Local Chromium could not navigate to `http://localhost` due a browser security restriction, so the site was loaded in-memory for these interaction checks. This does not prove actual HTTPS hosting, network fetching, or every full browser navigation. It is not a substitute for GitHub Pages verification.

## Fixes in this audited copy

- Corrected misleading error handling around successful account storage and the subsequent page redirect.
- Replaced the repeated image on Sign Up with a distinct blue masquerade look and updated its alt text.
- Formatted the last appended CSS rules and six museum objects for readability without adding comments.
- Corrected README wording and the smoke-test output labels.
- Added a practical team defense guide and the deployment checklist.

## Priority before defense

**P0 — Publish the new ZIP contents to GitHub `main`.** Without this, the live website is not the audited version and Hosting points are at risk. Then check the live API, all images, navigation and test signup on the published URL.

**P1 — Rehearse the speaking parts.** The project itself cannot guarantee 100/100; the final five presentation points depend on the team and teacher's judgment.

**P2 — Understand the limitation of localStorage.** Demo accounts, reviews and requests do not synchronize between visitors or devices. Do not suggest otherwise during defense.
