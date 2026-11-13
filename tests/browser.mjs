import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base=process.env.TEST_BASE_URL||'http://127.0.0.1:8000';
const pages=['index.html','catalog.html','rent.html','events.html','about.html','contact.html','signup.html','login.html','profile.html'];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let checks=0;
const verify=(value,message)=>{assert(value,message);checks++;};
const context=await browser.newContext({viewport:{width:1440,height:900}});
const page=await context.newPage();
page.on('pageerror',error=>{throw new Error('Browser JavaScript error: '+error.message);});
async function visit(route){const response=await page.goto(base+'/'+route,{waitUntil:'domcontentloaded'});verify(response?.status()===200,'HTTP error on '+route);}
try{
  await visit('index.html');
  verify(await page.locator('#featured-grid .product-card').count()===4,'Featured looks not rendered');
  verify(await page.locator('#quiz-options .quiz-option').count()===4,'Quiz not rendered');
  verify((await page.locator('#daily-muse-name').textContent()).trim()!=='An unexpected character','Daily muse not updated');
  for(let i=0;i<3;i++)await page.locator('#quiz-options [data-choice="0"]').click();
  verify((await page.locator('#quiz-title').textContent()).includes('The Royal Dreamer'),'Quiz result incorrect');
  await page.locator('#quiz-options [data-action="details"]').click();
  verify(await page.locator('#look-dialog').evaluate(el=>el.open),'Look dialog failed');
  await page.locator('#dialog-content [data-action="favorite"]').click();
  verify(await page.locator('#look-dialog').evaluate(el=>el.open),'Saving a look closed or broke the dialog');
  await page.locator('#close-dialog').click();
  verify((await page.locator('#favorite-count').textContent())==='1','Favorite count did not update');
  await page.locator('#theme-toggle').click();
  verify(await page.locator('html').getAttribute('data-theme')==='light','Light mode failed');

  await visit('catalog.html?saved=1');
  verify(await page.locator('#saved-only').isChecked(),'Saved-only link ignored');
  verify(await page.locator('#product-grid .product-card').count()===1,'Saved-only filter incorrect');
  verify(await page.locator('html').getAttribute('data-theme')==='light','Theme did not persist');
  await page.locator('#reset-filters').click();
  verify(await page.locator('#product-grid .product-card').count()===12,'Catalog missing looks');
  await page.locator('#search-costumes').fill('Crimson');
  verify(await page.locator('#product-grid .product-card').count()===2,'Search did not filter');
  await page.locator('#search-costumes').fill('Not A Costume');
  verify((await page.locator('.empty-state').textContent()).includes('No looks found'),'Empty state absent');
  await page.locator('#reset-filters').click();
  await page.locator('#filter-category').selectOption('gothic');
  verify(await page.locator('#product-grid .product-card').count()===3,'Category filter wrong');
  await page.locator('#sort-costumes').selectOption('price-up');
  const prices=await page.locator('#product-grid .product-bottom strong').allTextContents();
  verify(prices[0].includes('11,500'),'Price sorting wrong');
  await page.locator('#reset-filters').click();

  await visit('signup.html');
  await page.locator('#signup-form button[type=submit]').click();
  verify(await page.locator('[data-error-for=name]').isVisible(),'Empty signup error missing');
  const email='atelier.'+Date.now()+'@example.com';
  await page.locator('#signup-form [name=name]').fill('Test Member');
  await page.locator('#signup-form [name=email]').fill(email);
  await page.locator('#signup-form [name=phone]').fill('+7 700 123 4567');
  await page.locator('#signup-form [name=password]').fill('GoodPassword9!');
  await page.locator('#signup-form [name=confirm]').fill('GoodPassword9!');
  await page.locator('#signup-form button[type=submit]').click();
  await page.waitForURL(/profile\.html$/);
  verify((await page.locator('#profile-content').textContent()).includes('Test Member'),'Signed-up profile not shown');
  const savedUser=await page.evaluate(()=>localStorage.getItem('mm_final_users'));
  verify(savedUser&&!savedUser.includes('GoodPassword9!'),'Password was stored in plaintext');
  verify((await page.locator('#profile-content').textContent()).includes('The Crimson Countess')||(await page.locator('#profile-content').textContent()).includes('Moonlit Knight')||(await page.locator('#profile-content').textContent()).includes('Golden Court'),'Favorite missing in profile');
  await page.locator('#logout-button').click();
  await page.waitForURL(/index\.html$/);

  await visit('login.html');
  await page.locator('#login-form [name=email]').fill(email);
  await page.locator('#login-form [name=password]').fill('WrongPassword9!');
  await page.locator('#login-form button[type=submit]').click();
  verify((await page.locator('[data-error-for=password]').textContent()).includes('Incorrect'),'Bad login error missing');
  await page.locator('#login-form [name=password]').fill('GoodPassword9!');
  await page.locator('#login-form button[type=submit]').click();
  await page.waitForURL(/profile\.html$/);
  verify((await page.locator('#profile-content').textContent()).includes(email),'Successful login did not redirect');

  await visit('rent.html');
  await page.locator('#rental-form button[type=submit]').click();
  verify(await page.locator('#rental-form [data-error-for=look]').isVisible(),'Rental validation missing');
  const date=new Date(Date.now()+7*86400000).toISOString().slice(0,10);
  await page.locator('#rental-form [name=look]').selectOption('1');
  await page.locator('#rental-form [name=date]').fill(date);
  await page.locator('#rental-form button[type=submit]').click();
  verify((await page.locator('#rental-form .form-status').textContent()).includes('saved on this device'),'Rental preview not saved');
  await visit('profile.html');
  verify((await page.locator('#profile-content').textContent()).includes('Local demo request'),'Rental request missing from profile');

  await visit('contact.html');
  await page.locator('#contact-form button[type=submit]').click();
  verify(await page.locator('#contact-form [data-error-for=message]').isVisible(),'Contact validation missing');
  await page.locator('#contact-form [name=name]').fill('Test Member');
  await page.locator('#contact-form [name=email]').fill(email);
  await page.locator('#contact-form [name=phone]').fill('+7 700 123 4567');
  await page.locator('#contact-form [name=message]').fill('Could you tell me more about this collection?');
  await page.locator('#contact-form button[type=submit]').click();
  verify((await page.locator('#contact-form .form-status').textContent()).includes('saved locally'),'Contact message not saved');

  await page.route('https://api.artic.edu/**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({config:{iiif_url:'https://www.artic.edu/iiif/2'},data:Array.from({length:6},(_,i)=>({id:2000+i,title:'The Mask '+i,image_id:'31e4cc5a-44d5-46b5-921b-7bd3bff9259f',is_public_domain:true,date_display:'1900'}))})}));
  await visit('events.html');
  await page.locator('#archive-grid .archive-card').first().waitFor();
  verify(await page.locator('#archive-grid .archive-card').count()===6,'API artworks not rendered');
  await page.unrouteAll();
  await page.route('https://api.artic.edu/**',route=>route.fulfill({status:503,body:'API unavailable'}));
  await visit('events.html');
  await page.locator('#archive-retry').waitFor({state:'visible'});
  verify((await page.locator('#archive-error').textContent()).includes('unavailable'),'API fallback missing');

  for(const width of [375,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    for(const file of pages){
      await visit(file);
      const dims=await page.evaluate(()=>({w:document.documentElement.scrollWidth,v:innerWidth}));
      verify(dims.w<=dims.v+2,'Horizontal overflow at '+width+'px on '+file+' ('+dims.w+' > '+dims.v+')');
    }
  }
  console.log('Browser acceptance checks passed:',checks,'assertions.');
}catch(error){
  console.error('Browser acceptance failure:',error);
  await page.screenshot({path:'failure.png',fullPage:true}).catch(()=>{});
  process.exitCode=1;
}finally{await browser.close();}
