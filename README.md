# Masquerade and Moon

Frontend Assignment 5 continues the team's six-page costume rental website.

## Team
Alua Rakhimzhanova, Assiya Aitbayeva, Moldir Yerzhan
Group SE-2509

## Run
Extract the complete folder and open index.html. All images, Bootstrap files and audio are included locally. No installation or build step is required.
For consistent storage across pages, use a local web server or the deployed site.

## Features
- All pages: day/night theme, sound toggle, arrow-key menu navigation, Home and End shortcuts.
- Home: five-star rating with saved selection.
- Catalog: collection filter using switch, live search, price sorting, saved looks and clear filters.
- Catalog: thumbnail gallery updates the large image source and alternative text.
- How to Rent: three-step look preview with validation, Back, Next and Start over controls.
- Shared JavaScript objects and methods, arrays, for loops, map, filter and forEach.
- Local notification sound reuses one audio player and restarts it to prevent overlapping playback.
- Event-triggered animations respect reduced-motion preferences.
- Existing Assignment 4 validation, FAQ, subscription popup, color control and clock remain available.

## Storage and privacy
Theme, sound preference, rating and favorite costume IDs are stored in localStorage. Storage access is guarded so the interface still works if the browser blocks it. Forms do not send or save names, passwords or email addresses. The look preview is an estimate, not a real booking.

## Structure
HTML contains content. css/style.css and css/advanced.css contain presentation. js/script.js preserves Assignment 4 and js/advanced.js contains Assignment 5. There are no inline styles, inline event handlers or code comments in the project source.
Third-party Bootstrap distribution files retain their required license notices.

## Deployment
Repository: https://github.com/al0ni/MASQUERADE_AND_MOON
Website: https://al0ni.github.io/MASQUERADE_AND_MOON/
GitHub Pages publishes the main branch.

## Defense walkthrough
1. Home: change theme, enable sound and click a rating star.
2. Focus Home in the navigation, press ArrowRight, ArrowLeft, Home and End.
3. Catalog: choose Gothic, sort by price, search, save a look and enable Saved looks only.
4. Clear filters; enter an unmatched query to show the empty state.
5. Select a gallery thumbnail and explain src, alt and aria-pressed updates.
6. How to Rent: try Next with an empty name, complete the steps, go Back and finish the preview.
7. Reload to demonstrate saved preferences. Use Start over to clear the preview.
