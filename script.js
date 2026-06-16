/* ============================================
   MYSPACE RETRO 8-BIT — script.js
   ============================================ */

"use strict";

/* ── PIXEL CURSOR TRAIL ── */
const cursor = document.getElementById('pixelCursor');
let mx = -20, my = -20;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

/* ── VISITOR COUNTER (localStorage) ── */
(function () {
  const key = 'px_visits';
  const stored = parseInt(localStorage.getItem(key) || '4820', 10);
  const next = stored + 1;
  localStorage.setItem(key, next);
  const el = document.getElementById('visitorCount');
  if (el) el.textContent = String(next).padStart(6, '0');
})();

/* ── TYPING EFFECT for status ── */
const statusMessages = [
  'chronically online',
  'vibing to something good',
  'in my own space.',
  'probably making a playlist.',
  'zoning out for no reason.',
];

let currentStatusIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeStatus() {
  const el = document.getElementById('statusText');
  if (!el) return;
  const fullText = statusMessages[currentStatusIdx];

  if (isDeleting) {
    el.textContent = fullText.substring(0, charIdx--);
    if (charIdx < 0) {
      isDeleting = false;
      currentStatusIdx = (currentStatusIdx + 1) % statusMessages.length;
      charIdx = 0;
      setTimeout(typeStatus, 600);
      return;
    }
    setTimeout(typeStatus, 45);
  } else {
    el.textContent = fullText.substring(0, ++charIdx);
    if (charIdx === fullText.length) {
      isDeleting = true;
      setTimeout(typeStatus, 2800);
      return;
    }
    setTimeout(typeStatus, 70);
  }
}

setTimeout(typeStatus, 2000);

/* ── MOOD ROTATOR ── */
const moods = [
  { emoji: '(´-ω-`)',        text: 'sleepy' },           // 0
  { emoji: '(っ˘ڡ˘ς)',       text: 'hungry' },           // 1
  { emoji: '(*´∀`)~♥',       text: 'in love with music'},// 2
  { emoji: '(ง •̀_•́)ง',     text: 'determined' },       // 3
  { emoji: '(´∩｀。)',         text: 'a little sad' },     // 4
  { emoji: '( ´ ▽ ` )ﾉ',    text: 'happy' },            // 5
  { emoji: '(´-ω-`)zzz',     text: 'exhausted' },        // 6
  { emoji: '(￣▽￣)ノ',       text: 'just vibing' },      // 7 
  { emoji: '( ˘ ³˘)♥🕹️',    text: 'flirting with games'},// 8  ← tambah ini
];

function setMoodByHour() {
  const hour = new Date().getHours();
  const idx  = hour % moods.length;
  const mood = moods[idx];
  const emojiEl = document.getElementById('moodEmoji'); // ← tambah ini
  const textEl  = document.getElementById('moodText');
  if (emojiEl) emojiEl.textContent = mood.emoji;
  if (textEl)  textEl.textContent  = mood.text;
}
setMoodByHour();

/* ── PIXEL GLITCH on title hover ── */
const title = document.querySelector('.site-title');
if (title) {
  const original = title.textContent;
  const glitchChars = '█▓▒░#@$%&!?*';

  title.addEventListener('mouseenter', () => {
    let iterations = 0;
    const interval = setInterval(() => {
      title.textContent = original
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iterations) return original[i];
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        })
        .join('');
      if (++iterations >= original.length) {
        clearInterval(interval);
        title.textContent = original;
      }
    }, 40);
  });
}

/* ── CARD PIXEL CLICK EFFECT ── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', function (e) {
    // skip if clicking a link
    if (e.target.closest('a') || e.target.closest('iframe')) return;
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:absolute;inset:0;background:rgba(255,255,255,0.08);
      pointer-events:none;z-index:10;
    `;
    this.style.position = 'relative';
    this.appendChild(flash);
    setTimeout(() => flash.remove(), 120);
  });
});

/* ── SOCIAL BUTTON PIXEL HOVER SOUND (visual feedback) ── */
document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'none';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'none';
  });
});

/* ── CONSOLE EASTER EGG ── */
console.log('%c ✦ MY SPACE ✦', 'font-family:monospace;font-size:20px;color:#ff00ff;font-weight:bold;');
console.log('%c welcome to my page! you found the console :)', 'font-family:monospace;color:#ffffff;');
console.log('%c made with ♥ · html css js · no frameworks', 'font-family:monospace;color:#888888;');

/* ── KONAMI CODE EASTER EGG ── */
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIdx = 0;

document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiCode[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiCode.length) {
      konamiIdx = 0;
      activateRainbow();
    }
  } else {
    konamiIdx = 0;
  }
});

function activateRainbow() {
  document.querySelectorAll('.card').forEach((card, i) => {
    setTimeout(() => {
      card.style.borderColor = `hsl(${i * 60},100%,60%)`;
      card.style.boxShadow   = `4px 4px 0 hsl(${i*60+30},100%,40%)`;
      setTimeout(() => {
        card.style.borderColor = '';
        card.style.boxShadow   = '';
      }, 3000);
    }, i * 80);
  });
  const msg = document.createElement('div');
  msg.textContent = '★ KONAMI CODE ACTIVATED ★';
  msg.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    font-family:'Press Start 2P',monospace;font-size:14px;
    color:#fff;background:#000;border:3px solid #ff00ff;
    padding:20px 28px;z-index:99999;
    box-shadow:6px 6px 0 #660066,0 0 30px rgba(255,0,255,0.5);
    text-align:center;letter-spacing:0.1em;
  `;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}
