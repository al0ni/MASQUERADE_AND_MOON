import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,channel:process.env.TEST_BROWSER_CHANNEL||undefined});
const page=await browser.newPage();
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
let checks=0;
try {
 for(let id=1;id<=24;id++) {
  await page.goto(`${base}/product.html?id=${id}`,{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('[data-product-review-form]').count(),1);
  assert.equal(await page.locator('[data-product-review-form]').getAttribute('novalidate'),'');
  assert.equal(await page.locator('.product-detail-copy h1').count(),1);
  checks+=3;
 }
 await page.goto(`${base}/product.html?id=8`,{waitUntil:'domcontentloaded'});
 const favorite=page.locator('.product-detail-copy [data-action="favorite"]');
 await favorite.click(); assert.match(await favorite.textContent(),/Saved/);
 await favorite.click(); assert.match(await favorite.textContent(),/Save look/);checks+=2;
 const form=page.locator('[data-product-review-form]');
 await form.locator('[name=name]').fill('Review tester');
 await form.locator('button[type=submit]').click();assert.match(await form.locator('.item-review-error').textContent(),/rating/);
 await form.locator('[name=rating][value="5"]').check();
 await form.locator('[name=comment]').fill('short');
 await form.locator('button[type=submit]').click();assert.match(await form.locator('.item-review-error').textContent(),/15 and 500/);
 await form.locator('[name=comment]').fill('<script>alert("test")</script> A lovely costume for the event.');
 await form.locator('button[type=submit]').click();
 assert.equal(await page.locator('.item-review-copy script').count(),0);
 await page.goto(`${base}/product.html?id=3`,{waitUntil:'domcontentloaded'});
 assert(!(await page.locator('#product-review-list').textContent()).includes('Review tester'));checks+=4;
 await page.goto(`${base}/product.html?id=999`,{waitUntil:'domcontentloaded'});assert.match(await page.locator('main').textContent(),/Look not found/);checks++;
 await page.setViewportSize({width:375,height:812});
 await page.locator('#menu-toggle').click();assert.equal(await page.locator('#mobile-menu').isVisible(),true);
 await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-menu').isVisible(),false);checks+=2;
 console.log(`Product checks passed: ${checks} assertions across all 24 costumes.`);
} finally {await browser.close();}
