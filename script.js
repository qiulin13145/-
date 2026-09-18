document.documentElement.classList.add('js');

// Small layout/asset hotfixes loaded after the main stylesheet.
const hotfixStyles = document.createElement('link');
hotfixStyles.rel = 'stylesheet';
hotfixStyles.href = '/hotfix.css?v=20260918-0115';
document.head.appendChild(hotfixStyles);

const body = document.body;
const header = document.querySelector('.site-header');
const progress = document.getElementById('scroll-progress');
const menuButton = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');
const navLinks = [...document.querySelectorAll('.nav-link')];
const revealItems = [...document.querySelectorAll('.reveal')];
const sections = [...document.querySelectorAll('main section[id], header[id]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

requestAnimationFrame(() => {
  requestAnimationFrame(() => body.classList.add('ready'));
});

document.getElementById('year').textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        entry.target.style.setProperty('--delay', `${delay}ms`);
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.13, rootMargin: '0px 0px -7% 0px' }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const updateScrollUI = () => {
  const y = window.scrollY;
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const pct = Math.min(100, Math.max(0, (y / scrollable) * 100));
  if (progress) progress.style.width = `${pct}%`;
  header?.classList.toggle('scrolled', y > 14);

  let current = 'top';
  const marker = y + window.innerHeight * 0.33;
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);

if (!reduceMotion) {
  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];
  let mouseX = 0;
  let mouseY = 0;
  let raf = null;

  const renderParallax = () => {
    parallaxItems.forEach((el) => {
      const strength = Number(el.dataset.parallax || 0);
      el.style.setProperty('--px', `${mouseX * strength}px`);
      el.style.setProperty('--py', `${mouseY * strength}px`);
    });
    raf = null;
  };

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    if (!raf) raf = requestAnimationFrame(renderParallax);
  }, { passive: true });

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const ry = (x - 0.5) * 5.5;
        const rx = (0.5 - y) * 5.5;
        card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });

    document.querySelectorAll('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate(${dx * 0.11}px, ${dy * 0.11}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  }
}
