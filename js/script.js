'use strict';

(() => {
  
  const PRODUCTS = [
    {
      id: 1,
      name: 'The Storybook Princess',
      category: 'medieval',
      label: 'Fairytale',
      price: 15500,
      detail: 'A velvet-and-gold fairytale gown with puffed sleeves and a storybook white collar.',
      includes: 'Royal-blue velvet bodice \u00b7 puffed sleeves \u00b7 golden satin skirt',
      image: 'images/look-storybook-princess.jpg'
    },
    {
      id: 2,
      name: 'The Midnight Ballgown',
      category: 'medieval',
      label: 'Fairytale',
      price: 17500,
      detail:
        'A shimmering ice-blue ballgown with a lace-embroidered bodice, made for midnight at the palace.',
      includes: 'Shimmer organza ballgown \u00b7 puffed sleeves \u00b7 satin opera gloves',
      image: 'images/look-midnight-ballgown.jpg'
    },
    {
      id: 3,
      name: 'The Gilded Prince',
      category: 'medieval',
      label: 'Royal',
      price: 18500,
      detail: 'A golden court coat for an entrance that silences the orchestra.',
      includes:
        'Gold brocade coat \u00b7 waistcoat \u00b7 velvet cape \u00b7 lace jabot \u00b7 gilded mask',
      image: 'images/look-gilded-prince.jpg'
    },
    {
      id: 4,
      name: 'The Amber Empress',
      category: 'medieval',
      label: 'Royal',
      price: 16500,
      detail: 'A burnt-gold velvet gown with lace overlays and a jewelled crown mask.',
      includes: 'Amber velvet gown \u00b7 gold lace sleeves \u00b7 crown mask',
      image: 'images/look-amber-empress.jpg'
    },
    {
      id: 5,
      name: 'The Black Rose Widow',
      category: 'gothic',
      label: 'Dark romance',
      price: 14500,
      detail: 'Mourning lace, black velvet and a crown of roses: grief dressed as couture.',
      includes: 'Black lace gown \u00b7 tulle veil \u00b7 black rose crown \u00b7 lace gloves',
      image: 'images/look-black-rose-widow.jpg'
    },
    {
      id: 6,
      name: 'The Lady Reaper',
      category: 'gothic',
      label: 'Dark romance',
      price: 15900,
      detail: 'A hooded gown of lace and velvet, with an hourglass at the waist and time on her side.',
      includes: 'Hooded black gown \u00b7 hourglass chain \u00b7 skeletal gloves \u00b7 scythe',
      image: 'images/look-lady-reaper.jpg'
    },
    {
      id: 7,
      name: 'The Bat Lord',
      category: 'gothic',
      label: 'Vampire',
      price: 17900,
      detail: 'A vampire aristocrat in oxblood brocade, bat-wing armour and ruby details.',
      includes:
        'Brocade waistcoat \u00b7 velvet cape \u00b7 bat mask \u00b7 bat-wing shoulders \u00b7 clawed gloves',
      image: 'images/look-bat-lord.jpg'
    },
    {
      id: 8,
      name: 'The Phantom',
      category: 'gothic',
      label: 'Dark romance',
      price: 12500,
      detail: 'A mysterious presence, dressed entirely in shadow.',
      includes: 'Black cape \u00b7 silver brocade waistcoat \u00b7 satin bow tie \u00b7 white half mask',
      image: 'images/look-phantom.jpg'
    },
    {
      id: 9,
      name: 'The Frost Empress',
      category: 'winter',
      label: 'Winter',
      price: 18500,
      detail: 'Snowflake lace, white fur and an ice-crystal crown for the ruler of endless winter.',
      includes: 'Silver lace gown \u00b7 fur-trimmed cape \u00b7 ice crown \u00b7 beaded collar',
      image: 'images/look-frost-empress.jpg'
    },
    {
      id: 10,
      name: 'The Winter Prince',
      category: 'winter',
      label: 'Winter',
      price: 15500,
      detail: 'Sapphire velvet and soft white fur for a prince of the first snow.',
      includes: 'Hooded velvet cape \u00b7 brocade waistcoat \u00b7 lace jabot \u00b7 velvet gloves',
      image: 'images/look-winter-prince.jpg'
    },
    {
      id: 11,
      name: 'The Yuletide Elf',
      category: 'winter',
      label: 'Festive',
      price: 11500,
      detail: 'Holly embroidery, a jingling cloak and a very long hat: Christmas, but make it theatre.',
      includes: 'Green velvet coat \u00b7 red cape \u00b7 elf hat \u00b7 bell boots',
      image: 'images/look-yuletide-elf.jpg'
    },
    {
      id: 12,
      name: 'The Royal Reindeer',
      category: 'winter',
      label: 'Festive',
      price: 13900,
      detail: 'A woodland reindeer in a fur-trimmed royal cape, with bells and a scarlet scarf.',
      includes: 'Reindeer suit with antlers \u00b7 velvet cape \u00b7 scarf \u00b7 bell collar',
      image: 'images/look-royal-reindeer.jpg'
    },
    {
      id: 13,
      name: 'The Forest Sovereign',
      category: 'fantasy',
      label: 'Fantasy',
      price: 17000,
      detail:
        'A velvet hooded cloak, oak-leaf shoulders and a golden laurel crown for the queen of the woods.',
      includes:
        'Hooded cloak \u00b7 leaf-embroidered corset \u00b7 leaf skirt \u00b7 laurel crown \u00b7 gloves',
      image: 'images/look-forest-sovereign.jpg'
    },
    {
      id: 14,
      name: 'The Glade Fairy',
      category: 'fantasy',
      label: 'Fantasy',
      price: 16000,
      detail: 'Iridescent wings and pastel tulle, as if the dress had grown from flowers.',
      includes:
        'Fairy wings \u00b7 velvet corset gown \u00b7 sheer sleeves and gloves \u00b7 pearl necklace',
      image: 'images/look-glade-fairy.jpg'
    },
    {
      id: 15,
      name: 'The Astral Sage',
      category: 'fantasy',
      label: 'Fantasy',
      price: 16500,
      detail: 'A starfield robe, a runic belt and a beard worth a thousand years.',
      includes:
        'Galaxy velvet robe \u00b7 constellation cloak \u00b7 runic belt \u00b7 long beard \u00b7 gloves',
      image: 'images/look-astral-sage.jpg'
    },
    {
      id: 16,
      name: 'The Moonlit Sentinel',
      category: 'fantasy',
      label: 'Fantasy',
      price: 18000,
      detail: 'Silver moon armour and a starry navy cape for the knight who guards the night.',
      includes:
        'Moon-crest armour \u00b7 constellation cape \u00b7 crescent belt \u00b7 silver mask \u00b7 gloves',
      image: 'images/look-moonlit-sentinel.jpg'
    },
    {
      id: 17,
      name: 'The Ashen Bride',
      category: 'halloween',
      label: 'Halloween',
      price: 13000,
      detail: 'A ghostly bride in dusty lace, thorned roses and a veil of ash.',
      includes: 'Distressed lace gown \u00b7 long veil \u00b7 dark rose crown \u00b7 lace mask',
      image: 'images/look-ashen-bride.jpg'
    },
    {
      id: 18,
      name: 'The Hollow Wraith',
      category: 'halloween',
      label: 'Halloween',
      price: 14000,
      detail: 'A hooded spectre in torn velvet and chains, hiding behind a horned mask.',
      includes:
        'Hooded velvet cloak \u00b7 horned mask \u00b7 tattered layers \u00b7 clawed gloves \u00b7 chain belt',
      image: 'images/look-hollow-wraith.jpg'
    },
    {
      id: 19,
      name: 'The Red Balloon Clown',
      category: 'halloween',
      label: 'Halloween',
      price: 12000,
      detail: 'A grey carnival clown with red pompoms, one red balloon and a very bad feeling.',
      includes:
        'Grey satin clown suit \u00b7 ruffled collar \u00b7 red pompoms \u00b7 balloon \u00b7 lace-up boots',
      image: 'images/look-red-balloon-clown.jpg'
    },
    {
      id: 20,
      name: 'The Velvet Harlequin',
      category: 'halloween',
      label: 'Halloween',
      price: 14500,
      detail: 'A diamond-patterned court jester in burgundy velvet behind a grinning porcelain mask.',
      includes:
        'Jester hat with tassels \u00b7 porcelain mask \u00b7 harlequin tunic \u00b7 velvet cape \u00b7 jingle shoes',
      image: 'images/look-velvet-harlequin.jpg'
    },
    {
      id: 21,
      name: 'The Venetian Duchess',
      category: 'masquerade',
      label: 'Masquerade',
      price: 19500,
      detail:
        'Velvet, brocade and gold lace beneath a starlit veil: the Carnival of Venice, reimagined.',
      includes:
        'Velvet ballgown \u00b7 brocade skirt \u00b7 feathered mask \u00b7 crown \u00b7 starlit veil \u00b7 lace gloves',
      image: 'images/look-venetian-duchess.jpg'
    },
    {
      id: 22,
      name: 'The Crimson Masquerade',
      category: 'masquerade',
      label: 'Masquerade',
      price: 15500,
      detail: 'Burgundy velvet, black lace and gold embroidery for the last dance of the night.',
      includes: 'Velvet gown \u00b7 black lace overskirt \u00b7 lace sleeves \u00b7 crimson mask',
      image: 'images/look-crimson-masquerade.jpg'
    },
    {
      id: 23,
      name: 'The Midnight Butterfly',
      category: 'masquerade',
      label: 'Masquerade',
      price: 16900,
      detail: 'Sapphire velvet and a silver butterfly mask that looks ready to take flight.',
      includes:
        'Sapphire velvet gown \u00b7 black lace layers \u00b7 butterfly mask \u00b7 feather \u00b7 lace gloves',
      image: 'images/look-midnight-butterfly.jpg'
    },
    {
      id: 24,
      name: "The Doge's Shadow",
      category: 'masquerade',
      label: 'Masquerade',
      price: 17500,
      detail:
        'A Venetian nobleman behind a gilded long-nose mask, in burgundy brocade and a tricorn hat.',
      includes:
        'Tricorn hat \u00b7 long-nose mask \u00b7 brocade coat \u00b7 breeches \u00b7 velvet cape \u00b7 lace jabot',
      image: 'images/look-doges-shadow.jpg'
    }
  ];

  const SHOWCASE_REVIEWS = [
    {
      id: 'example-alua',
      topic: '1',
      name: 'Alua',
      image: 'images/reviews/alua-storybook.webp',
      comment: 'Great service, excellent quality, and the costume looks exactly like the photos! Absolutely loved it!',
      demo: true
    },
    {
      id: 'example-molya',
      topic: '2',
      name: 'Molya',
      image: 'images/reviews/molya-ballgown.webp',
      comment: 'The pale blue gown and long gloves create a classic ball look. The delicate fabric looks especially lovely in photos.',
      demo: true
    },
    {
      id: 'example-shaslyk',
      topic: '8',
      name: 'shaslyk',
      image: 'images/reviews/shaslyk-phantom.webp',
      comment: 'The dark cape, silver waistcoat and white half-mask make a striking costume for a themed photoshoot.',
      demo: true
    }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const get = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem('mm_final_' + key));
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  };

  const put = (key, value) => {
    try {
      localStorage.setItem('mm_final_' + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const escapeHTML = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
    );
  const money = (price) => '₸ ' + Number(price).toLocaleString('en-US');

  const getUsers = () => {
    const users = get('users', []);
    return Array.isArray(users) ? users.filter((user) => user && typeof user.email === 'string' && typeof user.salt === 'string' && typeof user.passwordHash === 'string') : [];
  };

  const currentUser = () => {
    const email = get('session', null);
    return getUsers().find((user) => user.email === email) || null;
  };
  const favoriteIds = () => {
    const ids = get('favorites', []);
    return Array.isArray(ids)
      ? ids.map(Number).filter((id) => PRODUCTS.some((item) => item.id === id))
      : [];
  };
  let toastTimer;
  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    node.textContent = message;
    node.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('visible'), 3000);
  }

  function updateHeader() {
    const account = $('#account-link'),
      mobile = $('#mobile-account-link');
    const target = currentUser() ? 'profile.html' : 'login.html';
    if (account) {
      account.href = target;
      account.textContent = currentUser() ? 'My profile ↗' : 'Account ↗';
      account.setAttribute('aria-label', currentUser() ? 'Your profile' : 'Log in');
    }
    if (mobile) {
      mobile.href = target;
      mobile.textContent = currentUser() ? 'My profile' : 'Account / Log in';
    }
  }

  function initializeTheme() {
    const theme = get('theme', 'dark');
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
    const button = $('#theme-toggle');
    function update() {
      const isLight = document.documentElement.dataset.theme === 'light';
      button.textContent = isLight ? '☾' : '☼';
      button.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
      button.setAttribute('aria-label', button.title);
      button.setAttribute('aria-pressed', String(isLight));
    }
    if (button) {
      update();
      button.addEventListener('click', () => {
        const value = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = value;
        put('theme', value);
        update();
      });
    }
  }
  function initializeNavigation() {
    const button = $('#menu-toggle'),
      menu = $('#mobile-menu');
    if (button && menu) {
      button.addEventListener('click', () => {
        const next = menu.hidden;
        menu.hidden = !next;
        button.setAttribute('aria-expanded', String(next));
        button.textContent = next ? '×' : '☰';
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !menu.hidden) {
          menu.hidden = true;
          button.setAttribute('aria-expanded', 'false');
          button.textContent = '☰';
          button.focus();
        }
      });
      $$('a', menu).forEach((link) =>
        link.addEventListener('click', () => {
          menu.hidden = true;
          button.setAttribute('aria-expanded', 'false');
          button.textContent = '☰';
        })
      );
    }
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function cardMarkup(product) {
    const saved = favoriteIds().includes(product.id);
    const photoReview = showcaseReview(product.id);
    const teaser = photoReview
      ? '<a class="review-card-teaser" href="product.html?id=' + product.id +
        '#product-reviews"><img src="' + photoReview.image + '" alt="Photo shared by ' +
        escapeHTML(photoReview.name) + '" loading="lazy"><span><strong>' +
        escapeHTML(photoReview.name) +
        '</strong><small>View photo &amp; reviews ↗</small></span></a>'
      : '<a class="review-card-link" href="product.html?id=' + product.id +
        '#product-reviews">See &amp; write reviews ↗</a>';
    return (
      '<article class="product-card" data-id="' +
      product.id +
      '"><div class="product-photo"><button class="photo-open" type="button" data-action="details" data-id="' +
      product.id +
      '" aria-label="Explore ' +
      escapeHTML(product.name) +
      '"><img src="' +
      product.image +
      '" alt="' +
      escapeHTML(product.name) +
      '" width="600" height="800" loading="lazy"></button><span class="product-tag">' +
      escapeHTML(product.label) +
      '</span><button class="fav-btn" type="button" data-action="favorite" data-id="' +
      product.id +
      '" aria-label="' +
      (saved ? 'Remove' : 'Save') +
      ' ' +
      escapeHTML(product.name) +
      '" aria-pressed="' +
      saved +
      '">' +
      (saved ? '♥' : '♡') +
      '</button></div><div class="product-meta"><h3>' +
      escapeHTML(product.name) +
      '</h3><p>' +
      escapeHTML(product.includes) +
      '</p><div class="product-bottom"><strong>' +
      money(product.price) +
      ' / 3 days</strong><button type="button" data-action="details" data-id="' +
      product.id +
      '">Explore look ↗</button></div>' + teaser + '</div></article>'
    );
  }
  function renderFeatured() {
    const container = $('#featured-grid');
    if (container)
      container.innerHTML = [1, 6, 10, 24]
        .map((id) => cardMarkup(PRODUCTS.find((item) => item.id === id)))
        .join('');
  }
  
  function renderCatalog() {
    const container = $('#product-grid');
    if (!container) return;
    const search = ($('#search-costumes')?.value || '').trim().toLocaleLowerCase();
    const category = $('#filter-category')?.value || 'all';
    const sort = $('#sort-costumes')?.value || 'curated';
    const onlySaved = $('#saved-only')?.checked || false;
    const favorites = favoriteIds();
    const filtered = PRODUCTS.filter(
      (product) =>
        (category === 'all' || product.category === category) &&
        (!onlySaved || favorites.includes(product.id)) &&
        (
          product.name +
          ' ' +
          product.includes +
          ' ' +
          product.label +
          ' ' +
          product.detail +
          ' ' +
          product.category
        )
          .toLocaleLowerCase()
          .includes(search)
    );
    if (sort === 'price-up') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-down') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    container.innerHTML = filtered.length
      ? filtered.map(cardMarkup).join('')
      : '<div class="empty-state"><p class="eyebrow">NOTHING IN THE WARDROBE</p><h3>No looks found.</h3><p>Try a different search or reset your filters.</p><button class="btn outline" type="button" id="empty-reset">Show all looks</button></div>';
    const count = $('#result-count');
    if (count) count.textContent = 'Showing ' + filtered.length + ' of ' + PRODUCTS.length + ' looks';
    const emptyReset = $('#empty-reset');
    if (emptyReset) emptyReset.addEventListener('click', resetCatalog);
  }
  function resetCatalog() {
    if ($('#search-costumes')) $('#search-costumes').value = '';
    if ($('#filter-category')) $('#filter-category').value = 'all';
    if ($('#sort-costumes')) $('#sort-costumes').value = 'curated';
    if ($('#saved-only')) $('#saved-only').checked = false;
    put('filters', { search: '', category: 'all', sort: 'curated', saved: false });
    if (location.search) history.replaceState(null, '', location.pathname);
    renderCatalog();
  }
  
  function initCatalog() {
    if (!$('#product-grid')) return;
    const params = new URLSearchParams(location.search),
      stored = get('filters', {});
    $('#search-costumes').value = params.get('q') || stored.search || '';
    $('#filter-category').value = params.get('category') || stored.category || 'all';
    if (!$$('option', $('#filter-category')).some((opt) => opt.value === $('#filter-category').value))
      $('#filter-category').value = 'all';
    $('#sort-costumes').value = stored.sort || 'curated';
    $('#saved-only').checked = params.has('saved') ? params.get('saved') === '1' : Boolean(stored.saved);
    const onFilter = () => {
      put('filters', {
        search: $('#search-costumes').value,
        category: $('#filter-category').value,
        sort: $('#sort-costumes').value,
        saved: $('#saved-only').checked
      });
      if (location.search) history.replaceState(null, '', location.pathname);
      syncPills();
      renderCatalog();
    };
    function syncPills() {
      document
        .querySelectorAll('[data-category-pill]')
        .forEach((button) =>
          button.setAttribute(
            'aria-pressed',
            String(button.dataset.categoryPill === $('#filter-category').value)
          )
        );
    }
    document.querySelectorAll('[data-category-pill]').forEach((button) =>
      button.addEventListener('click', () => {
        $('#filter-category').value = button.dataset.categoryPill;
        onFilter();
      })
    );
    ['input', 'change'].forEach((type) => $('#search-costumes').addEventListener(type, onFilter));
    ['#filter-category', '#sort-costumes', '#saved-only'].forEach((id) =>
      $(id).addEventListener('change', onFilter)
    );
    $('#reset-filters').addEventListener('click', () => {
      resetCatalog();
      syncPills();
    });
    syncPills();
    renderCatalog();
  }

  function renderProductCounts() {
    $$('[data-product-count]').forEach((node) => (node.textContent = String(PRODUCTS.length)));
  }
  function updateCards() {
    if ($('#product-grid')) renderCatalog();
    if ($('#featured-grid')) renderFeatured();
    if ($('#profile-favorites')) renderProfile();
  }

  function toggleFavorite(id) {
    if (!PRODUCTS.some((p) => p.id === id)) return;
    const favorites = favoriteIds(),
      next = favorites.includes(id) ? favorites.filter((value) => value !== id) : [...favorites, id];
    put('favorites', next);
    updateHeader();
    updateCards();
    toast(
      next.includes(id)
        ? 'Look added to your saved collection.'
        : 'Look removed from your saved collection.'
    );
  }

  function showDetails(id) {
    const product = PRODUCTS.find((p) => p.id === id),
      modal = $('#look-dialog');
    if (!product || !modal) return;
    const saved = favoriteIds().includes(id);
    const noteMarkup = productReviewMarkup(id, true);
    const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== id).slice(0, 2);
    const suggestions = related.length
      ? '<div class="modal-related"><span class="eyebrow">YOU MIGHT ALSO LOVE</span>' +
        related
          .map(
            (p) =>
              '<button type="button" data-action="details" data-id="' +
              p.id +
              '">' +
              escapeHTML(p.name) +
              ' ↗</button>'
          )
          .join('') +
        '</div>'
      : '';
    $('#dialog-content').innerHTML =
      '<img src="' +
      product.image +
      '" alt="' +
      escapeHTML(product.name) +
      '"><div class="modal-copy"><p class="eyebrow">' +
      escapeHTML(product.label) +
      ' · THE ATELIER</p><h2>' +
      escapeHTML(product.name) +
      '</h2><p>' +
      escapeHTML(product.detail) +
      '</p><p class="muted">Look details: ' +
      escapeHTML(product.includes) +
      '</p><p class="modal-price">' +
      money(product.price) +
      ' <small style="font-size:12px">/ 3 days</small></p><p class="form-note">Illustrative rental pricing · No payment is collected</p><div class="cta-row"><a class="btn" href="rent.html?look=' +
      id +
      '">Plan this look ↗</a><button class="btn outline" type="button" data-action="favorite" data-id="' +
      id +
      '">' +
      (saved ? '♥ Saved' : '♡ Save look') +
      '</button></div>' +
      noteMarkup +
      '<a class="modal-full-review-link" href="product.html?id=' + id +
      '#product-reviews">See all photos &amp; leave a review ↗</a>' +
      suggestions +
      '</div>';
    const visited = get('visited', []);
    put(
      'visited',
      [id, ...(Array.isArray(visited) ? visited : []).filter((value) => value !== id)].slice(0, 6)
    );
    renderRecent();
    if (typeof modal.showModal === 'function') {
      if (!modal.open) modal.showModal();
    } else modal.setAttribute('open', '');
  }
  function renderRecent() {
    const section = $('#recently-viewed'),
      grid = $('#recent-grid');
    if (!section || !grid) return;
    const ids = get('visited', []);
    const entries = (Array.isArray(ids) ? ids : [])
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 4);
    section.hidden = !entries.length;
    if (entries.length) grid.innerHTML = entries.map(cardMarkup).join('');
  }
  function initProducts() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;
      const id = Number(button.dataset.id),
        action = button.dataset.action;
      if (action === 'favorite') {
        toggleFavorite(id);
        if ($('#look-dialog')?.open) {
          showDetails(id);
        } else {
          const replacement = document.querySelector('.product-card[data-id="' + id + '"] .fav-btn');
          replacement?.focus();
        }
      }
      if (action === 'details') showDetails(id);
    });
    const dialog = $('#look-dialog');
    if (dialog) {
      $('#close-dialog').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
    }
    renderFeatured();
    initCatalog();
    renderRecent();
  }
  
  const validEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim()) && String(value).trim().length <= 254;

  const validPhone = (value) => {
    const digits = String(value).replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15 && /^\+?[\d\s()\-]+$/.test(value);
  };

  const validPassword = (value) =>
    String(value).length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /\d/.test(value) &&
    /[^\w\s]/.test(value);
  function formValue(form, name) {
    return (form.elements.namedItem(name)?.value || '').trim();
  }
  function setError(form, name, error) {
    const errorBox = form.querySelector('[data-error-for="' + name + '"]'),
      field = form.elements.namedItem(name);
    if (errorBox) errorBox.textContent = error || '';
    if (field && field.setAttribute) field.setAttribute('aria-invalid', error ? 'true' : 'false');
  }
  function clearErrors(form) {
    $$('[data-error-for]', form).forEach((el) => (el.textContent = ''));
    $$('[aria-invalid]', form).forEach((el) => el.removeAttribute('aria-invalid'));
    const status = $('.form-status', form);
    if (status) status.textContent = '';
  }
  
  function validate(form, rules) {
    let firstInvalid = null;
    for (const [name, test, message] of rules) {
      const value = formValue(form, name),
        correct = test(value);
      setError(form, name, correct ? '' : message);
      if (!correct && !firstInvalid) firstInvalid = form.elements.namedItem(name);
    }
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }
  function status(form, message) {
    const node = $('.form-status', form);
    if (node) {
      node.textContent = message;
      node.hidden = false;
      node.setAttribute('role', 'status');
    }
  }
  function initPasswordVisibility() {
    document.querySelectorAll('input[type="password"]').forEach((input) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'password-input-wrap';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'password-toggle';
      button.textContent = 'Show';
      button.setAttribute('aria-label', 'Show password');
      button.setAttribute('aria-pressed', 'false');
      input.parentNode.insertBefore(wrapper, input);
      wrapper.append(input, button);
      button.addEventListener('click', () => {
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        button.textContent = showing ? 'Show' : 'Hide';
        button.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
        button.setAttribute('aria-pressed', String(!showing));
      });
    });
  }

  function setupSignup() {
    const form = $('#signup-form');
    if (!form) return;
    const password = form.elements.namedItem('password');
    password.addEventListener('input', () => {
      const value = password.value,
        score = [
          value.length >= 8,
          /[A-Z]/.test(value) && /[a-z]/.test(value),
          /\d/.test(value),
          /[^\w\s]/.test(value)
        ].filter(Boolean).length;
      const meter = $('#password-meter-fill');
      if (meter) {
        meter.style.width = score * 25 + '%';
        meter.style.background = score === 4 ? '#7c9c78' : score > 2 ? '#c7a77a' : '#b75a63';
      }
    });
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearErrors(form);
      const rules = [
        ['name', (v) => v.length >= 2 && v.length <= 80, 'Enter your name (2–80 characters).'],
        ['email', validEmail, 'Enter a valid email address.'],
        ['phone', validPhone, 'Use 10–15 digits, optionally with + and spaces.'],
        ['password', validPassword, 'Use 8+ characters, uppercase, lowercase, number and symbol.'],
        ['confirm', (v) => v === form.elements.namedItem('password').value, 'Passwords must match.']
      ];
      if (!validate(form, rules)) return;
      const users = getUsers();
      const email = formValue(form, 'email').toLowerCase();
      if (users.some((u) => u.email?.toLowerCase() === email)) {
        setError(form, 'email', 'An account already exists with this email.');
        form.elements.namedItem('email').focus();
        return;
      }
      if (!globalThis.crypto?.subtle) {
        status(form, 'Secure sign-up requires HTTPS or localhost. Please open the hosted site.');
        return;
      }
      const button = $('button[type=submit]', form);
      button.disabled = true;
      button.textContent = 'Creating account…';
      try {
        const salt = crypto.randomUUID(),
          hash = await hashPassword(form.elements.namedItem('password').value, salt);
        const user = {
          name: formValue(form, 'name'),
          email,
          phone: formValue(form, 'phone'),
          salt,
          passwordHash: hash,
          createdAt: new Date().toISOString()
        };
        if (!put('users', [...users, user]) || !put('session', email)) throw Error('Storage is blocked');
      } catch {
        status(form, 'Could not save this account on your device. Check storage permissions.');
        button.disabled = false;
        button.textContent = 'Create my account →';
        return;
      }
      location.href = 'profile.html';
    });
  }

  async function hashPassword(password, salt) {
    const raw = new TextEncoder().encode(salt + ':' + password);
    const digest = await crypto.subtle.digest('SHA-256', raw);
    return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function setupLogin() {
    const form = $('#login-form');
    if (!form) return;
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      clearErrors(form);
      if (
        !validate(form, [
          ['email', validEmail, 'Enter a valid email address.'],
          [
            'password',
            validPassword,
            'Enter a password with 8+ characters, uppercase, lowercase, number and symbol.'
          ]
        ])
      )
        return;
      const email = formValue(form, 'email').toLowerCase();
      const user = getUsers().find((u) => u.email?.toLowerCase() === email);
      if (!user) {
        setError(form, 'email', 'No local account matches this email.');
        return;
      }
      try {
        const hash = await hashPassword(form.elements.namedItem('password').value, user.salt);
        if (hash !== user.passwordHash) {
          setError(form, 'password', 'Incorrect password. Please try again.');
          return;
        }
        if (!put('session', email)) throw Error('Storage is blocked');
      } catch {
        status(form, 'Unable to sign in. Please open the HTTPS hosted site and enable local storage.');
        return;
      }
      location.href = 'profile.html';
    });
  }

  function initRental() {
    const form = $('#rental-form');
    if (!form) return;
    const select = form.elements.namedItem('look');
    select.innerHTML =
      '<option value="">Choose a costume</option>' +
      PRODUCTS.map(
        (p) =>
          '<option value="' + p.id + '">' + escapeHTML(p.name) + ' · ' + money(p.price) + '</option>'
      ).join('');
    const param = new URLSearchParams(location.search).get('look');
    if (PRODUCTS.some((p) => String(p.id) === param)) select.value = param;
    const user = currentUser();
    if (user) {
      form.elements.namedItem('name').value = user.name;
      form.elements.namedItem('email').value = user.email;
      form.elements.namedItem('phone').value = user.phone;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors(form);
      const rules = [
        ['look', (v) => PRODUCTS.some((p) => String(p.id) === v), 'Select a costume.'],
        ['name', (v) => v.length >= 2 && v.length <= 80, 'Enter your name (2–80 characters).'],
        ['email', validEmail, 'Enter a valid email address.'],
        ['phone', validPhone, 'Use 10–15 digits, optionally with + and spaces.'],
        [
          'date',
          (v) => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
            const date = new Date(v + 'T12:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const parts = v.split('-').map(Number);
            return (
              Number.isFinite(date.getTime()) &&
              date.getFullYear() === parts[0] &&
              date.getMonth() + 1 === parts[1] &&
              date.getDate() === parts[2] &&
              date >= today
            );
          },
          'Choose today or a future date.'
        ]
      ];
      if (!validate(form, rules)) return;
      const requests = get('requests', []);
      if (!Array.isArray(requests)) {
        status(form, 'Local storage is unavailable.');
        return;
      }
      const entry = {
        id: crypto.randomUUID?.() || String(Date.now()),
        look: Number(formValue(form, 'look')),
        name: formValue(form, 'name'),
        email: formValue(form, 'email').toLowerCase(),
        phone: formValue(form, 'phone'),
        date: formValue(form, 'date'),
        note: formValue(form, 'note'),
        createdAt: new Date().toISOString()
      };
      if (!put('requests', [entry, ...requests])) {
        status(form, 'Could not save the request on this device.');
        return;
      }
      status(
        form,
        'Your rental request was saved on this device as a preview. No reservation was submitted to a real business.'
      );
      form.reset();
      if (user) {
        form.elements.namedItem('name').value = user.name;
        form.elements.namedItem('email').value = user.email;
        form.elements.namedItem('phone').value = user.phone;
      }
      toast('Rental request saved locally.');
    });
  }
  function initContact() {
    const form = $('#contact-form');
    if (!form) return;
    const user = currentUser();
    if (user) {
      form.elements.namedItem('name').value = user.name;
      form.elements.namedItem('email').value = user.email;
      form.elements.namedItem('phone').value = user.phone;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      clearErrors(form);
      if (
        !validate(form, [
          ['name', (v) => v.length >= 2 && v.length <= 80, 'Enter your name (2–80 characters).'],
          ['email', validEmail, 'Enter a valid email address.'],
          ['phone', validPhone, 'Use 10–15 digits, optionally with + and spaces.'],
          ['message', (v) => v.length >= 15 && v.length <= 2000, 'Write between 15 and 2,000 characters.']
        ])
      )
        return;
      const messages = get('messages', []);
      if (
        !Array.isArray(messages) ||
        !put('messages', [
          {
            name: formValue(form, 'name'),
            email: formValue(form, 'email'),
            phone: formValue(form, 'phone'),
            topic: formValue(form, 'topic'),
            message: formValue(form, 'message'),
            createdAt: new Date().toISOString()
          },
          ...messages
        ])
      ) {
        status(form, 'Could not save your message locally.');
        return;
      }
      status(
        form,
        'Message saved locally for this site demo. It was not emailed or sent to a business.'
      );
      form.reset();
      toast('Message saved on this device.');
    });
  }

  function renderProfile() {
    const panel = $('#profile-content');
    if (!panel) return;
    const user = currentUser();
    if (!user) {
      panel.innerHTML =
        '<div class="profile-guest">' +
        '<div class="profile-guest-copy"><p class="eyebrow">YOUR ACCOUNT</p><h1>Your saved <em>looks.</em></h1>' +
        '<p class="body-copy">Create a local account to save favorite costumes and view your rental planning requests.</p>' +
        '<div class="cta-row"><a class="btn" href="signup.html">Create an account ↗</a><a class="btn outline" href="login.html">Log in</a></div>' +
        '<p class="form-note">Demo account details are stored only in this browser.</p></div>' +
        '<div class="profile-guest-photo"><img src="' +
        PRODUCTS[21].image +
        '" alt="A costume from the collection"></div></div>';
      return;
    }
    const saved = favoriteIds()
      .map((id) => PRODUCTS.find((item) => item.id === id))
      .filter(Boolean);
    const allRequests = get('requests', []);
    const requests = (Array.isArray(allRequests) ? allRequests : []).filter(
      (req) => req.email === user.email
    );
    const firstName = user.name.trim().split(' ')[0];
    const picture = saved[0]?.image || PRODUCTS[21].image;
    const savedMarkup = saved.length
      ? saved
          .map(
            (product) =>
              '<div class="profile-row"><img src="' +
              escapeHTML(product.image) +
              '" alt="' +
              escapeHTML(product.name) +
              '" loading="lazy">' +
              '<div class="profile-row-info"><strong>' +
              escapeHTML(product.name) +
              '</strong><small>' +
              escapeHTML(product.label) +
              ' · ' +
              money(product.price) +
              ' / 3 days</small>' +
              '<a href="rent.html?look=' +
              product.id +
              '">Plan this look ↗</a></div>' +
              '<button type="button" data-action="favorite" data-id="' +
              product.id +
              '" aria-label="Remove ' +
              escapeHTML(product.name) +
              ' from saved looks">Remove</button></div>'
          )
          .join('')
      : '<div class="profile-empty"><p>No saved looks yet. Browse the collection and select the heart on a costume card.</p>' +
        '<a class="btn outline" href="catalog.html">Explore the collection ↗</a></div>';
    const requestMarkup = requests.length
      ? requests
          .map((req) => {
            const product = PRODUCTS.find((item) => item.id === req.look);
            return (
              '<div class="profile-row"><img src="' +
              escapeHTML(product?.image || PRODUCTS[0].image) +
              '" alt="" loading="lazy">' +
              '<div class="profile-row-info"><strong>' +
              escapeHTML(product?.name || 'Costume') +
              '</strong>' +
              '<small>' +
              escapeHTML(req.date) +
              ' · Local demo request, not submitted</small></div>' +
              '<button type="button" data-request-remove="' +
              escapeHTML(req.id) +
              '">Delete</button></div>'
            );
          })
          .join('')
      : '<div class="profile-empty"><p>You have no rental previews saved yet.</p>' +
        '<a class="text-link" href="rent.html">Plan a look ↗</a></div>';
    panel.innerHTML =
      '<div class="profile-dashboard-head"><div class="profile-dashboard-intro">' +
      '<p class="eyebrow">MY ACCOUNT</p><h1>Welcome, <em>' +
      escapeHTML(firstName) +
      '.</em></h1>' +
      '<p>Your saved costumes and rental requests in one place.</p>' +
      '<div class="profile-shortcuts"><a href="#saved-section"><strong>' +
      saved.length +
      '</strong> saved looks ↓</a>' +
      '<a href="#requests-section"><strong>' +
      requests.length +
      '</strong> rental previews ↓</a></div></div>' +
      '<div class="profile-dashboard-art"><img src="' +
      escapeHTML(picture) +
      '" alt="A featured look from the wardrobe">' +
      '<span>THE COSTUME COLLECTION</span></div></div>' +
      '<div class="profile-sections"><section class="profile-panel profile-details">' +
      '<p class="eyebrow">YOUR DETAILS</p><h2>My account.</h2><dl>' +
      '<dt>Full name</dt><dd>' +
      escapeHTML(user.name) +
      '</dd>' +
      '<dt>Email</dt><dd>' +
      escapeHTML(user.email) +
      '</dd>' +
      '<dt>Phone number</dt><dd>' +
      escapeHTML(user.phone) +
      '</dd></dl>' +
      '<button type="button" class="profile-logout" id="logout-button">Log out ↗</button>' +
      '<p class="form-note">Account data is stored only in this browser.</p></section>' +
      '<section class="profile-panel" id="saved-section"><div class="profile-panel-head">' +
      '<div><p class="eyebrow">YOUR COLLECTION</p><h2>Saved looks.</h2></div>' +
      '<a class="text-link" href="catalog.html">Browse all ↗</a></div>' +
      '<div class="profile-list" id="profile-favorites">' +
      savedMarkup +
      '</div></section></div>' +
      '<section class="profile-panel profile-request-panel" id="requests-section">' +
      '<div class="profile-panel-head"><div><p class="eyebrow">UPCOMING STORIES</p><h2>Rental previews.</h2></div>' +
      '<a class="text-link" href="rent.html">Plan a look ↗</a></div>' +
      '<div class="profile-list">' +
      requestMarkup +
      '</div></section>';
    $('#logout-button')?.addEventListener('click', () => {
      put('session', null);
      location.href = 'index.html';
    });
    $$('[data-request-remove]', panel).forEach((button) =>
      button.addEventListener('click', () => {
        const remaining = (get('requests', []) || []).filter(
          (req) => req.id !== button.dataset.requestRemove
        );
        put('requests', remaining);
        renderProfile();
        toast('Request deleted from this browser.');
      })
    );
  }
  
  const museumCollection = [
    {
      "id": 159244,
      "title": "Dress",
      "date": "ca. 1855",
      "creator": "American",
      "image": "images/museum/met-159244.webp",
      "url": "https://www.metmuseum.org/art/collection/search/159244",
      "type": "DRESS"
    },
    {
      "id": 159482,
      "title": "Dress",
      "date": "1886–88",
      "creator": "American",
      "image": "images/museum/met-159482.webp",
      "url": "https://www.metmuseum.org/art/collection/search/159482",
      "type": "DRESS"
    },
    {
      "id": 65723,
      "title": "Costume",
      "date": "19th century",
      "creator": "Japan",
      "image": "images/museum/met-65723.webp",
      "url": "https://www.metmuseum.org/art/collection/search/65723",
      "type": "COSTUME"
    },
    {
      "id": 112525,
      "title": "Costume",
      "date": "1850–1900",
      "creator": "",
      "image": "images/museum/met-112525.webp",
      "url": "https://www.metmuseum.org/art/collection/search/112525",
      "type": "COSTUME"
    },
    {
      "id": 22739,
      "title": "Mask",
      "date": "dated 1745",
      "creator": "Myōchin Muneakira",
      "image": "images/museum/met-22739.webp",
      "url": "https://www.metmuseum.org/art/collection/search/22739",
      "type": "MASK"
    },
    {
      "id": 310350,
      "title": "Mask",
      "date": "19th century",
      "creator": "Romkun, Breri, or Igana people",
      "image": "images/museum/met-310350.webp",
      "url": "https://www.metmuseum.org/art/collection/search/310350",
      "type": "MASK"
    }
  ];

  function museumCard(item) {
    const title = escapeHTML(item.title);
    const type = escapeHTML(item.type);
    const description = escapeHTML([item.creator, item.date].filter(Boolean).join(' · '));
    return '<a class="archive-card museum-card" href="' + escapeHTML(item.url) +
      '" target="_blank" rel="noopener noreferrer" data-museum-id="' + item.id + '">' +
      '<div class="museum-artwork"><img src="' + escapeHTML(item.image) +
      '" alt="' + title + ' — artwork from The Metropolitan Museum of Art" loading="lazy" decoding="async" width="600" height="700"></div>' +
      '<div class="museum-card-copy"><p class="eyebrow">THE MET COLLECTION · ' + type +
      '</p><h3>' + title + '</h3><p data-museum-description>' + description + '</p></div></a>';
  }

  async function loadArchive() {
    const grid = $('#archive-grid');
    const loading = $('#archive-loading');
    const error = $('#archive-error');
    const retry = $('#archive-retry');
    if (!grid) return;

    grid.innerHTML = museumCollection.map(museumCard).join('');
    error.hidden = true;
    retry.hidden = true;
    loading.hidden = false;
    loading.textContent = 'Checking live collection details…';

    $$('.museum-card img', grid).forEach(image => {
      image.addEventListener('error', () => {
        image.closest('.museum-card')?.remove();
        if (!grid.querySelector('.museum-card')) {
          error.textContent = 'Artwork photographs could not be loaded. Please reload the page.';
          error.hidden = false;
        }
      }, { once: true });
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const updated = await Promise.allSettled(museumCollection.map(async item => {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + item.id, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error('Museum HTTP ' + response.status);
        const details = await response.json();
        if (Number(details.objectID) !== item.id || !details.isPublicDomain) {
          throw new Error('Artwork metadata does not match the image');
        }
        return {
          id: item.id,
          title: typeof details.title === 'string' && details.title ? details.title : item.title,
          creator: details.artistDisplayName || details.culture || item.creator,
          date: details.objectDate || item.date,
          url: details.objectURL?.startsWith('https://www.metmuseum.org/') ? details.objectURL : item.url
        };
      }));

      let successes = 0;
      updated.forEach((result, i) => {
        if (result.status !== 'fulfilled') return;
        const data = result.value;
        const card = grid.querySelector('[data-museum-id="' + data.id + '"]');
        if (!card) return;
        card.querySelector('h3').textContent = data.title;
        card.querySelector('[data-museum-description]').textContent = [data.creator, data.date].filter(Boolean).join(' · ');
        card.href = data.url;
        card.querySelector('img').alt = data.title + ' — artwork from The Metropolitan Museum of Art';
        successes++;
      });
      if (successes === 0) throw new Error('No live museum records available');
      loading.textContent = 'Live details verified for ' + successes + ' of ' + museumCollection.length + ' artworks.';
      if (successes < museumCollection.length) {
        error.textContent = 'Some museum updates are unavailable. Matching photographs and saved details remain visible.';
        error.hidden = false;
        retry.hidden = false;
      }
    } catch {
      error.textContent = 'Live museum updates are unavailable. Showing the saved collection with matching artwork photographs.';
      error.hidden = false;
      retry.hidden = false;
      loading.textContent = '';
      loading.hidden = true;
    } finally {
      clearTimeout(timeout);
    }
  }

  function initArchive() {
    if (!$('#archive-grid')) return;
    $('#archive-retry')?.addEventListener('click', loadArchive);
    loadArchive();
  }


  function showcaseReview(id) {
    return SHOWCASE_REVIEWS.find(item => Number(item.topic) === Number(id)) || null;
  }

  function productReviews(id) {
    const local = getReviews().filter(item => Number(item.topic) === Number(id));
    const examples = SHOWCASE_REVIEWS.filter(item => Number(item.topic) === Number(id));
    return [...examples, ...local];
  }

  function productReviewItem(review) {
    const example = review.demo === true;
    const rating = example
      ? '<span class="review-example-label">Portfolio example · photo caption</span>'
      : '<span class="guestbook-stars" aria-label="' + review.rating + ' out of 5 stars">' +
        '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) + '</span>';
    const photo = example
      ? '<img class="product-review-photo" src="' + review.image + '" alt="Costume photo shared by ' +
        escapeHTML(review.name) + '" loading="lazy">'
      : '';
    return '<article class="item-review">' + photo +
      '<div class="item-review-copy"><div class="item-review-top">' + rating + '</div>' +
      '<p>' + escapeHTML(review.comment) + '</p>' +
      '<strong>' + escapeHTML(review.name) + '</strong>' +
      (example ? '<small>Demo caption, not a verified customer rating</small>' : '<small>Review saved in this browser</small>') +
      '</div></article>';
  }

  function productReviewMarkup(id, compact = false) {
    const reviews = productReviews(id);
    const list = reviews.length
      ? reviews.slice(0, compact ? 2 : 60).map(productReviewItem).join('')
      : '<p class="review-empty">No reviews for this costume yet. Share your experience below.</p>';
    if (compact) {
      return '<section class="modal-reviews"><h3>Photos &amp; reviews</h3><div class="item-review-list">' +
        list + '</div></section>';
    }
    const idName = 'item-review-' + id;
    const ratingOptions = [1, 2, 3, 4, 5].map(value =>
      '<label class="item-rating-star"><input type="radio" name="rating" value="' + value +
      '" aria-label="' + value + (value === 1 ? ' star' : ' stars') + '"><span aria-hidden="true">★</span></label>'
    ).join('');
    return '<section class="product-reviews" id="product-reviews">' +
      '<div class="section-head"><div><p class="eyebrow">CUSTOMER LOOKS</p><h2>Photos &amp; reviews.</h2></div>' +
      '<p>Photos from our project lookbook and reviews saved in your browser.</p></div>' +
      '<div class="product-reviews-layout"><div class="item-review-list" id="product-review-list">' + list +
      '</div><form class="item-review-form" data-product-review-form="' + id +
      '" novalidate><h3>Review this look</h3>' +
      '<label for="' + idName + '-name">Display name</label>' +
      '<input class="control" id="' + idName + '-name" name="name" type="text" placeholder="Your name" autocomplete="name">' +
      '<fieldset><legend>Your rating</legend><div class="item-rating-options">' + ratingOptions +
      '</div></fieldset><label for="' + idName + '-comment">Your review</label>' +
      '<textarea class="control" id="' + idName + '-comment" name="comment" rows="5" placeholder="What did you think of this costume?"></textarea>' +
      '<div class="item-review-error" role="alert" aria-live="polite"></div>' +
      '<button class="btn" type="submit">Post review ↗</button>' +
      '<p class="form-note">Reviews are stored on this device only. This is a demo storefront.</p>' +
      '</form></div></section>';
  }

  function renderProductPage() {
    const root = $('#product-detail-root');
    if (!root) return;
    const id = Number(new URLSearchParams(location.search).get('id'));
    const product = PRODUCTS.find(item => item.id === id);
    if (!product) {
      root.innerHTML = '<div class="empty-state"><h1>Look not found.</h1><p>Choose a costume from our collection.</p><a class="btn" href="catalog.html">Browse the collection ↗</a></div>';
      document.title = 'Look not found | Masquerade & Moon';
      return;
    }
    document.title = product.name + ' | Masquerade & Moon';
    const related = PRODUCTS.filter(item => item.id !== id && item.category === product.category).slice(0, 3);
    const saved = favoriteIds().includes(id);
    const reviewCount = productReviews(id).filter(review => !review.demo).length;
    root.innerHTML =
      '<div class="breadcrumbs"><a href="index.html">Home</a> / <a href="catalog.html">Collection</a> / ' +
      escapeHTML(product.name) + '</div>' +
      '<div class="product-detail-layout"><div class="product-detail-visual">' +
      '<img src="' + product.image + '" alt="' + escapeHTML(product.name) + ' costume"></div>' +
      '<div class="product-detail-copy"><p class="eyebrow">' + escapeHTML(product.label) + ' / THE COLLECTION</p>' +
      '<h1>' + escapeHTML(product.name) + '</h1><p class="body-copy">' + escapeHTML(product.detail) + '</p>' +
      '<h2 class="detail-price">' + money(product.price) + '<small> / 3 days</small></h2>' +
      '<p class="form-note">Illustrative rental price. No real orders are processed.</p>' +
      '<div class="detail-includes"><strong>What’s included</strong><p>' + escapeHTML(product.includes) + '</p></div>' +
      '<div class="cta-row"><a class="btn" href="rent.html?look=' + id + '">Plan a rental ↗</a>' +
      '<button class="btn outline" type="button" data-action="favorite" data-id="' + id + '">' +
      (saved ? '♥ Saved' : '♡ Save look') + '</button></div>' +
      '<a class="detail-review-jump" href="#product-reviews">Photos &amp; reviews · ' +
      (reviewCount + SHOWCASE_REVIEWS.filter(review => Number(review.topic) === id).length) + ' ↘</a>' +
      '</div></div>' + productReviewMarkup(id) +
      '<section class="product-related"><p class="eyebrow">MORE FROM THE COLLECTION</p><h2>Similar looks.</h2>' +
      '<div class="product-grid">' + related.map(cardMarkup).join('') + '</div></section>';
  }

  function initProductReviewForm() {
    document.addEventListener('submit', event => {
      const form = event.target.closest('[data-product-review-form]');
      if (!form) return;
      event.preventDefault();
      const id = Number(form.dataset.productReviewForm);
      if (!PRODUCTS.some(product => product.id === id)) return;
      const name = form.elements.namedItem('name').value.trim();
      const comment = form.elements.namedItem('comment').value.trim();
      const selected = form.querySelector('input[name="rating"]:checked');
      const error = form.querySelector('.item-review-error');
      error.textContent = '';
      if (name.length < 2 || name.length > 50) {
        error.textContent = 'Enter a display name between 2 and 50 characters.';
        form.elements.namedItem('name').focus();
        return;
      }
      if (!selected) {
        error.textContent = 'Choose a rating from 1 to 5 stars.';
        form.querySelector('input[name="rating"]').focus();
        return;
      }
      if (comment.length < 15 || comment.length > 500) {
        error.textContent = 'Write a review between 15 and 500 characters.';
        form.elements.namedItem('comment').focus();
        return;
      }
      const newReview = {
        id: crypto.randomUUID?.() || String(Date.now()) + '-' + Math.floor(Math.random() * 10000),
        name,
        topic: String(id),
        rating: Number(selected.value),
        comment,
        createdAt: new Date().toISOString()
      };
      if (!put('reviews', [newReview, ...getReviews()].slice(0, 60))) {
        error.textContent = 'Could not save the review. Please check browser storage.';
        return;
      }
      renderProductPage();
      updateCards();
      renderGuestbook();
      toast('Your review was saved on this device.');
      const section = $('#product-reviews');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function getReviews() {
    const items = get('reviews', []);
    return Array.isArray(items)
      ? items
          .filter(
            (item) =>
              item &&
              typeof item.id === 'string' &&
              Number.isInteger(item.rating) &&
              item.rating >= 1 &&
              item.rating <= 5 &&
              typeof item.name === 'string' &&
              typeof item.comment === 'string' &&
              item.name.length <= 60 &&
              item.comment.length <= 550
          )
          .slice(0, 60)
      : [];
  }


  function renderGuestbook() {
    const list = $('#reviews-list');
    if (!list) return;
    const reviews = getReviews();
    const sort = $('#review-sort')?.value || 'newest';
    if (sort === 'highest') reviews.sort((a, b) => b.rating - a.rating);
    else if (sort === 'lowest') reviews.sort((a, b) => a.rating - b.rating);
    else reviews.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    const summary = $('#review-summary');
    if (summary) {
      const count = reviews.length;
      if (!count) summary.textContent = 'No reviews saved in this browser';
      else {
        const average = reviews.reduce((sum, item) => sum + item.rating, 0) / count;
        summary.textContent =
          average.toFixed(1) + ' / 5 · ' + count + (count === 1 ? ' review' : ' reviews');
      }
    }
    if (!reviews.length) {
      list.innerHTML =
        '<div class="guestbook-empty"><span class="guestbook-empty-mark" aria-hidden="true">✧</span><h3>No reviews yet.</h3><p>Be the first to leave a review in this browser.</p></div>';
      return;
    }
    list.innerHTML = reviews
      .map((review) => {
        const product = PRODUCTS.find((item) => String(item.id) === String(review.topic));
        const subject =
          product ? product.name : 'Atelier experience';
        const date = new Date(review.createdAt);
        const dateLabel = Number.isNaN(date.getTime())
          ? 'Recently'
          : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return (
          '<article class="guestbook-review"><div class="guestbook-review-top"><span class="guestbook-stars" aria-label="' +
          review.rating +
          ' out of 5 stars">' +
          '★'.repeat(review.rating) +
          '<span class="guestbook-unfilled" aria-hidden="true">' +
          '☆'.repeat(5 - review.rating) +
          '</span></span>' +
          '<span class="guestbook-date">' +
          escapeHTML(dateLabel) +
          '</span></div>' +
          '<p class="guestbook-review-text">' +
          escapeHTML(review.comment) +
          '</p>' +
          '<div class="guestbook-review-bottom"><div><strong>' +
          escapeHTML(review.name) +
          '</strong><small>' +
          escapeHTML(subject) +
          '</small></div>' +
          '<button type="button" data-review-delete="' +
          escapeHTML(review.id) +
          '" aria-label="Delete review by ' +
          escapeHTML(review.name) +
          '">Delete</button>' +
          '</div></article>'
        );
      })
      .join('');
  }

  function initGuestbook() {
    const form = $('#review-form');
    if (!form) return;
    const name = form.elements.namedItem('name');
    const textArea = form.elements.namedItem('comment');
    const topic = form.elements.namedItem('topic');
    const user = currentUser();
    if (user) name.value = user.name;
    topic.innerHTML =
      '<option value="atelier">My atelier experience</option>' +
      PRODUCTS.map(
        (product) => '<option value="' + product.id + '">' + escapeHTML(product.name) + '</option>'
      ).join('');
    const radioButtons = Array.from(form.querySelectorAll('input[name="rating"]'));
    const updateStars = () => {
      const checked = form.querySelector('input[name="rating"]:checked');
      const chosen = checked ? Number(checked.value) : 0;
      Array.from(form.querySelectorAll('.review-star')).forEach((label, index) =>
        label.classList.toggle('selected', index < chosen)
      );
    };
    radioButtons.forEach((input) => input.addEventListener('change', updateStars));
    const counter = $('#review-character-count');
    textArea.addEventListener('input', () => {
      counter.textContent = String(textArea.value.length) + ' / 500 characters';
      counter.classList.toggle('over-limit', textArea.value.length > 500);
    });
    $('#review-sort').addEventListener('change', renderGuestbook);
    $('#reviews-list').addEventListener('click', (event) => {
      const button = event.target.closest('[data-review-delete]');
      if (!button) return;
      const id = button.dataset.reviewDelete;
      const updated = getReviews().filter((review) => review.id !== id);
      if (put('reviews', updated)) {
        renderGuestbook();
        toast('Review deleted from this browser.');
      }
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      Array.from(form.querySelectorAll('[data-review-error]')).forEach(
        (node) => (node.textContent = '')
      );
      const status = $('#review-status');
      status.textContent = '';
      const displayName = name.value.trim();
      const comment = textArea.value.trim();
      const chosen = form.querySelector('input[name="rating"]:checked');
      let firstInvalid = null;
      function invalid(field, message, selector) {
        $(selector, form).textContent = message;
        if (!firstInvalid) firstInvalid = field;
      }
      if (displayName.length < 2 || displayName.length > 50)
        invalid(
          name,
          'Please enter a display name between 2 and 50 characters.',
          '[data-review-error="name"]'
        );
      if (!chosen)
        invalid(
          radioButtons[0],
          'Please choose a rating from 1 to 5 stars.',
          '[data-review-error="rating"]'
        );
      if (comment.length < 15 || comment.length > 500)
        invalid(textArea, 'Write between 15 and 500 characters.', '[data-review-error="comment"]');
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      const reviews = getReviews();
      const review = {
        id: crypto.randomUUID?.() || String(Date.now()) + '-' + Math.floor(Math.random() * 100000),
        name: displayName,
        topic: topic.value,
        rating: Number(chosen.value),
        comment,
        createdAt: new Date().toISOString()
      };
      if (!put('reviews', [review, ...reviews].slice(0, 60))) {
        status.textContent = 'Your browser could not save this review. Check your storage settings.';
        return;
      }
      form.reset();
      if (user) name.value = user.name;
      updateStars();
      counter.textContent = '0 / 500 characters';
      counter.classList.remove('over-limit');
      renderGuestbook();
      status.textContent = 'Review saved on this device. Thank you for your feedback.';
      toast('Your review has been saved on this device.');
    });
    renderGuestbook();
  }

  
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('mm_final_')) {
      updateHeader();
      updateCards();
      if (event.key === 'mm_final_reviews') renderGuestbook();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    renderProductCounts();
    updateHeader();
    initProducts();
    renderProductPage();
    initProductReviewForm();
    initPasswordVisibility();
    setupSignup();
    setupLogin();
    initRental();
    initContact();
    renderProfile();
    initArchive();
    initGuestbook();
  });
})();
