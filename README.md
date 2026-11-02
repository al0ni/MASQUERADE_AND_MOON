# Masquerade and Moon - Assignment 6

Team: Alua Rakhimzhanova, Assiya Aitbayeva, Moldir Yerzhan. Group SE-2509.

Website: https://al0ni.github.io/MASQUERADE_AND_MOON/

Open index.html or use the published website. For clipboard access, use HTTPS or a localhost server. All images, audio and library fallbacks are included. There is no build step.

## Features and demonstration

0. Open the console: jQuery is ready! The CDN is included in the head; a local copy is used if the CDN is unavailable.
1. Catalog: type Crimson to filter the costumes immediately.
2. Select a suggestion with the mouse or ArrowDown and Enter. Escape closes the suggestions.
3. Matching text is highlighted in the product titles and descriptions. Clear filters restores all looks.
4. Scroll any page: the burgundy and gold progress bar fills at the top.
5. Home: scroll to the statistics. The counters animate to 12 looks, 4 collections and 5 sizes.
6. Home: click Subscribe, enter a valid email and submit. The spinner runs for 1.6 seconds and the button is disabled.
7. Catalog: save or remove a look to show a fading notification.
8. Home: Copy the website link. The icon changes to a checkmark and a tooltip appears.
9. Catalog: images use data-src until they enter the viewport. Check the Network panel before and after scrolling.

## Files

- js/script.js: Assignment 6 jQuery features.
- js/legacy.js: earlier form validation, FAQ, popup, background control and clock.
- js/advanced.js: themes, sound, rating, gallery and rental preview.
- css/jquery.css: new component styles.
- vendor: local Bootstrap and jQuery files with original license notices.

Forms are demonstrations and do not send or save personal data. Theme, sound, rating and saved looks use localStorage. Existing sorting, collection filters, gallery and rental preview remain available.
