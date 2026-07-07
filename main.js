// Zeogital Consulting — site interactions
// All effects respect prefers-reduced-motion.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   1. Mobile menu — hamburger morphs to X, panel slides down
   ============================================================ */
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  // Close menu when a link inside it is clicked
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

/* ============================================================
   2. Header — compresses and gains a shadow once you scroll
   ============================================================ */
const header = document.querySelector('header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   3. Scroll-reveal — sections and cards fade up as they enter
      the viewport, with a stagger inside grids
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.pillar, .svc, .step, .vm, .certs li, .badge, .quote, .quote-attr, ' +
  'section .eyebrow, section h2, section .lead, .founder, .cta-band .btn, .contact-grid > *'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach(el => el.classList.add('visible'));
} else {
  const seenParents = new Map(); // parent -> count, for stagger
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const parent = el.parentElement;
      const count = seenParents.get(parent) || 0;
      el.style.transitionDelay = Math.min(count * 90, 450) + 'ms';
      seenParents.set(parent, count + 1);
      el.classList.add('visible');
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => io.observe(el));
  // Reset stagger counters between scroll bursts
  setInterval(() => seenParents.clear(), 800);
}

/* ============================================================
   4. Layered shield (homepage) — intro animation, then each
      ring becomes hoverable/clickable with a live caption
   ============================================================ */
const shield = document.querySelector('.shield');
if (shield) {
  const intro = [
    ['core', 300], ['r1', 300],
    ['r2', 750], ['l2', 750],
    ['r3', 1200], ['l3', 1200],
    ['r4', 1650], ['l4', 1650],
    ['r5', 2100], ['l5', 2100]
  ];
  if (reduced) {
    intro.forEach(([id]) => document.getElementById(id)?.classList.add('on'));
  } else {
    intro.forEach(([id, t]) => setTimeout(() => document.getElementById(id)?.classList.add('on'), t));
  }

  const layers = {
    r5: ['People & Training', 'Security awareness that turns your team from the weakest link into the first alarm.'],
    r4: ['Network', 'Firewalls, IDS/IPS, and full visibility of every asset on your estate.'],
    r3: ['Cloud', 'Hardened AWS and Azure environments with strict identity and access control.'],
    r2: ['Applications', 'Penetration testing and vulnerability management before attackers find the gaps.'],
    r1: ['Your Data', 'The core we protect — monitored around the clock by SIEM and threat detection.']
  };
  const caption = document.getElementById('shieldCaption');
  const defaultCaption = caption ? caption.textContent : '';

  Object.keys(layers).forEach(id => {
    const ring = document.getElementById(id);
    if (!ring) return;
    ring.classList.add('ring-interactive');
    ring.setAttribute('tabindex', '0');
    ring.setAttribute('role', 'link');
    ring.setAttribute('aria-label', layers[id][0] + ' — view services');

    const activate = () => {
      ring.classList.add('ring-hot');
      if (caption) {
        caption.innerHTML = '<strong>' + layers[id][0] + '</strong> — ' + layers[id][1];
        caption.classList.add('hot');
      }
    };
    const deactivate = () => {
      ring.classList.remove('ring-hot');
      if (caption) {
        caption.textContent = defaultCaption;
        caption.classList.remove('hot');
      }
    };
    ring.addEventListener('mouseenter', activate);
    ring.addEventListener('mouseleave', deactivate);
    ring.addEventListener('focus', activate);
    ring.addEventListener('blur', deactivate);
    ring.addEventListener('click', () => { window.location.href = 'services.html'; });
    ring.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.href = 'services.html'; }
    });
  });
}

/* ============================================================
   5. Contact form — inline validation + AJAX submit to Netlify
      Forms (no page reload). Falls back to a normal POST if
      JavaScript is unavailable.
   ============================================================ */
const form = document.querySelector('form[name="contact"]');
if (form) {
  const setError = (input, message) => {
    const field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('error', !!message);
    let msg = field.querySelector('.field-error');
    if (message) {
      if (!msg) {
        msg = document.createElement('p');
        msg.className = 'field-error';
        field.appendChild(msg);
      }
      msg.textContent = message;
    } else if (msg) {
      msg.remove();
    }
  };

  const validate = () => {
    let ok = true;
    const name = form.querySelector('#cname');
    const email = form.querySelector('#cemail');
    const msg = form.querySelector('#cmsg');
    if (!name.value.trim()) { setError(name, 'Please tell us your name.'); ok = false; } else setError(name, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, 'That email address doesn\u2019t look right.'); ok = false; } else setError(email, '');
    if (msg.value.trim().length < 10) { setError(msg, 'Give us a little more detail (at least a sentence).'); ok = false; } else setError(msg, '');
    return ok;
  };

  // Clear an error as soon as the person fixes the field
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => setError(el, ''));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = form.querySelector('.field.error input, .field.error textarea');
      if (firstError) firstError.focus();
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.textContent = 'Sending\u2026';
    button.disabled = true;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(res => {
        if (!res.ok) throw new Error('Submit failed');
        form.classList.add('sent');
        form.innerHTML =
          '<div class="form-inline-success">' +
          '<p class="mark">\u2713 REQUEST RECEIVED</p>' +
          '<h3>Thank you \u2014 we\u2019re on it.</h3>' +
          '<p>A member of the Zeogital team will reply within one business day with the next steps for your security review.</p>' +
          '</div>';
      })
      .catch(() => {
        button.textContent = original;
        button.disabled = false;
        let alert = form.querySelector('.form-alert');
        if (!alert) {
          alert = document.createElement('p');
          alert.className = 'form-alert';
          form.appendChild(alert);
        }
        alert.textContent = 'Something went wrong sending your message. Please try again, or email us directly.';
      });
  });
}

/* ============================================================
   6. Back-to-top button — appears after scrolling one screen
   ============================================================ */
const topBtn = document.createElement('button');
topBtn.className = 'back-to-top';
topBtn.setAttribute('aria-label', 'Back to top');
topBtn.innerHTML = '&uarr;';
document.body.appendChild(topBtn);
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
}, { passive: true });
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
});

/* ============================================================
   7. Page transitions — quick fade between internal pages
   ============================================================ */
if (!reduced) {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (link.target === '_blank' || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = url; }, 160);
    });
  });
}
