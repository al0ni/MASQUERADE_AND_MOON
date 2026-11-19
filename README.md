# Masquerade & Moon — Costume Atelier

A responsive concept website for browsing theatrical costumes, choosing a look for an event, and saving a rental request. The project uses **HTML, CSS, and vanilla JavaScript**, with no backend.

## Website pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home, six collections, featured costumes, rental guide and reviews |
| `catalog.html` | Search, category filtering, sorting, favorites and costume previews |
| `product.html?id=...` | Individual costume details, photo reviews and review form |
| `rent.html` | Rental information and a validated rental-request form |
| `events.html` | Event inspiration and live museum artworks from a public API |
| `about.html` | About the concept and collection |
| `contact.html` | Validated contact form |
| `signup.html` | Create a demo account |
| `login.html` | Log in to a demo account |
| `profile.html` | Account details, saved looks and saved rental requests |

## Main features

- Responsive layouts using CSS Grid and Flexbox for desktop, tablet and mobile.
- Light/dark mode with the chosen theme saved across pages using `localStorage`.
- 24 costume listings, each with its own picture, description and illustrative rental price.
- Live text search, category filtering and sorting; filter preferences saved locally.
- Favorites, product details and recently viewed costumes.
- Sign-up and login using JavaScript validation and browser-local account data.
- Passwords are stored as salted SHA-256 hashes instead of plain text.
- A profile page that shows stored user details, favorites and demo rental requests.
- Custom validation with visible messages for required fields, email, password complexity, telephone numbers and event dates.
- Review forms on individual costume pages with star ratings, custom validation and local saving. Three example photo captions (Alua, Moldir, Assiya) are labeled as demo content, not verified customer ratings. The homepage guestbook remains available. There are no fabricated star ratings.
- The Metropolitan Museum of Art public API for historic artwork on the Inspiration page. The site shows a loading state, a retry button, an error message and verified local images that remain visible when the API is unavailable.
- Hover transitions, accessible focus states and reduced-motion support.

## Run locally

Open the project folder in a terminal and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Use the local server, not a double-clicked `file://` page, to ensure browser features work consistently.

## Verify the project

Run the static checks with:

```bash
node tests/smoke.mjs
```

The automated browser tests use Playwright. Install it and Chromium, then start the local server:

```bash
npm install
npx playwright install chromium
node tests/browser.mjs
node tests/audit.mjs
node tests/products.mjs
node tests/api-live.mjs
```

A GitHub Actions workflow runs these tests for pushes and pull requests.

## Deployment and submission

The site is served directly by GitHub Pages from the repository. Changes are reviewed and tested through pull requests before updating `main`.

- Repository: https://github.com/al0ni/MASQUERADE_AND_MOON
- Website: https://al0ni.github.io/MASQUERADE_AND_MOON/

## Important limitations

This is an educational front-end simulation. There are no real payments, bookings, deliveries, public reviews, password-reset emails, or customer-support messages. Account details, requests, favorites and reviews remain in the current browser and can be cleared with its stored data. Do not reuse a real password for this demo. External museum artwork availability depends on the API service.

## Artwork photos and live API

The six museum artwork cards on `events.html` use local WebP copies of the same public-domain objects identified by `objectID` in The Metropolitan Museum of Art Open Access API. They are not generic stock images. The page fetches live object metadata using `fetch()` and updates title, creator, date, and source link when the API is reachable. A loading indicator, retry button, and explicit offline-status message cover failures; an unavailable API never replaces a museum photograph with an unrelated image. Cached data and sources are listed in `data/museum-catalog.json`.
