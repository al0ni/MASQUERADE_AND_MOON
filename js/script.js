$(document).ready(function () {
  console.log('jQuery is ready!');

  function notify(message) {
    $('#toast').stop(true, true).text(message).fadeIn(180).delay(2500).fadeOut(400);
  }

  function loadImages() {
    const top = $(window).scrollTop();
    const bottom = top + $(window).height();
    $('img[data-src]').each(function () {
      const image = $(this);
      if (image.is(':visible') && image.offset().top < bottom && image.offset().top + image.height() > top) {
        image.attr('src', image.attr('data-src')).removeAttr('data-src');
      }
    });
  }

  function updateScroll() {
    const distance = $(document).height() - $(window).height();
    const percent = distance > 0 ? Math.min(100, $(window).scrollTop() / distance * 100) : 0;
    $('#scroll-progress div').css('width', percent + '%');
    $('#scroll-progress').attr('aria-valuenow', Math.round(percent));
    loadImages();
    $('.number-counter').each(function () {
      const counter = $(this);
      if (!counter.data('started') && counter.offset().top < $(window).scrollTop() + $(window).height()) {
        counter.data('started', true);
        $({ value: 0 }).animate({ value: Number(counter.attr('data-count')) }, {
          duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1400,
          easing: 'swing',
          step: function (value) { counter.text(Math.floor(value)); },
          complete: function () { counter.text(counter.attr('data-count')); }
        });
      }
    });
  }

  $(window).on('scroll resize load', updateScroll);
  updateScroll();

  const grid = $('.product-grid');
  if (grid.length) {
    const cards = grid.find('.product-card').get();
    const categories = ['medieval', 'medieval', 'medieval', 'gothic', 'gothic', 'gothic', 'winter', 'winter', 'winter', 'halloween', 'halloween', 'halloween'];
    const search = $('#costume-search');
    const suggestions = $('#search-suggestions');
    const stored = storage.get('favorites', []);
    let favorites = Array.isArray(stored) ? stored.filter(id => Number.isInteger(id) && id >= 0 && id < cards.length) : [];

    $(cards).each(function (index) {
      const card = $(this);
      card.data('id', index).data('category', categories[index]);
      card.data('name', card.find('h3').text());
      card.data('price', Number(card.find('strong').text().split('/')[0].replace(/[^0-9]/g, '')));
      card.find('h3, .product-info > p').each(function () { $(this).data('original', $(this).text()); });
      card.find('.product-info').append($('<button>', { type: 'button', class: 'favorite-button', 'aria-label': 'Save ' + card.data('name') }));
    });

    function highlight(element, query) {
      const text = element.data('original');
      element.empty();
      let position = 0;
      let match = query ? text.toLowerCase().indexOf(query) : -1;
      while (match !== -1) {
        element.append(document.createTextNode(text.slice(position, match)));
        element.append($('<mark>').text(text.slice(match, match + query.length)));
        position = match + query.length;
        match = text.toLowerCase().indexOf(query, position);
      }
      element.append(document.createTextNode(text.slice(position)));
    }

    function matchingCards(query) {
      return $(cards).filter(function () {
        const card = $(this);
        return ($('#category-filter').val() === 'all' || card.data('category') === $('#category-filter').val()) &&
          (!$('#saved-only').prop('checked') || favorites.includes(card.data('id'))) &&
          card.data('name').toLowerCase().includes(query);
      }).get();
    }

    function closeSuggestions() {
      suggestions.prop('hidden', true);
      search.attr('aria-expanded', 'false');
    }

    function renderProducts(showSuggestions) {
      const query = search.val().trim().toLowerCase();
      const shown = matchingCards(query);
      if ($('#price-sort').val() === 'low') shown.sort((a, b) => $(a).data('price') - $(b).data('price'));
      if ($('#price-sort').val() === 'high') shown.sort((a, b) => $(b).data('price') - $(a).data('price'));
      $(cards).detach();
      shown.forEach(function (element) {
        const card = $(element);
        const saved = favorites.includes(card.data('id'));
        card.find('.favorite-button').text(saved ? 'Saved' : 'Save look').attr('aria-pressed', String(saved));
        card.find('h3, .product-info > p').each(function () { highlight($(this), query); });
        grid.append(card);
      });
      $('#product-count').text(shown.length ? shown.length + ' of 12 looks. ' + favorites.length + ' saved.' : 'No looks found. Try another filter or clear your search.');
      suggestions.empty();
      if (showSuggestions && query) {
        shown.slice(0, 5).forEach(function (card) {
          const button = $('<button>', { type: 'button', text: $(card).data('name') });
          suggestions.append($('<li>').append(button));
        });
      }
      const open = suggestions.children().length > 0;
      suggestions.prop('hidden', !open);
      search.attr('aria-expanded', String(open));
      updateScroll();
    }

    search.on('input', function () { renderProducts(true); });
    search.on('keydown', function (event) {
      if (event.key === 'ArrowDown' && !suggestions.prop('hidden')) {
        event.preventDefault();
        suggestions.find('button').first().trigger('focus');
      }
      if (event.key === 'Escape') { event.preventDefault(); closeSuggestions(); }
    });
    suggestions.on('click', 'button', function () {
      search.val($(this).text());
      renderProducts(false);
      search.trigger('focus');
    });
    suggestions.on('keydown', 'button', function (event) {
      const buttons = suggestions.find('button');
      const index = buttons.index(this);
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        buttons.eq((index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length).trigger('focus');
      }
      if (event.key === 'Escape') { closeSuggestions(); search.trigger('focus'); }
    });
    $(document).on('click focusin', function (event) {
      if (!$(event.target).closest('.search-box').length) closeSuggestions();
    });
    $('#category-filter, #price-sort, #saved-only').on('change', function () { renderProducts(false); });
    $('#reset-filters').on('click', function () {
      search.val('');
      $('#category-filter').val('all');
      $('#price-sort').val('default');
      $('#saved-only').prop('checked', false);
      renderProducts(false);
    });
    grid.on('click', '.favorite-button', function () {
      const id = $(this).closest('.product-card').data('id');
      const saved = favorites.includes(id);
      favorites = saved ? favorites.filter(value => value !== id) : [...favorites, id];
      storage.set('favorites', favorites);
      renderProducts(false);
      if (this.isConnected) this.focus();
      else $('#saved-only').trigger('focus');
      notify(saved ? 'Look removed from saved looks.' : 'Look added to saved looks.');
      playSound();
    });
    renderProducts(false);
  }

  $('#subscription-form').on('submit', function (event) {
    event.preventDefault();
    const form = $(this);
    if (form.data('busy')) return;
    const email = $('#subscription-email');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.val().trim());
    email.attr('aria-invalid', String(!valid));
    if (!valid) {
      $('#subscription-status').text('Enter a valid email address.');
      email.trigger('focus');
      return;
    }
    const button = form.find('[type="submit"]');
    const label = button.html();
    form.data('busy', true).attr('aria-busy', 'true');
    button.prop('disabled', true).html('<span class="submit-spinner" aria-hidden="true"></span> Please wait...');
    $('#subscription-status').text('Checking your subscription...');
    setTimeout(function () {
      button.prop('disabled', false).html(label);
      form.data('busy', false).attr('aria-busy', 'false');
      $('#subscription-status').text('Subscription demo complete. Your email was not sent or saved.');
      notify('Subscription demo completed successfully.');
    }, 1600);
  });

  $('.copy-button').on('click', async function () {
    const button = $(this);
    const text = $(button.attr('data-copy-target')).text();
    try {
      await navigator.clipboard.writeText(text);
      button.find('.copy-icon').text('\u2713');
      $('#copy-tooltip').prop('hidden', false);
      notify('Copied to clipboard!');
      clearTimeout(button.data('timer'));
      button.data('timer', setTimeout(function () {
        button.find('.copy-icon').text('\uD83D\uDCCB');
        $('#copy-tooltip').prop('hidden', true);
      }, 2500));
    } catch {
      notify('Copy is unavailable. Select the link and copy it manually.');
    }
  });
});
