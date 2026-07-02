/* ========== NAVBAR SCROLL ========== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ========== MOBILE MENU ========== */
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ========== TYPING EFFECT ========== */
const roles = [
  'Agentes de IA',
  'Automatización de Procesos',
  'Ciberseguridad',
  'Desarrollo Full-Stack',
  'Low-Code',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = roles[roleIdx];
  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      return setTimeout(type, 1800);
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}

setTimeout(type, 1200);

/* ========== PARTICLE CANVAS ========== */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  const COLORS = ['rgba(108,99,255,', 'rgba(0,212,255,', 'rgba(255,107,107,'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.floor((canvas.width * canvas.height) / 22000);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });

    // Connect nearby particles with lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108,99,255,${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); }, { passive: true });
})();

/* ========== SCROLL REVEAL ========== */
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ========== COUNT-UP ANIMATION ========== */
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = target / 50;
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.ceil(current);
        if (current >= target) clearInterval(interval);
      }, 30);
    });
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) countObserver.observe(statsEl);

/* ========== CONTACT FORM ========== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.innerHTML = '✅ ¡Mensaje enviado!';
  btn.disabled = true;
  btn.style.opacity = '0.8';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.disabled = false;
    btn.style.opacity = '';
    this.reset();
  }, 3000);
});

/* ========== ACTIVE NAV LINK ON SCROLL ========== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navItems.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--primary)'
      : '';
  });
}, { passive: true });
