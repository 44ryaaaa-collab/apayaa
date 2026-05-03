// ── Floating hearts ──
const hContainer = document.getElementById('hearts-bg');
const symbols = ['♡', '♡', '♡', '·', '✿'];
const colors  = ['#e91e63', '#f48fb1', '#f06292', '#ec407a', '#c2185b'];

for (let i = 0; i < 20; i++) {
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  h.style.cssText = `
    left: ${Math.random() * 100}vw;
    font-size: ${Math.random() * 14 + 9}px;
    color: ${colors[Math.floor(Math.random() * colors.length)]};
    animation: floatUp ${Math.random() * 12 + 10}s ${Math.random() * 10}s linear infinite;
  `;
  hContainer.appendChild(h);
}

// ── YouTube IFrame API ──
let player, isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    videoId: '3rf16_Q77WQ',
    playerVars: { autoplay: 0, controls: 0 },
    events: {
      onStateChange: (e) => {
        isPlaying = (e.data === YT.PlayerState.PLAYING);
        document.getElementById('playBtn').textContent = isPlaying ? '⏸' : '▶';
        document.getElementById('albumArt').classList.toggle('playing', isPlaying);
      }
    }
  });
}

function togglePlay() {
  if (!player) return;
  isPlaying ? player.pauseVideo() : player.playVideo();
}

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

// ── Petal burst ──
const emojis = ['🌸', '💕', '✨', '🌷', '💖', '🎀', '🌺'];

function burstPetals() {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: 0;
      font-size: ${Math.random() * 12 + 14}px;
      animation-duration: ${Math.random() * 3 + 3}s;
      animation-delay: ${Math.random() * 0.8}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 6000);
  }
}
