const storage = {
  get(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem('mm-' + key));
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem('mm-' + key, JSON.stringify(value));
    } catch {
      return;
    }
  }
};

const themeButton = document.querySelector('#theme-toggle');
let theme = storage.get('theme', 'day');

function applyTheme() {
  document.documentElement.dataset.theme = theme;
  document.body.style.backgroundColor = '';
  const backgroundControl = document.querySelector('#change-background');
  if (backgroundControl) backgroundControl.disabled = theme === 'night';
  themeButton.textContent = theme === 'night' ? 'Day theme' : 'Night theme';
  themeButton.setAttribute('aria-pressed', String(theme === 'night'));
}

applyTheme();
themeButton.addEventListener('click', () => {
  theme = theme === 'day' ? 'night' : 'day';
  storage.set('theme', theme);
  applyTheme();
});

const soundButton = document.querySelector('#sound-toggle');
const soundStatus = document.querySelector('#sound-status');
const chime = new Audio('audio/chime.wav');
let soundEnabled = storage.get('sound', false) === true;

function updateSoundButton() {
  soundButton.textContent = soundEnabled ? 'Sound on' : 'Sound off';
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
}

function playSound() {
  if (!soundEnabled) return;
  chime.pause();
  chime.currentTime = 0;
  chime.play().catch(() => {
    soundStatus.textContent = 'Audio is unavailable in this browser.';
  });
}

updateSoundButton();
soundButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  storage.set('sound', soundEnabled);
  updateSoundButton();
  if (soundEnabled) {
    soundStatus.textContent = 'Sound enabled.';
    playSound();
  } else {
    chime.pause();
    soundStatus.textContent = 'Sound muted.';
  }
});

const menuLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];
menuLinks.forEach((link, index) => {
  link.addEventListener('keydown', (event) => {
    let next = index;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % menuLinks.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + menuLinks.length) % menuLinks.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = menuLinks.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    menuLinks[next].focus();
  });
});

function animateChange(element) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  element.animate([
    { opacity: 0.35, transform: 'translateY(12px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 280, easing: 'ease-out' });
}

const ratingButtons = document.querySelectorAll('[data-rating]');
if (ratingButtons.length) {
  const ratingStatus = document.querySelector('#rating-status');
  const savedRating = storage.get('rating', 0);
  let rating = Number.isInteger(savedRating) && savedRating >= 0 && savedRating <= 5 ? savedRating : 0;

  function showRating() {
    ratingButtons.forEach((button) => {
      const selected = Number(button.dataset.rating) <= rating;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(Number(button.dataset.rating) === rating));
    });
    ratingStatus.textContent = rating ? 'Your rating: ' + rating + ' out of 5. Thank you!' : 'Choose a star to rate our wardrobe.';
  }

  ratingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      rating = Number(button.dataset.rating);
      storage.set('rating', rating);
      showRating();
      animateChange(ratingStatus);
      playSound();
    });
  });
  showRating();
}

const productGrid = document.querySelector('.product-grid');
if (productGrid) {
  const categories = ['medieval', 'medieval', 'medieval', 'gothic', 'gothic', 'gothic', 'winter', 'winter', 'winter', 'halloween', 'halloween', 'halloween'];
  const storedFavorites = storage.get('favorites', []);
  let favorites = Array.isArray(storedFavorites) ? storedFavorites.filter((id) => Number.isInteger(id) && id >= 0 && id < 12) : [];
  const products = [...productGrid.querySelectorAll('.product-card')].map((card, index) => ({
    id: index,
    card,
    name: card.querySelector('h3').textContent,
    price: Number(card.querySelector('strong').textContent.replace(/[^0-9]/g, '').slice(0, -1)),
    category: categories[index],
    matches(category) {
      switch (category) {
        case 'medieval':
        case 'gothic':
        case 'winter':
        case 'halloween':
          return this.category === category;
        default:
          return true;
      }
    }
  }));
  const category = document.querySelector('#category-filter');
  const search = document.querySelector('#costume-search');
  const sort = document.querySelector('#price-sort');
  const savedOnly = document.querySelector('#saved-only');
  const count = document.querySelector('#product-count');

  for (const product of products) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'favorite-button';
    button.setAttribute('aria-label', 'Save ' + product.name);
    button.addEventListener('click', () => {
      favorites = favorites.includes(product.id) ? favorites.filter((id) => id !== product.id) : [...favorites, product.id];
      storage.set('favorites', favorites);
      renderProducts();
      if (button.isConnected) button.focus();
      else savedOnly.focus();
      playSound();
    });
    product.card.querySelector('.product-info').append(button);
    product.favoriteButton = button;
  }

  function renderProducts() {
    const query = search.value.trim().toLowerCase();
    const shown = products.filter((product) =>
      product.matches(category.value) &&
      product.name.toLowerCase().includes(query) &&
      (!savedOnly.checked || favorites.includes(product.id))
    );
    if (sort.value === 'low') shown.sort((a, b) => a.price - b.price);
    if (sort.value === 'high') shown.sort((a, b) => b.price - a.price);
    productGrid.replaceChildren();
    for (const product of shown) {
      const saved = favorites.includes(product.id);
      product.favoriteButton.textContent = saved ? 'Saved' : 'Save look';
      product.favoriteButton.setAttribute('aria-pressed', String(saved));
      productGrid.append(product.card);
    }
    count.textContent = shown.length ? shown.length + ' of 12 looks. ' + favorites.length + ' saved.' : 'No looks found. Try another filter or clear your search.';
    animateChange(productGrid);
  }

  search.addEventListener('input', renderProducts);
  [category, sort, savedOnly].forEach((control) => control.addEventListener('change', renderProducts));
  document.querySelector('#reset-filters').addEventListener('click', () => {
    category.value = 'all';
    search.value = '';
    sort.value = 'default';
    savedOnly.checked = false;
    renderProducts();
  });
  renderProducts();
}

const galleryImage = document.querySelector('#gallery-preview');
if (galleryImage) {
  const thumbnails = document.querySelectorAll('.gallery-thumb');
  thumbnails.forEach((button) => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      galleryImage.src = image.src;
      galleryImage.alt = image.alt;
      document.querySelector('#gallery-caption').textContent = image.alt;
      thumbnails.forEach((thumbnail) => thumbnail.setAttribute('aria-pressed', String(thumbnail === button)));
      animateChange(galleryImage);
    });
  });
}

const lookForm = document.querySelector('#look-form');
if (lookForm) {
  const steps = [...lookForm.querySelectorAll('fieldset')];
  const back = document.querySelector('#look-back');
  const next = document.querySelector('#look-next');
  const progress = document.querySelector('#look-progress');
  const result = document.querySelector('#look-result');
  const offers = {
    medieval: { name: 'The Crimson Countess', price: 12000 },
    gothic: { name: 'Crimson Bride', price: 13000 },
    winter: { name: 'Snow Queen', price: 15000 },
    halloween: { name: 'Velvet Witch', price: 11000 }
  };
  const rental = {
    getOffer() {
      return offers[lookForm.elements.collection.value];
    },
    total(days) {
      return Math.ceil(this.getOffer().price * days / 3);
    }
  };
  let step = 0;

  function showStep() {
    steps.forEach((fieldset, index) => { fieldset.hidden = index !== step; });
    progress.textContent = 'Step ' + (step + 1) + ' of 3';
    back.disabled = step === 0;
    next.textContent = step === 2 ? 'Finish preview' : 'Next';
    if (step === 2) {
      const name = lookForm.elements.visitor.value.trim();
      const days = Number(lookForm.elements.days.value);
      result.textContent = name + ', your look is ' + rental.getOffer().name + ', size ' + lookForm.elements.size.value + '. Estimated rental for ' + days + ' days: ' + rental.total(days).toLocaleString('en-US') + ' KZT.';
    }
    animateChange(steps[step]);
  }

  function changeStep(direction, callback) {
    if (direction > 0) {
      const fields = steps[step].querySelectorAll('input, select');
      for (const field of fields) {
        if (!field.reportValidity()) return;
      }
      if (step === 0 && !lookForm.elements.visitor.value.trim()) {
        lookForm.elements.visitor.setCustomValidity('Enter your name.');
        lookForm.elements.visitor.reportValidity();
        return;
      }
    }
    step += direction;
    callback();
    steps[step].querySelector('input, select, legend').focus();
  }

  lookForm.elements.visitor.addEventListener('input', () => lookForm.elements.visitor.setCustomValidity(''));
  back.addEventListener('click', () => changeStep(-1, showStep));
  lookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (step < 2) changeStep(1, showStep);
    else {
      document.querySelector('#look-status').textContent = 'Preview complete. Contact us to check availability. No booking or payment has been made.';
      playSound();
      animateChange(result);
    }
  });
  lookForm.addEventListener('reset', () => {
    step = 0;
    lookForm.elements.visitor.setCustomValidity('');
    document.querySelector('#look-status').textContent = '';
    showStep();
  });
  showStep();
}
