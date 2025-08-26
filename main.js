
// Mobile nav hamburger menu
document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('header nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-label', nav.classList.contains('open') ? 'Close navigation' : 'Open navigation');
    });
    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Set copyright year dynamically
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }

  // Minecraft-style particle burst on title click
  const title = document.querySelector('header h1');
  if (!title) return;

  // Create a canvas overlay
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 1000;
  document.body.appendChild(canvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function randomColor() {
    // Minecraft-like colors
    const palette = ['#39ff14', '#FFD700', '#00BFFF', '#FF5555', '#FFAA00', '#55FF55', '#AAAAAA', '#5555FF'];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  function burst(x, y) {
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 2 + Math.random() * 3;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: randomColor(),
        life: 40 + Math.random() * 20
      });
    }
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, (p.life - frame) / p.life);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
      });
      ctx.globalAlpha = 1;
      frame++;
      if (frame < 60) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  title.style.cursor = 'pointer';
  title.title = 'Click me!';
  title.addEventListener('click', function(e) {
    const rect = title.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    burst(x, y);
  });
});
