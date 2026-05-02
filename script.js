/* =============================================
   FOR NANA — Interactive Script
   ============================================= */

// ---- STAR CANVAS ----
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Generate stars
const STAR_COUNT = 160;
const stars = Array.from({ length: STAR_COUNT }, () => ({
  x:     Math.random(),
  y:     Math.random(),
  r:     Math.random() * 1.3 + 0.3,
  phase: Math.random() * Math.PI * 2,
  speed: Math.random() * 0.006 + 0.002,
  color: Math.random() > 0.85 ? '#ffd0e8' : '#fffce8'
}));

// Shooting stars
const shooters = [];

function spawnShooter() {
  shooters.push({
    x:    Math.random() * canvas.width * 0.6,
    y:    Math.random() * canvas.height * 0.3,
    vx:   3 + Math.random() * 4,
    vy:   1.5 + Math.random() * 2,
    life: 1,
    len:  40 + Math.random() * 60
  });
}
setInterval(spawnShooter, 3000);

let animT = 0;
function drawBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw twinkling stars
  stars.forEach(s => {
    const alpha = 0.25 + 0.65 * Math.abs(Math.sin(s.phase + animT * s.speed));
    ctx.beginPath();
    ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
    // Fallback: just set globalAlpha
    ctx.globalAlpha = alpha;
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  });

  // Draw shooting stars
  for (let i = shooters.length - 1; i >= 0; i--) {
    const s = shooters[i];
    const grad = ctx.createLinearGradient(
      s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6),
      s.x, s.y
    );
    grad.addColorStop(0, 'rgba(255,224,102,0)');
    grad.addColorStop(1, `rgba(255,248,200,${s.life * 0.85})`);

    ctx.save();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(s.x - s.vx * (s.len / 6), s.y - s.vy * (s.len / 6));
    ctx.lineTo(s.x, s.y);
    ctx.stroke();
    ctx.restore();

    s.x    += s.vx;
    s.y    += s.vy;
    s.life -= 0.02;
    if (s.life <= 0 || s.x > canvas.width + 100) shooters.splice(i, 1);
  }

  animT++;
  requestAnimationFrame(drawBg);
}
requestAnimationFrame(drawBg);

// ---- PAGE NAVIGATION ----
function goToPage(targetId) {
  const current = document.querySelector('.page:not(.hidden)');
  const target  = document.getElementById(targetId);
  if (!target || current === target) return;

  current.classList.add('exit');
  setTimeout(() => {
    current.classList.add('hidden');
    current.classList.remove('exit');
    target.classList.remove('hidden');
    // Trigger reflow for transition
    requestAnimationFrame(() => {
      target.style.opacity = '';
      target.style.transform = '';
    });
  }, 500);
}

// ---- TAP RIPPLE + HEART SPAWN ON SCREEN TOUCH ----
function spawnRipple(x, y) {
  const el = document.createElement('div');
  el.className = 'ripple';
  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  document.getElementById('ripple-container').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function spawnFloatingHeart(x, y) {
  const hearts = ['💛', '🌙', '✨', '💫', '⭐', '💕'];
  const el = document.createElement('div');
  el.className = 'float-heart';
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  el.style.left = (x - 12) + 'px';
  el.style.top  = (y - 12) + 'px';
  document.getElementById('hearts-container').appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

document.body.addEventListener('touchstart', (e) => {
  const touch = e.changedTouches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  spawnRipple(x, y);
  if (Math.random() > 0.55) spawnFloatingHeart(x, y);
}, { passive: true });

document.body.addEventListener('click', (e) => {
  spawnRipple(e.clientX, e.clientY);
  if (Math.random() > 0.55) spawnFloatingHeart(e.clientX, e.clientY);
});

// ---- ENVELOPE INTERACTION ----
const envelopeWrap = document.getElementById('envelope-wrap');
if (envelopeWrap) {
  envelopeWrap.addEventListener('click', openEnvelope);
  envelopeWrap.addEventListener('touchend', (e) => {
    e.preventDefault();
    openEnvelope();
  });
}

let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const env     = document.getElementById('envelope');
  const hint    = envelopeWrap.querySelector('.open-hint');
  const reveal  = document.getElementById('letter-reveal');

  env.classList.add('opened');

  // Shake animation
  env.style.animation = 'shake 0.5s ease';

  // Spawn hearts burst
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const rect = env.getBoundingClientRect();
      spawnFloatingHeart(
        rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
        rect.top + rect.height / 2 + (Math.random() - 0.5) * 40
      );
    }, i * 80);
  }

  setTimeout(() => {
    envelopeWrap.style.opacity = '0';
    envelopeWrap.style.transform = 'scale(0.8)';
    envelopeWrap.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      envelopeWrap.style.display = 'none';
      reveal.classList.remove('hidden');
      hint.style.display = 'none';
    }, 400);
  }, 700);
}

// Add shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    20%       { transform: rotate(-4deg) scale(1.05); }
    40%       { transform: rotate(4deg)  scale(1.05); }
    60%       { transform: rotate(-3deg); }
    80%       { transform: rotate(3deg); }
  }
`;
document.head.appendChild(shakeStyle);

// ---- STAR REVEAL (REASONS PAGE) ----
let revealedCount = 0;
const TOTAL_STARS  = 6;

function revealStar(el) {
  if (el.classList.contains('revealed')) return;
  el.classList.add('revealed');

  const msg = el.getAttribute('data-msg');
  el.querySelector('.star-msg').textContent = msg;

  // Burst hearts from star
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      spawnFloatingHeart(
        rect.left + rect.width / 2 + (Math.random() - 0.5) * 30,
        rect.top + rect.height / 2
      );
    }, i * 100);
  }

  revealedCount++;
  if (revealedCount === TOTAL_STARS) {
    const btnNext = document.getElementById('btn-next-wish');
    btnNext.style.opacity = '1';
    btnNext.style.pointerEvents = 'auto';
    btnNext.style.transition = 'opacity 0.6s ease';
  }
}

// ---- WISH PAGE ----
function makeWish() {
  const btn    = document.getElementById('btn-blow');
  const star   = document.getElementById('wish-star');
  const result = document.getElementById('wish-result');

  btn.style.transform = 'scale(0.85)';
  btn.style.opacity   = '0.5';

  // Explode sparkles
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  for (let i = 0; i < 14; i++) {
    setTimeout(() => {
      spawnFloatingHeart(
        centerX + (Math.random() - 0.5) * 180,
        centerY + (Math.random() - 0.5) * 180
      );
    }, i * 60);
  }

  star.style.animation = 'none';
  star.style.transform = 'scale(2.5) rotate(20deg)';
  star.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  star.style.opacity = '0';

  setTimeout(() => {
    btn.style.display = 'none';
    star.style.display = 'none';
    result.classList.remove('hidden');
  }, 700);
}

// ---- PASSIVE SPARKLE ON IDLE ----
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    spawnFloatingHeart(x, y);
  }, 4000);
}
document.addEventListener('touchstart', resetIdle, { passive: true });
document.addEventListener('mousemove', resetIdle);
resetIdle();
