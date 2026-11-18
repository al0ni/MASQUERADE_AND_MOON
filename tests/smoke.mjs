import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const pages = ['index.html', 'catalog.html', 'rent.html', 'events.html', 'about.html', 'contact.html', 'signup.html', 'login.html', 'profile.html'];
const code = fs.readFileSync('js/script.js', 'utf8');
const stylesheet = fs.readFileSync('css/style.css', 'utf8');
let links = 0;
let pictures = 0;

for (const filename of pages) {
  const content = fs.readFileSync(filename, 'utf8');
  assert.match(content, /<main\b[^>]*id="main"/, filename + ': missing main landmark');
  assert.match(content, /name="viewport"/, filename + ': missing viewport');
  assert.match(content, /href="css\/style\.css"/, filename + ': missing stylesheet');
  assert.match(content, /src="js\/script\.js"/, filename + ': missing JavaScript');
  assert.match(content, /id="theme-toggle"/, filename + ': missing color theme switch');
  const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, filename + ': duplicate element ID');
  for (const m of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1].split('#')[0].split('?')[0];
    if (!url || /^(?:https?:|mailto:|tel:|data:|\/\/)/.test(url)) continue;
    assert(fs.existsSync(path.join(process.cwd(), url)), filename + ': missing local asset ' + url);
    links++;
  }
  for (const m of content.matchAll(/<form\b[^>]*>/g)) {
    assert.match(m[0], /\bnovalidate\b/, filename + ': form needs novalidate');
    assert.doesNotMatch(m[0], /\b(?:required|pattern|minlength|maxlength|min|max)=/, filename + ': HTML validation attribute on form');
  }
  assert.doesNotMatch(content, /<\s*!--[\s\S]*?--\s*>/, filename + ': code comments not allowed');
}
const ids = [...code.matchAll(/\bid:\s*(\d+),\s*\n\s*name:/g)].map(m => Number(m[1]));
assert.equal(ids.length, 24, 'Expected exactly 24 costumes');
assert.equal(new Set(ids).size, 24, 'Duplicate product IDs');
const images = [...code.matchAll(/\bimage:\s*['"](images\/[^'"\s]+)['"]/g)].map(m => m[1]);
assert.equal(images.length, 24, 'Every costume needs a photograph');
assert.equal(new Set(images).size, 24, 'Each costume should have a unique main photo');
for (const image of images) {
  assert(fs.existsSync(image), 'Missing costume photograph: ' + image);
  pictures++;
}
assert(!code.includes('SEED_REVIEWS'), 'Remove hardcoded testimonials');
assert(!code.includes('initAlterEgo'), 'Remove unused costume personality quiz');
assert(!code.includes('initDailyMuse'), 'Remove unused daily random selection');
assert(!code.includes('initLightbox'), 'Remove unused lightbox');
assert(stylesheet.includes('display: grid') && stylesheet.includes('display: flex'), 'Responsive layout must use Grid and Flexbox');
assert(stylesheet.includes('@media'), 'Responsive breakpoints missing');
assert(code.includes('localStorage'), 'Browser storage not used');
assert(code.includes('async function loadArchive'), 'Museum API integration missing');
assert(code.includes('fetch('), 'API fetch missing');
for (const filename of ['js/script.js', 'css/style.css']) {
  const src = fs.readFileSync(filename, 'utf8');
  assert.doesNotMatch(src, /\/\*[\s\S]*?\*\/|(?:^|\n)\s*\/\/[^\n]*/, 'Remove source comments in ' + filename);
}
const artworks = JSON.parse(fs.readFileSync('data/museum-catalog.json', 'utf8'));
assert.equal(artworks.length, 6, 'Museum gallery should contain six verified artworks');
assert.equal(new Set(artworks.map(item => item.id)).size, 6, 'Museum artwork IDs must be unique');
for (const item of artworks) {
  assert(fs.existsSync(item.image), 'Missing artwork-specific photograph: ' + item.image);
  assert(item.url.includes(String(item.id)), 'Museum artwork link does not match the photograph ID');
  pictures++;
}
execFileSync(process.execPath, ['--check', 'js/script.js'], {stdio: 'inherit'});
console.log(`Static checks passed: ${pages.length} pages, ${links} local references, 24 costume photographs and 6 matching museum artworks.`);
