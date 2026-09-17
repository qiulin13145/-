(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const year = document.getElementById('year');

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  if (initial === 'dark') root.setAttribute('data-theme', 'dark');

  button?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
