/* ── Canvas & context ── */
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ── Static stars ── */
const stars = Array.from({ length: 200 }, () => ({
  x:            Math.random() * window.innerWidth,
  y:            Math.random() * window.innerHeight,
  r:            Math.random() * 1.8 + 0.2,
  alpha:        Math.random(),
  speed:        Math.random() * 0.02 + 0.005,
  twinkleOffset: Math.random() * Math.PI * 2,
}));

/* ── Shooting stars ── */
const shootingStars = [];

function addShootingStar() {
  shootingStars.push({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight * 0.5,
    len:   Math.random() * 120 + 60,
    speed: Math.random() * 6 + 4,
    alpha: 1,
    angle: Math.PI / 5,
  });
}

setInterval(addShootingStar, 3000);

/* ── Draw loop ── */
function drawStars(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background gradient
  const grad = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width * 0.8
  );
  grad.addColorStop(0, '#0b1535');
  grad.addColorStop(1, '#020610');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // twinkling stars
  stars.forEach(s => {
    const tw = Math.sin(t * s.speed + s.twinkleOffset) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 240, ${0.3 + tw * 0.7})`;
    ctx.fill();
  });

  // shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const ss = shootingStars[i];

    const tail = ctx.createLinearGradient(
      ss.x, ss.y,
      ss.x - Math.cos(ss.angle) * ss.len,
      ss.y - Math.sin(ss.angle) * ss.len
    );
    tail.addColorStop(0, `rgba(255, 255, 200, ${ss.alpha})`);
    tail.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.strokeStyle = tail;
    ctx.lineWidth   = 2;
    ctx.moveTo(ss.x, ss.y);
    ctx.lineTo(
      ss.x - Math.cos(ss.angle) * ss.len,
      ss.y - Math.sin(ss.angle) * ss.len
    );
    ctx.stroke();

    ss.x     += Math.cos(ss.angle) * ss.speed;
    ss.y     += Math.sin(ss.angle) * ss.speed;
    ss.alpha -= 0.015;

    if (ss.alpha <= 0 || ss.x > window.innerWidth) {
      shootingStars.splice(i, 1);
    }
  }
}

let t = 0;
(function loop() {
  drawStars(t);
  t += 0.03;
  requestAnimationFrame(loop);
})();

/* ── Button: send love ── */
function sendLove() {
  const container = document.getElementById('sparkles');
  const colors = ['#ffcc00', '#ff6fa8', '#aaccff', '#ffffff'];

  for (let i = 0; i < 12; i++) {
    const sp   = document.createElement('div');
    sp.className = 'sparkle';
    const size   = Math.random() * 8 + 4;

    sp.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left: 50%;
      top:  50%;
      --dx: ${(Math.random() - 0.5) * 200}px;
      --dy: ${(Math.random() - 0.5) * 200}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 0.3}s;
    `;

    container.appendChild(sp);
    setTimeout(() => sp.remove(), 1200);
  }

  // spawn extra shooting stars on click
  addShootingStar();
  addShootingStar();
  addShootingStar();
}
