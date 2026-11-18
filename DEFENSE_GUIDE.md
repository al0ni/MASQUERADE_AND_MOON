# Final Defense Guide — Masquerade & Moon

This guide is for the team presentation, not for the customer-facing website. Speak naturally and show the working features rather than reading every line.

## Presentation plan: approximately five minutes

### Presenter 1 — purpose, design, responsiveness, catalog (0:00–1:40)

**What to say (simple English):**

> Hello. This is Masquerade & Moon, our responsive costume atelier website. It helps people explore costumes for themed parties, balls and photoshoots. It has ten connected HTML pages, including a shared detail page for all costumes and 24 costumes. We built it with HTML, CSS and vanilla JavaScript. The design uses the same fonts, colors and navigation across all pages.

> We used CSS Grid for the costume cards and Flexbox for navigation and other sections. Media queries change the layout for phones, tablets and computers. The catalog has live search, category filters, price sorting and a saved-only filter. We update the cards with JavaScript without refreshing the page.

**Show:** homepage → mobile-width menu → light/dark toggle → Collection → search “Phantom” → reset → Gothic filter → price sorting → favorite → product details.

### Presenter 2 — account, profile, forms (1:40–3:15)

**What to say:**

> Our website has a simulated sign-up and login system because the assignment does not require a backend. Sign-up checks the user's name, email, phone number and password. The password must contain at least eight characters, uppercase and lowercase letters, a number and a symbol. We use JavaScript validation, and errors appear next to the fields. Our forms use `novalidate`, so browser validation does not replace our messages.

> We store account data in localStorage. We store a salted password hash, not the password in plain text. Login checks the credentials and opens the Profile page. Users can see their details, saved costumes and local rental requests. This is a demo and is not secure authentication for a real store.

**Show:** empty signup → errors → valid signup → profile → logout → wrong password → correct login → rental form (preferably with a future date).

### Presenter 3 — external API, reviews, quality and hosting (3:15–5:00)

**What to say:**

> On the Inspiration page, we use the public API of The Metropolitan Museum of Art. We call it with `fetch()` and `async/await` to load current information about real museum objects. Each image is a local copy linked to the same museum object ID, so there are no unrelated photos. The page has a loading message, error handling and a Retry button. If the API is unavailable, the correct saved photographs remain visible.

> Our review form lets visitors choose stars, write a comment and delete a saved review. Reviews are stored only in the current browser; they are not public reviews. Our repository has clear HTML, CSS, JavaScript, images, tests and documentation. We publish the site using GitHub Pages.

**Show:** Inspiration gallery → one museum link → retry or error state if present → Reviews section → invalid review → valid review → both repository and live site links.

## Fast teacher questions and answers

**What is responsive design?** — A layout that adapts to different screen sizes without hiding or overlapping important content.

**CSS Grid vs Flexbox?** — Grid is useful for two-dimensional layouts like a product gallery. Flexbox is useful for arranging items in a row or column.

**What is a media query?** — A CSS rule that applies styles for a certain screen size or other condition.

**What is `localStorage`?** — Browser storage that keeps strings between page reloads on the same device and origin.

**Why use `JSON.stringify()` and `JSON.parse()`?** — localStorage stores strings. These methods convert arrays and objects to and from strings.

**How does dark mode work?** — JavaScript changes the `data-theme` attribute on `<html>`, CSS reads that attribute, and the selected value is saved in localStorage.

**What does `preventDefault()` do?** — It prevents the normal form submission, so JavaScript can validate and handle the form.

**How do you validate email, phone and password?** — Email is checked by a regular expression, phone by permitted characters and 10–15 digits, and password by length plus uppercase, lowercase, digit and symbol rules.

**Why use `novalidate`?** — To disable default browser form validation and display our own clear inline errors.

**What happens after Sign Up?** — The browser stores a demo account, starts a local session and opens the profile page.

**What is hashing?** — A one-way transformation of a value. The demo stores a salted SHA-256 digest instead of a readable password. It still does not make client-side authentication production-secure.

**What is `fetch()`?** — A JavaScript function that requests data from a URL, often an API.

**What is `async/await`?** — Syntax for working with asynchronous operations such as API calls without deeply nested callbacks.

**What is `Promise.allSettled()`?** — It waits for all operations to finish and lets us handle both successful and failed requests.

**Why are museum images saved locally?** — An external photo server can fail or block embeds. Our local files belong to the same museum IDs that we fetch, so a failure does not show incorrect images.

**Can reviews or rental requests be seen by other users?** — No. This project has no server. That information stays in one browser's localStorage.

**Does this site process real payments or rentals?** — No. Prices and rental requests are clearly marked as demonstration data.

**What is the target audience?** — People looking for costumes for balls, themed parties and photoshoots.

**How did we verify quality?** — We checked HTML paths and images, JavaScript syntax, responsive layouts, form errors, saved browser state, API fallback and the primary features.

## Five-minute last-minute rehearsal

1. Open the hosted **live** URL (not a local `file://` tab) and check that there are 24 catalog items.
2. Demonstrate one search, one category, one favorite and one costume detail.
3. Demonstrate invalid form errors, then a successful test account. Use a disposable password.
4. Explain the museum API and what happens when it fails.
5. Demonstrate review submission and deletion.
6. Switch light/dark themes, open a new page and confirm that the choice remains.
7. Open the GitHub repository and show `index.html`, `css/style.css`, `js/script.js` and `images/`.

Do not claim that reviews, bookings, payments, email, passwords or orders are managed by a real backend. Do not invent which person wrote which code. Every presenter should understand the feature they demonstrate.

## Submission checklist — complete before 18 November 2026, 23:59

- Extract the final ZIP. Upload the **contents** of `MASQUERADE_AND_MOON` into the root of the GitHub repository's `main` branch, not the containing folder as a subfolder.
- In GitHub Actions, confirm the Pages build and the automated tests succeed.
- Open `https://al0ni.github.io/MASQUERADE_AND_MOON/` and test `catalog.html`, `events.html`, `signup.html` and `profile.html`.
- The published catalog must show **24** costumes and the Inspiration page must say **The Metropolitan Museum of Art**, not Art Institute of Chicago. Otherwise, you are still seeing the older version. Try `Ctrl+Shift+R` and check the deployment commit.
- Submit **both** the live website link and the repository link.
- Do one complete presentation rehearsal with all three presenters.
