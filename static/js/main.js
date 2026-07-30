/* Minimal JS for The Porto Map */

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('is-open');
    const isOpen = links.classList.contains('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('is-open');
    }
  });
}());

// Scroll-based nav highlight
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
      ? 'rgba(255, 255, 255, 0.98)'
      : 'rgba(255, 255, 255, 0.93)';
  }, { passive: true });
}());

// Active nav link
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav__links a').forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    }
  });
}());

// Fade-in on scroll (intersection observer)
(function () {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}());
