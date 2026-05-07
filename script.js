// Floating items
const floats = ['🌸','💕','🐰','💖','🌷','💗','🐇','✨','🎀','🥕','🌼','💝'];

function spawnFloat() {
  const el = document.createElement('div');
  el.className = 'pop-item';
  el.textContent = floats[Math.floor(Math.random() * floats.length)];
  el.style.left = Math.random() * 100 + '%';
  el.style.fontSize = (12 + Math.random() * 14) + 'px';
  const dur = 5 + Math.random() * 7;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 2 + 's';
  document.getElementById('floatLayer').appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}

setInterval(spawnFloat, 700);
for (let i = 0; i < 8; i++) spawnFloat();

// Sparkle on tap/click
function doSparkle(x, y) {
  const sp = ['💕','🌸','✨','🐰','💖','🎀'];
  for (let i = 0; i < 3; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = sp[Math.floor(Math.random() * sp.length)];
    s.style.left = (x + (Math.random() - 0.5) * 30) + 'px';
    s.style.top  = (y + (Math.random() - 0.5) * 30) + 'px';
    s.style.animationDelay = (i * 0.08) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
}

document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  doSparkle(t.clientX, t.clientY);
}, { passive: true });

document.addEventListener('click', e => doSparkle(e.clientX, e.clientY));

// Quiz
function quizAns(text, emoji) {
  document.getElementById('quizEmoji').textContent = emoji;
  const r = document.getElementById('quizResult');
  r.textContent = text;
  r.style.animation = 'none';
  void r.offsetWidth;
  r.style.animation = 'popIn 0.4s';
}

// Love Meter
function measureLove() {
  const bar  = document.getElementById('loveBar');
  const pct  = document.getElementById('lovePct');
  const desc = document.getElementById('loveDesc');
  const val  = Math.floor(Math.random() * 30) + 71;

  bar.style.width = val + '%';
  pct.textContent = val + '%';

  const msgs = [
    [90, 100, '💖 CINTA PENUH! Kelinci se-dunia ikut senang!'],
    [71,  89, 'Cintanya meluap-luap! 💕']
  ];
  for (const [lo, hi, msg] of msgs) {
    if (val >= lo && val <= hi) { desc.textContent = msg; break; }
  }

  pct.style.animation = 'none';
  void pct.offsetWidth;
  pct.style.animation = 'popIn 0.5s';
}

// Compliment Machine
const compliments = [
  "🐰 Kamu lebih lucu dari 1000 kelinci dijadikan satu!",
  "🌸 Senyummu bikin kelinci yang sedih langsung happy!",
  "💕 Kalau kamu jadi kelinci, pasti paling banyak difoto!",
  "🥕 Kamu lebih manis dari wortel organik import Belanda!",
  "🎀 Hidupku sebelum kamu = kandang kosong. Setelah kamu = surga!",
  "✨ Kamu bersinar lebih terang dari bintang malam!",
  "🐇 Hop hop hop... langsung ke hatiku tanpa permisi!",
  "💖 Aku cuma mau lihat kamu terus seumur hidup~",
  "🌷 Kamu wangi kayak taman bunga tempat kelinci main!",
  "🐰 Fakta ilmiah: kelinci paling gemas di dunia = kamu!"
];

let ci = 0;
function giveCompliment() {
  const b = document.getElementById('compBubble');
  b.textContent = compliments[ci % compliments.length];
  ci++;
  b.classList.remove('shake');
  void b.offsetWidth;
  b.classList.add('shake');
}
