// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Navbar background on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll-reveal animation =====
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: reveal everything immediately
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const setActiveLink = () => {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${currentId}` ? 'var(--text)' : '';
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();
