import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8000';
const pages = [
  'index.html',
  'catalog.html',
  'rent.html',
  'events.html',
  'about.html',
  'contact.html',
  'signup.html',
  'login.html',
  'profile.html',
  'product.html?id=1'
];
const widths = [320, 360, 375, 390, 768, 820, 1024, 1280, 1440, 1920];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce'
});
const page = await context.newPage();
const failures = [];
let tested = 0;

try {
  await page.route('https://collectionapi.metmuseum.org/**', (route) =>
    route.fulfill({ status: 503, body: 'Temporarily unavailable' })
  );
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of pages) {
      const response = await page.goto(base + '/' + name, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200, name + ' failed to load');
      const result = await page.evaluate(async () => {
        for (const img of document.images)
          if (!img.currentSrc.includes('collectionapi.metmuseum.org')) img.loading = 'eager';
        await Promise.all(
          [...document.images]
            .filter((img) => !img.currentSrc.includes('collectionapi.metmuseum.org'))
            .map((img) => img.decode().catch(() => {}))
        );
        const broken = [...document.images]
          .filter((img) => !img.currentSrc.includes('collectionapi.metmuseum.org') && (!img.naturalWidth || !img.complete))
          .map((img) => img.currentSrc);
        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: innerWidth,
          broken
        };
      });
      if (result.documentWidth > result.viewportWidth + 2)
        failures.push(
          name +
            ' overflows at ' +
            width +
            'px by ' +
            (result.documentWidth - result.viewportWidth) +
            'px'
        );
      if (result.broken.length)
        failures.push(name + ' broken images at ' + width + 'px: ' + result.broken.join(', '));
      tested++;
    }
  }

  for (const theme of ['dark', 'light']) {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const name of pages) {
      await page.goto(base + '/' + name, { waitUntil: 'domcontentloaded' });
      await page.evaluate((value) => {
        localStorage.setItem('mm_final_theme', JSON.stringify(value));
        document.documentElement.dataset.theme = value;
      }, theme);
      await page.waitForTimeout(100);
      if (name === 'events.html') await page.locator('#archive-error').waitFor({ state: 'visible' });
      const report = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      for (const violation of report.violations) {
        failures.push(
          name +
            ' ' +
            theme +
            ' accessibility: ' +
            violation.id +
            ' ' +
            violation.nodes
              .map((n) => n.target.join(' '))
              .slice(0, 4)
              .join(', ')
        );
      }
      tested++;
    }
  }

  await page.goto(base + '/signup.html', { waitUntil: 'domcontentloaded' });
  assert.equal(
    await page.locator('.password-toggle').count(),
    2,
    'Signup password visibility controls missing'
  );
  await page.locator('#signup-form [name=password]').fill('VisiblePassword9!');
  await page.locator('.password-toggle').first().click();
  assert.equal(await page.locator('#signup-form [name=password]').getAttribute('type'), 'text');
  await page.locator('.password-toggle').first().click();
  assert.equal(await page.locator('#signup-form [name=password]').getAttribute('type'), 'password');
  tested++;

  await page.goto(base + '/login.html', { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('.password-toggle').count(), 1, 'Login visibility control missing');
  tested++;

  if (failures.length) {
    console.error(failures.join('\n'));
    throw new Error(failures.length + ' quality audit findings');
  }
  console.log('Quality audit passed:', tested, 'page/viewport/accessibility/interaction checks.');
} finally {
  await browser.close();
}
