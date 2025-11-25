/* Animated gradient particles on <canvas> */
(function () {
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d', { alpha: false });
  let w, h, dpr, dots;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    // build dots
    const count = Math.min(120, Math.floor((w * h) / (14000 * dpr)));
    dots = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.8 + 0.6) * dpr,
      a: Math.random() * Math.PI * 2,
      s: (Math.random() * 0.3 + 0.05) * dpr
    }));
  }

  function frame() {
    // gradient background glow
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#09121d');
    g.addColorStop(1, '#0b0f16');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // dots
    for (const p of dots) {
      p.a += 0.002 + p.s * 0.002;
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      const rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      rad.addColorStop(0, 'rgba(22,210,193,0.22)');
      rad.addColorStop(1, 'rgba(22,210,193,0)');
      ctx.fillStyle = rad;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize(); frame();
})();

/* IntersectionObserver for reveal animations */
(function () {
  const els = [...document.querySelectorAll('.reveal')];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.isIntersecting && e.target.classList.add('in'));
  }, { threshold: 0.2 });
  els.forEach((el) => obs.observe(el));
})();

/* Mobile nav toggle */
(function () {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
})();

/* Copy email helper */
(function () {
  const btn = document.querySelector('.copy-email');
  const confirm = document.querySelector('.copy-confirm');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      if (confirm) confirm.textContent = 'Copied ✓';
      setTimeout(() => confirm && (confirm.textContent = ''), 1800);
    } catch {
      if (confirm) confirm.textContent = 'Copy failed';
    }
  });
})();

/* Year in footer */
document.getElementById('year').textContent = new Date().getFullYear();

