const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const fields = contactForm.querySelectorAll('[required]');
  const status = document.querySelector('#form-status');

  fields.forEach((field) => {
    const error = document.createElement('p');
    error.id = `${field.id}-error`;
    error.className = 'field-error mb-0';
    error.setAttribute('aria-live', 'polite');
    const description = field.getAttribute('aria-describedby');
    field.setAttribute('aria-describedby', description ? `${description} ${error.id}` : error.id);
    const container = field.closest('.input-group, .form-check') || field;
    container.after(error);
  });

  function validateField(field) {
    let message = '';

    if (field.type === 'checkbox' && !field.checked) {
      message = 'Please agree to the rental and contact rules.';
    } else if (field.type !== 'checkbox' && !field.value.trim()) {
      message = 'This field is required.';
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
      message = 'Enter a valid email address.';
    } else if (field.id === 'password' && field.value.length < 8) {
      message = 'Password must contain at least 8 characters.';
    } else if (field.id === 'confirm-password' && field.value !== contactForm.elements.password.value) {
      message = 'Passwords do not match.';
    }

    document.getElementById(`${field.id}-error`).textContent = message;
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', String(Boolean(message)));
    return !message;
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;

    fields.forEach((field) => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    status.textContent = firstInvalid ? 'Please correct the highlighted fields.' : 'Validation successful. This demo does not send or save your data.';
    if (firstInvalid) firstInvalid.focus();
  });

  contactForm.addEventListener('input', (event) => {
    status.textContent = '';
    if (event.target.required) validateField(event.target);
    if (event.target.id === 'password' && contactForm.elements['confirm-password'].value) {
      validateField(contactForm.elements['confirm-password']);
    }
  });

  contactForm.addEventListener('reset', () => {
    fields.forEach((field) => {
      field.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      document.getElementById(`${field.id}-error`).textContent = '';
    });
    status.textContent = '';
  });
}

document.querySelectorAll('.faq-question').forEach((button) => {
  const answer = document.getElementById(button.getAttribute('aria-controls'));
  answer.classList.remove('is-open');
  answer.setAttribute('aria-hidden', 'true');

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    answer.setAttribute('aria-hidden', String(expanded));
    answer.classList.toggle('is-open', !expanded);
  });
});

const popup = document.querySelector('#subscription-popup');

if (popup) {
  document.querySelector('#open-subscription').addEventListener('click', () => popup.showModal());
  document.querySelector('#close-subscription').addEventListener('click', () => popup.close());

  popup.addEventListener('click', (event) => {
    const bounds = popup.getBoundingClientRect();
    if (event.target === popup && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      popup.close();
    }
  });

  document.querySelector('#subscription-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#subscription-email');
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    document.querySelector('#subscription-status').textContent = valid ? 'Email validated. This demo does not send or save your email.' : 'Enter a valid email address.';
    email.setAttribute('aria-invalid', String(!valid));
    if (!valid) email.focus();
  });
}

const backgroundButton = document.querySelector('#change-background');

if (backgroundButton) {
  const colors = ['#f4f0e9', '#e6edf3', '#e9e2ef', '#e4ede4'];
  let colorIndex = 0;

  backgroundButton.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
  });
}

const dateTime = document.querySelector('#current-date-time');

if (dateTime) {
  function updateDateTime() {
    const now = new Date();
    dateTime.dateTime = now.toISOString();
    dateTime.textContent = now.toLocaleString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
    });
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}
