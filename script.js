/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
});

/* ── NAVBAR ── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 60);
});

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── DARK MODE ── */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

/* ── TYPING ANIMATION ── */
const phrases = ['Senior Tableau Analyst', 'BI Strategist', 'Data Visualization Expert', 'Dashboard Architect'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = phrases[pi];
  typedEl.textContent = deleting ? current.slice(0, --ci) : current.slice(0, ++ci);
  let delay = deleting ? 60 : 90;
  if (!deleting && ci === current.length) { delay = 2000; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
  setTimeout(type, delay);
}
type();

/* ── HERO PARTICLE CANVAS ── */
(function() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Dot {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.a  = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(103,232,249,${this.a})`;
      ctx.fill();
    }
  }

  const COUNT = Math.min(100, Math.floor((W * H) / 9000));
  for (let i = 0; i < COUNT; i++) particles.push(new Dot());

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(103,232,249,${0.12 * (1 - d / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => ro.observe(el));

/* ── STAT COUNTERS ── */
const statEls = document.querySelectorAll('.stat-val[data-count]');
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.ceil(1400 / target);
    const tick = () => {
      cur++;
      el.textContent = cur;
      if (cur < target) setTimeout(tick, step);
    };
    tick();
    co.unobserve(el);
  });
}, { threshold: 0.5 });
statEls.forEach(el => co.observe(el));

/* ── SKILL BARS ── */
const bars = document.querySelectorAll('.skill-fill');
const bo = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      bo.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => bo.observe(b));

/* ── CERT FILTER ── */
const cfBtns = document.querySelectorAll('.cf-btn');
const certCards = document.querySelectorAll('.cert-card');

cfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    cfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    certCards.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'popIn .3s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── POP-IN KEYFRAME ── */
const s = document.createElement('style');
s.textContent = `@keyframes popIn{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}`;
document.head.appendChild(s);
