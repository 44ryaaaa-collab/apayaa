// Falling background elements
const bg = document.getElementById('bgLayer');
const items = ['🌸', '🌷', '✿', '❀', '💕', '🩷', '⭐', '✨'];

for (let i = 0; i < 32; i++) {
  const el = document.createElement('div');
  el.className = 'floaty';
  el.innerText = items[Math.floor(Math.random() * items.length)];
  el.style.cssText = `
    left: ${Math.random() * 100}%;
    font-size: ${10 + Math.random() * 16}px;
    animation-duration: ${6 + Math.random() * 9}s;
    animation-delay: ${Math.random() * 10}s;
  `;
  bg.appendChild(el);
}

// Confetti burst — works for both mouse click and touch
function popHearts(e) {
  const shapes = ['💕', '💖', '🌸', '✨', '💝', '⭐', '🩷'];

  // Get position from touch or mouse
  let x, y;
  if (e.touches && e.touches.length > 0) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else if (e.changedTouches && e.changedTouches.length > 0) {
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const angle = Math.random() * 360;
    const dist  = 80 + Math.random() * 160;
    el.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      font-size: ${14 + Math.random() * 16}px;
      --tx: ${Math.cos(angle * Math.PI / 180) * dist}px;
      --ty: ${Math.sin(angle * Math.PI / 180) * dist}px;
      --r: ${Math.random() * 360}deg;
      animation-duration: ${0.7 + Math.random() * 0.6}s;
    `;
    el.innerText = shapes[Math.floor(Math.random() * shapes.length)];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }

  // Wiggle the card
  const card = document.getElementById('card');
  card.style.transform = 'scale(1.04) rotate(-1deg)';
  setTimeout(() => card.style.transform = 'scale(1.04) rotate(1deg)', 100);
  setTimeout(() => card.style.transform = 'scale(1)', 200);
}

// Attach both click (desktop) and touchend (mobile)
const btn = document.getElementById('loveBtn');
btn.addEventListener('click', popHearts);
btn.addEventListener('touchend', function(e) {
  e.preventDefault(); // prevent ghost click on mobile
  popHearts(e);
});
