'use strict';
(() => {
  // A small, curated inventory. Every item uses a real file in /images.
  const PRODUCTS = [
    {id:1,name:'The Crimson Countess',category:'medieval',label:'Royal',price:12000,detail:'An entrance made for grand halls and dramatic stories.',includes:'Crimson gown · flowing sleeves',image:'images/item-1.jpg'},
    {id:2,name:'Moonlit Knight',category:'medieval',label:'Medieval',price:14000,detail:'Armor, winter light, and the promise of an epic adventure.',includes:'Knight-inspired ensemble · cloak',image:'images/item-2.jpg'},
    {id:3,name:'Golden Court',category:'medieval',label:'Royal',price:16000,detail:'The warmth of candlelight captured in gold.',includes:'Gold gown · matching fan',image:'images/item-3.jpg'},
    {id:4,name:'The Night Count',category:'gothic',label:'Gothic',price:13500,detail:'An aristocratic shadow from the streets of the old city.',includes:'Tailored suit · burgundy waistcoat · cape',image:'images/item-4.jpg'},
    {id:5,name:'The Haunted Bride',category:'halloween',label:'Halloween',price:13000,detail:'A dark bridal story with ghostly, theatrical details.',includes:'White bridal costume · veil',image:'images/item-5.jpg'},
    {id:6,name:'Velvet Vampire',category:'gothic',label:'Gothic',price:11500,detail:'Soft burgundy velvet, gothic romance, and a little danger.',includes:'Burgundy velvet gown · bell sleeves',image:'images/item-6.jpg'},
    {id:7,name:'The Blue Yule',category:'winter',label:'Winter',price:10000,detail:'An unconventional Santa-inspired costume in deep winter blue.',includes:'Festive blue suit · hat',image:'images/item-7.jpg'},
    {id:8,name:'Snow Queen',category:'winter',label:'Winter',price:15000,detail:'An ice-blue silhouette made for a wintry fairytale.',includes:'Ice-blue dress · cape',image:'images/item-8.jpg'},
    {id:9,name:'Forest Elf',category:'winter',label:'Fantasy',price:9500,detail:'A delicate woodland look with a touch of magic.',includes:'Green fantasy dress · accessories',image:'images/item-9.jpg'},
    {id:10,name:'Burgundy Reverie',category:'gothic',label:'Gothic',price:11000,detail:'A rich velvet silhouette for a romantic evening after dark.',includes:'Burgundy evening gown',image:'images/item-10.jpg'},
    {id:11,name:'The Phantom',category:'halloween',label:'Halloween',price:12500,detail:'A mysterious presence, dressed entirely in shadow.',includes:'Black cloak · hat · gloves',image:'images/item-11.jpg'},
    {id:12,name:'The Gilded Mask',category:'accessories',label:'Accessory',price:6500,detail:'A minimal golden mask that transforms any outfit.',includes:'Metallic gold mask',image:'images/item-12.jpg'},
    {id:13,name:'The Sunburst Masque',category:'accessories',label:'Accessory',price:7200,detail:'Theater and Venetian glamour in one elaborate face piece.',includes:'Decorative sunburst mask',image:'images/about-main.jpg'},
    {id:14,name:'The Shadow Visitor',category:'halloween',label:'Halloween',price:10500,detail:'A dark, unsettling character from a midnight tale.',includes:'Nosferatu-inspired character styling',image:'images/cat-dracula.jpg'},
    {id:15,name:'The Armored Visor',category:'accessories',label:'Accessory',price:6900,detail:'A sculptural helmet for a knightly fantasy.',includes:'Decorative medieval-style helmet',image:'images/cat-medieval.jpg'},
    {id:16,name:'Venetian Reverie',category:'masquerade',label:'Masquerade',price:14900,detail:'Old-world carnival romance in embroidered, theatrical costume.',includes:'Venetian carnival-inspired ensemble',image:'images/catalog-bg.jpg'},
    {id:17,name:'Saffron Empress',category:'medieval',label:'Royal',price:14500,detail:'A golden-yellow gown that brings every room to life.',includes:'Yellow statement gown',image:'images/event-img-3.jpg'},
    {id:18,name:'Midnight Tiara',category:'accessories',label:'Accessory',price:3900,detail:'A sparkling finishing touch for a royal-inspired look.',includes:'Silver statement tiara',image:'images/rent-bg.jpg'},
    {id:19,name:'Golden Whisper',category:'accessories',label:'Accessory',price:2900,detail:'A subtle gold detail to complete a masquerade mood.',includes:'Gold accessory styling piece',image:'images/event-img-2.jpg'}
  ];
  const $ = (selector,root=document) => root.querySelector(selector);
  const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
  const get = (key,fallback) => {try {const value=JSON.parse(localStorage.getItem('mm_final_'+key));return value===null?fallback:value;}catch{return fallback;}};
  const put = (key,value) => {try {localStorage.setItem('mm_final_'+key,JSON.stringify(value));return true;}catch{return false;}};
  const escapeHTML = value => String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const money = price => '₸ '+Number(price).toLocaleString('en-US');
  const currentUser = () => {const email=get('session',null);const users=get('users',[]);return Array.isArray(users)?users.find(user=>user.email===email)||null:null;};
  const favoriteIds = () => {const ids=get('favorites',[]);return Array.isArray(ids)?ids.map(Number).filter(id=>PRODUCTS.some(item=>item.id===id)):[];};
  let toastTimer;
  function toast(message) {const node=$('#toast');if(!node)return;node.textContent=message;node.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('visible'),3000);}
  function updateHeader(){
    const favoriteCount=$('#favorite-count');if(favoriteCount)favoriteCount.textContent=String(favoriteIds().length);
    const account=$('#account-link'),mobile=$('#mobile-account-link');const target=currentUser()?'profile.html':'login.html';if(account){account.href=target;account.textContent=currentUser()?'My profile ↗':'Account ↗';account.setAttribute('aria-label',currentUser()?'Your profile':'Log in');}if(mobile){mobile.href=target;mobile.textContent=currentUser()?'My profile':'Account / Log in';}
  }
  function initializeTheme(){
    const theme=get('theme','dark');document.documentElement.dataset.theme=theme==='light'?'light':'dark';
    const button=$('#theme-toggle');
    function update(){const isLight=document.documentElement.dataset.theme==='light';button.textContent=isLight?'☾':'☼';button.title=isLight?'Switch to dark mode':'Switch to light mode';button.setAttribute('aria-label',button.title);button.setAttribute('aria-pressed',String(isLight));}
    if(button){update();button.addEventListener('click',()=>{const value=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=value;put('theme',value);update();});}
  }
  function initializeNavigation(){
    const button=$('#menu-toggle'),menu=$('#mobile-menu');
    if(button&&menu){button.addEventListener('click',()=>{const next=menu.hidden;menu.hidden=!next;button.setAttribute('aria-expanded',String(next));button.textContent=next?'×':'☰';});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){menu.hidden=true;button.setAttribute('aria-expanded','false');button.textContent='☰';button.focus();}});$$('a',menu).forEach(link=>link.addEventListener('click',()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');button.textContent='☰';}));}
    const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
  }
  function cardMarkup(product){
    const saved=favoriteIds().includes(product.id);
    return '<article class="product-card" data-id="'+product.id+'"><div class="product-photo"><button class="photo-open" type="button" data-action="details" data-id="'+product.id+'" aria-label="Explore '+escapeHTML(product.name)+'"><img src="'+product.image+'" alt="'+escapeHTML(product.name)+'" width="460" height="575" loading="lazy"></button><span class="product-tag">'+escapeHTML(product.label)+'</span><button class="fav-btn" type="button" data-action="favorite" data-id="'+product.id+'" aria-label="'+(saved?'Remove':'Save')+' '+escapeHTML(product.name)+'" aria-pressed="'+saved+'">'+(saved?'♥':'♡')+'</button></div><div class="product-meta"><h3>'+escapeHTML(product.name)+'</h3><p>'+escapeHTML(product.includes)+'</p><div class="product-bottom"><strong>'+money(product.price)+' / 3 days</strong><button type="button" data-action="details" data-id="'+product.id+'">Explore look ↗</button></div></div></article>';
  }
  function renderFeatured(){const container=$('#featured-grid');if(container)container.innerHTML=[1,4,8,16].map(id=>cardMarkup(PRODUCTS.find(item=>item.id===id))).join('');}
  function renderCatalog(){
    const container=$('#product-grid');if(!container)return;
    const search=($('#search-costumes')?.value||'').trim().toLocaleLowerCase();
    const category=$('#filter-category')?.value||'all';
    const sort=$('#sort-costumes')?.value||'curated';
    const onlySaved=$('#saved-only')?.checked||false;
    const favorites=favoriteIds();
    const filtered=PRODUCTS.filter(product=>(category==='all'||product.category===category)&&(!onlySaved||favorites.includes(product.id))&&(product.name+' '+product.includes+' '+product.label+' '+product.detail+' '+product.category).toLocaleLowerCase().includes(search));
    if(sort==='price-up')filtered.sort((a,b)=>a.price-b.price);
    if(sort==='price-down')filtered.sort((a,b)=>b.price-a.price);
    if(sort==='name')filtered.sort((a,b)=>a.name.localeCompare(b.name));
    container.innerHTML=filtered.length?filtered.map(cardMarkup).join(''):'<div class="empty-state"><p class="eyebrow">NOTHING IN THE WARDROBE</p><h3>No looks found.</h3><p>Try a different search or reset your filters.</p><button class="btn outline" type="button" id="empty-reset">Show all looks</button></div>';
    const count=$('#result-count');if(count)count.textContent='Showing '+filtered.length+' of '+PRODUCTS.length+' looks';
    const emptyReset=$('#empty-reset');if(emptyReset)emptyReset.addEventListener('click',resetCatalog);
  }
  function resetCatalog(){if($('#search-costumes'))$('#search-costumes').value='';if($('#filter-category'))$('#filter-category').value='all';if($('#sort-costumes'))$('#sort-costumes').value='curated';if($('#saved-only'))$('#saved-only').checked=false;put('filters',{search:'',category:'all',sort:'curated',saved:false});if(location.search)history.replaceState(null,'',location.pathname);renderCatalog();}
  function initCatalog(){
    if(!$('#product-grid'))return;
    const params=new URLSearchParams(location.search),stored=get('filters',{});
    $('#search-costumes').value=params.get('q')||stored.search||'';
    $('#filter-category').value=params.get('category')||stored.category||'all';
    if(!$$('option',$('#filter-category')).some(opt=>opt.value===$('#filter-category').value))$('#filter-category').value='all';
    $('#sort-costumes').value=stored.sort||'curated';$('#saved-only').checked=params.has('saved')?params.get('saved')==='1':Boolean(stored.saved);
    const onFilter=()=>{put('filters',{search:$('#search-costumes').value,category:$('#filter-category').value,sort:$('#sort-costumes').value,saved:$('#saved-only').checked});if(location.search)history.replaceState(null,'',location.pathname);syncPills();renderCatalog();};
    function syncPills(){$('[data-category-pill]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.categoryPill===$('#filter-category').value)));}
    $('[data-category-pill]').forEach(button=>button.addEventListener('click',()=>{$('#filter-category').value=button.dataset.categoryPill;onFilter();}));
    ['input','change'].forEach(type=>$('#search-costumes').addEventListener(type,onFilter));
    ['#filter-category','#sort-costumes','#saved-only'].forEach(id=>$(id).addEventListener('change',onFilter));
    $('#reset-filters').addEventListener('click',()=>{resetCatalog();syncPills();});syncPills();renderCatalog();
  }
  function updateCards(){if($('#product-grid'))renderCatalog();if($('#featured-grid'))renderFeatured();if($('#profile-favorites'))renderProfile();}
  function toggleFavorite(id){
    if(!PRODUCTS.some(p=>p.id===id))return;
    const favorites=favoriteIds(),next=favorites.includes(id)?favorites.filter(value=>value!==id):[...favorites,id];
    put('favorites',next);updateHeader();updateCards();
    toast(next.includes(id)?'Look added to your saved collection.':'Look removed from your saved collection.');
  }
  function showDetails(id){
    const product=PRODUCTS.find(p=>p.id===id),modal=$('#look-dialog');if(!product||!modal)return;
    const saved=favoriteIds().includes(id);
    const related=PRODUCTS.filter(p=>p.category===product.category&&p.id!==id).slice(0,2);
    const suggestions=related.length?'<div class="modal-related"><span class="eyebrow">YOU MIGHT ALSO LOVE</span>'+related.map(p=>'<button type="button" data-action="details" data-id="'+p.id+'">'+escapeHTML(p.name)+' ↗</button>').join('')+'</div>':'';
    $('#dialog-content').innerHTML='<img src="'+product.image+'" alt="'+escapeHTML(product.name)+'"><div class="modal-copy"><p class="eyebrow">'+escapeHTML(product.label)+' · THE ATELIER</p><h2>'+escapeHTML(product.name)+'</h2><p>'+escapeHTML(product.detail)+'</p><p class="muted">Look details: '+escapeHTML(product.includes)+'</p><p class="modal-price">'+money(product.price)+' <small style="font-size:12px">/ 3 days</small></p><p class="form-note">Illustrative rental pricing · No payment is collected</p><div class="cta-row"><a class="btn" href="rent.html?look='+id+'">Plan this look ↗</a><button class="btn outline" type="button" data-action="favorite" data-id="'+id+'">'+(saved?'♥ Saved':'♡ Save look')+'</button></div>'+suggestions+'</div>';
    const visited=get('visited',[]);put('visited',[id,...(Array.isArray(visited)?visited:[]).filter(value=>value!==id)].slice(0,6));
    renderRecent();
    if(typeof modal.showModal==='function'){if(!modal.open)modal.showModal();}else modal.setAttribute('open','');
  }
  function renderRecent(){
    const section=$('#recently-viewed'),grid=$('#recent-grid');if(!section||!grid)return;
    const ids=get('visited',[]);const entries=(Array.isArray(ids)?ids:[]).map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean).slice(0,4);
    section.hidden=!entries.length;if(entries.length)grid.innerHTML=entries.map(cardMarkup).join('');
  }
  function initProducts(){
    document.addEventListener('click',event=>{
      const button=event.target.closest('[data-action]');if(!button)return;
      const id=Number(button.dataset.id),action=button.dataset.action;
      if(action==='favorite'){toggleFavorite(id);if($('#look-dialog')?.open){showDetails(id);}else{const replacement=document.querySelector('.product-card[data-id="'+id+'"] .fav-btn');replacement?.focus();}}
      if(action==='details')showDetails(id);
    });
    const dialog=$('#look-dialog');if(dialog){$('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});}
    renderFeatured();initCatalog();renderRecent();
  }
  const validEmail=value=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
  const validPhone=value=>{const digits=String(value).replace(/\D/g,'');return digits.length>=10&&digits.length<=15&&/^\+?[\d\s()\-]+$/.test(value);};
  const validPassword=value=>String(value).length>=8&&/[A-Z]/.test(value)&&/[a-z]/.test(value)&&/\d/.test(value)&&/[^\w\s]/.test(value);
  function formValue(form,name){return (form.elements.namedItem(name)?.value||'').trim();}
  function setError(form,name,error){
    const errorBox=form.querySelector('[data-error-for="'+name+'"]'),field=form.elements.namedItem(name);
    if(errorBox)errorBox.textContent=error||'';
    if(field&&field.setAttribute)field.setAttribute('aria-invalid',error?'true':'false');
  }
  function clearErrors(form){$$('[data-error-for]',form).forEach(el=>el.textContent='');$$('[aria-invalid]',form).forEach(el=>el.removeAttribute('aria-invalid'));const status=$('.form-status',form);if(status)status.textContent='';}
  function validate(form,rules){
    let firstInvalid=null;
    for(const [name,test,message] of rules){
      const value=formValue(form,name),correct=test(value);
      setError(form,name,correct?'':message);
      if(!correct&&!firstInvalid)firstInvalid=form.elements.namedItem(name);
    }
    if(firstInvalid)firstInvalid.focus();
    return !firstInvalid;
  }
  function status(form,message){const node=$('.form-status',form);if(node){node.textContent=message;node.hidden=false;node.setAttribute('role','status');}}
  function setupSignup(){
    const form=$('#signup-form');if(!form)return;
    const password=form.elements.namedItem('password');password.addEventListener('input',()=>{
      const value=password.value,score=[value.length>=8,/[A-Z]/.test(value)&&/[a-z]/.test(value),/\d/.test(value),/[^\w\s]/.test(value)].filter(Boolean).length;
      const meter=$('#password-meter-fill');if(meter){meter.style.width=(score*25)+'%';meter.style.background=score===4?'#7c9c78':score>2?'#c7a77a':'#b75a63';}
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();clearErrors(form);
      const rules=[['name',v=>v.length>=2,'Enter your name (at least 2 characters).'],['email',validEmail,'Enter a valid email address.'],['phone',validPhone,'Use 10–15 digits, optionally with + and spaces.'],['password',validPassword,'Use 8+ characters, uppercase, lowercase, number and symbol.'],['confirm',v=>v===form.elements.namedItem('password').value,'Passwords must match.']];
      if(!validate(form,rules))return;
      const users=get('users',[]);if(!Array.isArray(users)){status(form,'Local data could not be read. Try another browser.');return;}
      const email=formValue(form,'email').toLowerCase();if(users.some(u=>u.email===email)){setError(form,'email','An account already exists with this email.');form.elements.namedItem('email').focus();return;}
      if(!globalThis.crypto?.subtle){status(form,'Secure sign-up requires HTTPS or localhost. Please open the hosted site.');return;}
      const button=$('button[type=submit]',form);button.disabled=true;button.textContent='Creating account…';
      try{
        const salt=crypto.randomUUID(),hash=await hashPassword(form.elements.namedItem('password').value,salt);
        const user={name:formValue(form,'name'),email,phone:formValue(form,'phone'),salt,passwordHash:hash,createdAt:new Date().toISOString()};
        if(!put('users',[...users,user])||!put('session',email))throw Error('Storage is blocked');
        location.href='profile.html';
      }catch{status(form,'Could not save this account on your device. Check storage permissions.');button.disabled=false;button.textContent='Create my account →';}
    });
  }
  async function hashPassword(password,salt){
    const raw=new TextEncoder().encode(salt+':'+password);
    const digest=await crypto.subtle.digest('SHA-256',raw);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }
  function setupLogin(){
    const form=$('#login-form');if(!form)return;
    form.addEventListener('submit',async event=>{
      event.preventDefault();clearErrors(form);
      if(!validate(form,[['email',validEmail,'Enter a valid email address.'],['password',validPassword,'Enter a password with 8+ characters, uppercase, lowercase, number and symbol.']]))return;
      const email=formValue(form,'email').toLowerCase();
      const user=(get('users',[])||[]).find(u=>u.email===email);
      if(!user){setError(form,'email','No local account matches this email.');return;}
      try{
        const hash=await hashPassword(form.elements.namedItem('password').value,user.salt);
        if(hash!==user.passwordHash){setError(form,'password','Incorrect password. Please try again.');return;}
        if(!put('session',email))throw Error('Storage is blocked');
        location.href='profile.html';
      }catch{status(form,'Unable to sign in. Please open the HTTPS hosted site and enable local storage.');}
    });
  }
  function initRental(){
    const form=$('#rental-form');if(!form)return;
    const select=form.elements.namedItem('look');
    select.innerHTML='<option value="">Choose a costume</option>'+PRODUCTS.map(p=>'<option value="'+p.id+'">'+escapeHTML(p.name)+' · '+money(p.price)+'</option>').join('');
    const param=new URLSearchParams(location.search).get('look');if(PRODUCTS.some(p=>String(p.id)===param))select.value=param;
    const user=currentUser();if(user){form.elements.namedItem('name').value=user.name;form.elements.namedItem('email').value=user.email;form.elements.namedItem('phone').value=user.phone;}
    form.addEventListener('submit',event=>{
      event.preventDefault();clearErrors(form);
      const rules=[['look',v=>PRODUCTS.some(p=>String(p.id)===v),'Select a costume.'],['name',v=>v.length>=2,'Enter your name.'],['email',validEmail,'Enter a valid email address.'],['phone',validPhone,'Use 10–15 digits, optionally with + and spaces.'],['date',v=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false;const date=new Date(v+'T12:00:00');const today=new Date();today.setHours(0,0,0,0);const parts=v.split('-').map(Number);return Number.isFinite(date.getTime())&&date.getFullYear()===parts[0]&&date.getMonth()+1===parts[1]&&date.getDate()===parts[2]&&date>=today;},'Choose today or a future date.']];
      if(!validate(form,rules))return;
      const requests=get('requests',[]);if(!Array.isArray(requests)){status(form,'Local storage is unavailable.');return;}
      const entry={id:crypto.randomUUID?.()||String(Date.now()),look:Number(formValue(form,'look')),name:formValue(form,'name'),email:formValue(form,'email').toLowerCase(),phone:formValue(form,'phone'),date:formValue(form,'date'),note:formValue(form,'note'),createdAt:new Date().toISOString()};
      if(!put('requests',[entry,...requests])){status(form,'Could not save the request on this device.');return;}
      status(form,'Your rental request was saved on this device as a preview. No reservation was submitted to a real business.');
      form.reset();if(user){form.elements.namedItem('name').value=user.name;form.elements.namedItem('email').value=user.email;form.elements.namedItem('phone').value=user.phone;}
      toast('Rental request saved locally.');
    });
  }
  function initContact(){
    const form=$('#contact-form');if(!form)return;
    const user=currentUser();if(user){form.elements.namedItem('name').value=user.name;form.elements.namedItem('email').value=user.email;form.elements.namedItem('phone').value=user.phone;}
    form.addEventListener('submit',event=>{
      event.preventDefault();clearErrors(form);
      if(!validate(form,[['name',v=>v.length>=2,'Enter your name.'],['email',validEmail,'Enter a valid email address.'],['phone',validPhone,'Use 10–15 digits, optionally with + and spaces.'],['message',v=>v.length>=15,'Write at least 15 characters.']]))return;
      const messages=get('messages',[]);if(!Array.isArray(messages)||!put('messages',[{name:formValue(form,'name'),email:formValue(form,'email'),phone:formValue(form,'phone'),topic:formValue(form,'topic'),message:formValue(form,'message'),createdAt:new Date().toISOString()},...messages])){status(form,'Could not save your message locally.');return;}
      status(form,'Message saved locally for this site demo. It was not emailed or sent to a business.');
      form.reset();toast('Message saved on this device.');
    });
  }
  function renderProfile(){
    const panel=$('#profile-content');if(!panel)return;
    const user=currentUser();
    if(!user){panel.innerHTML='<div class="subtle-box center narrow"><p class="eyebrow">YOUR WARDROBE</p><h2>Your story starts here.</h2><p>Log in to see your locally saved profile and rental requests.</p><div class="cta-row" style="justify-content:center"><a class="btn" href="login.html">Log in</a><a class="btn outline" href="signup.html">Create account</a></div></div>';return;}
    const saved=favoriteIds().map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
    const requests=(get('requests',[])||[]).filter(req=>req.email===user.email);
    panel.innerHTML='<div class="profile-grid"><aside class="profile-panel"><p class="eyebrow">THE INNER CIRCLE</p><h2>Hello, '+escapeHTML(user.name.split(' ')[0])+'.</h2><p>Your private little corner of the atelier.</p><dl><dt>Full name</dt><dd>'+escapeHTML(user.name)+'</dd><dt>Email</dt><dd>'+escapeHTML(user.email)+'</dd><dt>Phone</dt><dd>'+escapeHTML(user.phone)+'</dd></dl><div class="cta-row"><button type="button" class="btn outline" id="logout-button">Log out ↗</button></div><p class="form-note">Demo account: data is stored only in this browser. Never reuse an important password here.</p></aside><div><section class="profile-panel"><p class="eyebrow">YOUR EDIT</p><h2>Saved looks <span style="font-size:22px">'+saved.length+'</span></h2><div class="profile-list" id="profile-favorites">'+(saved.length?saved.map(p=>'<div class="profile-row"><div><strong>'+escapeHTML(p.name)+'</strong><small>'+escapeHTML(p.label)+' · '+money(p.price)+'</small></div><button type="button" data-action="favorite" data-id="'+p.id+'">Remove</button></div>').join(''):'<p>No saved looks yet. <a class="text-link" href="catalog.html">Explore the collection</a></p>')+'</div></section><section class="profile-panel"><p class="eyebrow">RENTAL PREVIEWS</p><h2>Your requests <span style="font-size:22px">'+requests.length+'</span></h2><div class="profile-list">'+(requests.length?requests.map(req=>{const p=PRODUCTS.find(item=>item.id===req.look);return '<div class="profile-row"><div><strong>'+escapeHTML(p?.name||'Costume')+'</strong><small>'+escapeHTML(req.date)+' · Local demo request, not submitted</small></div><button type="button" data-request-remove="'+escapeHTML(req.id)+'">Delete</button></div>';}).join(''):'<p>You have no rental previews yet. <a class="text-link" href="rent.html">Create a request</a></p>')+'</div></section></div></div>';
    $('#logout-button')?.addEventListener('click',()=>{put('session',null);location.href='index.html';});
    $$('[data-request-remove]',panel).forEach(btn=>btn.addEventListener('click',()=>{const remaining=(get('requests',[])||[]).filter(req=>req.id!==btn.dataset.requestRemove);put('requests',remaining);renderProfile();toast('Request deleted from this browser.');}));
  }
  async function loadArchive(){
    const grid=$('#archive-grid'),loading=$('#archive-loading'),error=$('#archive-error'),retry=$('#archive-retry');if(!grid)return;
    grid.innerHTML='';loading.hidden=false;error.hidden=true;retry.hidden=true;
    try{
      const response=await fetch('https://api.artic.edu/api/v1/artworks/search?q=mask&limit=100&fields=id,title,image_id,is_public_domain,artist_display,date_display');
      if(!response.ok)throw new Error('The museum could not be reached.');
      const json=await response.json(),items=(Array.isArray(json.data)?json.data:[]).filter(item=>item.is_public_domain&&item.image_id&&/^[a-z0-9-]+$/i.test(item.image_id)).slice(0,6);
      if(!items.length)throw new Error('No artworks could be loaded today.');
      const base=/^https:\/\/www\.artic\.edu\/iiif\/2$/.test(json.config?.iiif_url||'')?json.config.iiif_url:'https://www.artic.edu/iiif/2';
      grid.innerHTML=items.map(item=>'<a class="archive-card" target="_blank" rel="noopener noreferrer" href="https://www.artic.edu/artworks/'+Number(item.id)+'"><img src="'+escapeHTML(base+'/'+item.image_id+'/full/600,/0/default.jpg')+'" loading="lazy" alt="'+escapeHTML(item.title)+'"><div><p class="eyebrow">ART INSTITUTE OF CHICAGO</p><h3>'+escapeHTML(item.title)+'</h3><p>'+escapeHTML(item.date_display||item.artist_display||'Historic inspiration')+'</p></div></a>').join('');
    }catch(e){error.textContent='The live museum archive is unavailable right now. You can still explore our costume collection.';error.hidden=false;retry.hidden=false;}
    finally{loading.hidden=true;}
  }
  function initArchive(){if(!$('#archive-grid'))return;$('#archive-retry')?.addEventListener('click',loadArchive);loadArchive();}

  function initAlterEgo() {
    const root=$('#quiz-stage');if(!root)return;
    const questions=[
      {title:'Where does your story begin?',prompt:'Choose the world you would disappear into.',choices:[['A candlelit royal ballroom','medieval'],['A castle after midnight','gothic'],['An enchanted winter garden','winter'],['A secret masked celebration','masquerade']]},
      {title:'Pick your signature detail.',prompt:'The little thing that makes the character yours.',choices:[['A golden crown','medieval'],['A dramatic velvet cape','gothic'],['A shimmer of silver','winter'],['An ornate, mysterious mask','masquerade']]},
      {title:'What should they remember?',prompt:'Every unforgettable night leaves an impression.',choices:[['The grand entrance','medieval'],['The beautiful mystery','gothic'],['The impossible magic','winter'],['The delicious secret','masquerade']]}
    ];
    const titles={medieval:'The Royal Dreamer',gothic:'The Midnight Romantic',winter:'The Winter Enchanter',masquerade:'The Beautiful Enigma'};
    const descriptions={
      medieval:'An old-soul heroine with a flair for grand entrances and golden details.',
      gothic:'You belong to candlelight, velvet and the stories whispered after midnight.',
      winter:'There is a certain kind of magic in your quiet, otherworldly presence.',
      masquerade:'No one quite knows the whole story. That is your greatest charm.'
    };
    let step=0,answers=[];
    const label=$('#quiz-step'),title=$('#quiz-title'),prompt=$('#quiz-prompt'),options=$('#quiz-options'),bar=$('#quiz-progress-fill'),back=$('#quiz-back'),visual=$('#quiz-visual-img'),caption=$('#quiz-visual-caption'),restart=$('#quiz-restart');
    function showQuestion(){
      const q=questions[step];label.textContent='0'+(step+1)+' / 03';
      title.textContent=q.title;prompt.textContent=q.prompt;
      options.hidden=false;
      options.innerHTML=q.choices.map((c,i)=>'<button type="button" class="quiz-option" data-choice="'+i+'"><span>0'+(i+1)+'</span>'+escapeHTML(c[0])+'<b aria-hidden="true">↗</b></button>').join('');
      bar.style.width=(step/3*100)+'%';back.hidden=step===0;restart.hidden=true;
      visual.src='images/cat-'+(['medieval','dracula','winter'][step]||'medieval')+'.jpg';
      visual.alt='Atmospheric costume collection';caption.textContent='THE ART OF BECOMING';
    }
    function showResult(){
      const totals={medieval:0,gothic:0,winter:0,masquerade:0};
      answers.forEach(value=>{totals[value]++;});
      const category=answers.slice().reverse().reduce((winner,value)=>totals[value]>totals[winner]?value:winner,answers[answers.length-1]);
      const found=PRODUCTS.filter(p=>p.category===category);
      const pick=found[(new Date().getDate()+answers.length)%found.length];
      put('quizResult',{productId:pick.id,category,date:new Date().toISOString()});
      label.textContent='YOUR ALTER EGO / REVEALED';title.textContent=titles[category];
      prompt.textContent=descriptions[category];
      options.innerHTML='<div class="quiz-answer"><span class="eyebrow">YOUR SIGNATURE LOOK</span><h4>'+escapeHTML(pick.name)+'</h4><p>'+escapeHTML(pick.detail)+'</p><div class="cta-row"><button type="button" class="btn" data-action="details" data-id="'+pick.id+'">Explore your look ↗</button><button type="button" class="btn outline" data-action="favorite" data-id="'+pick.id+'">♡ Save this look</button></div></div>';
      bar.style.width='100%';visual.src=pick.image;visual.alt=pick.name+' costume';caption.textContent='YOUR STORY STARTS HERE';
      back.hidden=true;restart.hidden=false;
    }
    options.addEventListener('click',event=>{
      const choice=event.target.closest('[data-choice]');if(!choice)return;
      const index=Number(choice.dataset.choice);answers[step]=questions[step].choices[index][1];
      step++;
      if(step===questions.length)showResult();else showQuestion();
    });
    back.addEventListener('click',()=>{if(step>0){step--;answers=answers.slice(0,step);showQuestion();}});
    restart.addEventListener('click',()=>{step=0;answers=[];showQuestion();});
    showQuestion();
  }
  function initDailyMuse(){
    const node=$('#daily-muse');if(!node)return;
    const day=Math.floor((Date.now()-new Date().getTimezoneOffset()*60000)/86400000);
    const pick=PRODUCTS[day%PRODUCTS.length];
    const label=$('#daily-muse-date');if(label)label.textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
    const picture=$('#daily-muse-image');picture.src=pick.image;picture.alt=pick.name+' — today’s featured costume';
    $('#daily-muse-name').textContent=pick.name;
    $('#daily-muse-copy').textContent=pick.detail;
    const link=$('#daily-muse-link');link.href='rent.html?look='+pick.id;
    $('#daily-muse-explore').dataset.id=String(pick.id);
  }

  window.addEventListener('storage',event=>{if(event.key?.startsWith('mm_final_')){updateHeader();updateCards();}});
  document.addEventListener('DOMContentLoaded',()=>{
    initializeTheme();initializeNavigation();updateHeader();initProducts();initAlterEgo();initDailyMuse();setupSignup();setupLogin();initRental();initContact();renderProfile();initArchive();
  });
})();
