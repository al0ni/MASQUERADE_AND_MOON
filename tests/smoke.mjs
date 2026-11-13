import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const pages=['index.html','catalog.html','rent.html','events.html','about.html','contact.html','signup.html','login.html','profile.html'];
let checks=0;
for(const page of pages){
  const html=fs.readFileSync(page,'utf8');
  assert.match(html,/<main id="main">/,'Missing landmark in '+page);
  assert.match(html,/name="viewport"/,'Missing viewport in '+page);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  const unique=new Set(ids);
  assert.equal(ids.length,unique.size,'Duplicate id in '+page);
  const urls=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match=>match[1]);
  for(const value of urls){
    if(value.startsWith('#')||value.startsWith('http:')||value.startsWith('https:')||value.startsWith('mailto:')||value.startsWith('tel:')||value.startsWith('data:'))continue;
    const url=value.split('#')[0].split('?')[0];
    if(!url)continue;
    assert(fs.existsSync(path.join(process.cwd(),url)),'Broken relative asset or link: '+page+' -> '+value);
    checks++;
  }
  for(const tag of [...html.matchAll(/<form\b[^>]*>/g)].map(match=>match[0])){
    assert.match(tag,/\bnovalidate\b/,'Form missing novalidate in '+page);
    assert.doesNotMatch(tag,/\b(?:required|pattern|minlength|maxlength|min|max)\s*=/,'Native validation attributes in '+page);
  }
}

const js=fs.readFileSync('js/script.js','utf8');
const productImagePaths=[...js.matchAll(/image:'(images\/[^']+)'/g)].map(match=>match[1]);
assert.equal(productImagePaths.length,19,'Expected 19 curated pieces');
assert.equal(new Set(productImagePaths).size,productImagePaths.length,'Duplicate product imagery');
for(const filename of productImagePaths){
  assert(fs.existsSync(filename),'Missing catalog photo '+filename);
  checks++;
}
const imageBytes=fs.readdirSync('images').filter(name=>name.endsWith('.jpg')).reduce((sum,name)=>sum+fs.statSync('images/'+name).size,0);
assert(imageBytes<10*1024*1024,'Image payload exceeds 10 MB: optimization required');

execFileSync(process.execPath,['--check','js/script.js'],{stdio:'inherit'});
assert(fs.readFileSync('js/script.js','utf8').includes('fetch('),'No external API call');
assert(fs.readFileSync('js/script.js','utf8').includes('localStorage'),'No persistence');
console.log('Static smoke tests passed:',pages.length,'pages and',checks,'local links/assets verified.');
