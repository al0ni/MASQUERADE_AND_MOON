# Masquerade & Moon — The Costume Atelier

An editorial, responsive, multi-page costume discovery website, featuring a curated wardrobe, an interactive product catalog, local demo accounts, rental previews and a live museum archive.

**Live website:** https://al0ni.github.io/MASQUERADE_AND_MOON/

## Pages
- `index.html` — editorial homepage and collections
- `catalog.html` — searchable and filterable 12-look costume catalog
- `rent.html` — rental explanation, validated request preview and FAQ
- `about.html` — brand story and concept
- `events.html` — themed inspiration and live Art Institute of Chicago API
- `contact.html` — validated local message form
- `signup.html` — client-side account creation
- `login.html` — client-side sign in
- `profile.html` — saved favorites and personal rental previews

## Technology
Plain HTML5, CSS3 (Grid/Flexbox), vanilla JavaScript, localStorage, Web Crypto SHA-256 password digest, fetch() and the [Art Institute of Chicago public API](https://api.artic.edu/docs/). No build step or external JavaScript frameworks. Costume photos are local assets from the original project; Google Fonts provides the display typography.

## Core functionality
- Mobile navigation and fully responsive layouts
- Persistent dark/light mode across every page
- Live costume search, category filtering, sorting and saved-only filtering; persistent filter choices
- Favorite looks across pages, accessible through account and catalog
- Accessible costume detail dialog with links to the rental preview form
- Signup/login with JavaScript validation, visible inline errors and local account storage
- Passwords are stored as **salted SHA-256 digests**, not plaintext. This is still **a client-side demonstration, not production-grade authentication**. Browser-local data and session state are not secure against someone with access to the same device.
- Rental previews stored in localStorage; listed in the user profile if the email matches
- Contact form validated and saved locally (not sent to a mailbox)
- Museum API uses async/await, loading indicator, error message and retry
- Accessible inputs/labels, focus styles, semantic landmarks, reduced-motion support
- No fake live business, payments, order submission or actual reservations

## Local development
Use a local HTTP server, for example `python -m http.server 8000`, and visit http://localhost:8000. HTTPS or localhost is necessary for Web Crypto used during signup and login.

## Defense / verification checklist
1. Navigate all pages via desktop and mobile menus.
2. Switch theme and navigate to a different page; verify persistence.
3. Search for `Crimson`, filter `Gothic`, sort by price, save a look, then filter to saved only.
4. Create a test account using name, valid email, phone and strong password. Try invalid data first and verify inline errors.
5. Log out, attempt an incorrect password, then log in successfully.
6. Create a rental preview with a future event date. Open profile and verify the saved request.
7. Check contact validation, then save a demo message.
8. Open Inspiration and verify live museum artwork, or use retry/error state if API is unavailable.
9. Test Chrome DevTools responsive widths at 375, 768, 1024 and 1440 pixels.
10. Verify every page and image through the published GitHub Pages address.

## Privacy and limitations
No backend is present. All account, favorite, form and request data remains on the same browser/device and may disappear if site storage is cleared. **Never use a real personal password**. The website is a fictional demonstration and does not process actual rental bookings, payments, or customer support requests.
