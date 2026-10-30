// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav link highlighting
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Back-to-top button
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 500), { passive: true });
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form validation (no email is sent: add Formspree/Netlify Forms for delivery)
const form = document.getElementById('form');
const status = document.getElementById('status');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const f = document.getElementById(id), err = document.getElementById('e-' + id);
    let msg = '';
    if (!f.value.trim()) msg = 'Enter your ' + id + '.';
    else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Enter a valid email address.';
    else if (id === 'message' && f.value.trim().length < 10) msg = 'Write at least 10 characters.';
    err.textContent = msg; f.classList.toggle('bad', !!msg);
    if (msg) ok = false;
  });
  status.textContent = ok ? 'Looks good. Connect a form service to send this message.' : '';
  if (ok) form.reset();
});
