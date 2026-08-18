/* ---------- Sound (WebAudio, no external files needed) ---------- */
let audioCtx = null;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
export function isSoundOn() {
  try { return localStorage.getItem("soundOn") !== "0"; } catch (e) { return true; }
}
export function setSoundOn(on) {
  try { localStorage.setItem("soundOn", on ? "1" : "0"); } catch (e) {}
}
function tone(freq, start, dur, type, gainPeak) {
  const c = ctx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, c.currentTime + start);
  gain.gain.linearRampToValueAtTime(gainPeak || 0.18, c.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  osc.connect(gain).connect(c.destination);
  osc.start(c.currentTime + start);
  osc.stop(c.currentTime + start + dur + 0.05);
}
export function playChime(kind) {
  if (!isSoundOn()) return;
  try {
    if (kind === "perfect") { tone(523, 0, .18, "triangle"); tone(659, .12, .18, "triangle"); tone(784, .24, .18, "triangle"); tone(1046, .36, .3, "triangle", .22); }
    else if (kind === "success") { tone(523, 0, .16, "sine"); tone(784, .1, .22, "sine", .2); }
    else if (kind === "click") { tone(600, 0, .06, "square", .08); }
    else if (kind === "wrong") { tone(220, 0, .18, "sawtooth", .12); tone(160, .1, .22, "sawtooth", .12); }
    else if (kind === "timer") { tone(880, 0, .12, "square", .15); tone(880, .18, .12, "square", .15); }
    else { tone(700, 0, .1, "sine", .12); }
  } catch (e) { /* audio may be blocked until a user gesture; fail silently */ }
}

/* ---------- Toast ---------- */
export function toast(message, icon) {
  let layer = document.querySelector(".toast-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "toast-layer";
    document.body.appendChild(layer);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = (icon ? icon + " " : "") + message;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

/* ---------- Confetti burst ---------- */
export function confettiBurst(count) {
  const n = count || 100;
  const layer = document.createElement("div");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:99998;overflow:hidden";
  document.body.appendChild(layer);
  const colors = ["#6d5cff", "#ff6bb3", "#ffb648", "#4ade80", "#38bdf8", "#f472b6"];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const left = Math.random() * 100;
    const dur = 2.2 + Math.random() * 1.6;
    const delay = Math.random() * 0.4;
    const rot = Math.random() * 720 - 360;
    const drift = (Math.random() * 160 - 80);
    p.style.cssText = `position:absolute;top:-5%;left:${left}%;width:${size}px;height:${size * 0.4}px;background:${colors[i % colors.length]};opacity:.95;border-radius:2px;transform:rotate(${Math.random() * 360}deg);animation:confettiFall ${dur}s cubic-bezier(.22,.6,.4,1) ${delay}s forwards;--rot:${rot}deg;--drift:${drift}px`;
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 4200);
}

/* ---------- Ambient background blobs ---------- */
export function mountBlobs() {
  if (document.querySelector(".blob-bg")) return;
  const bg = document.createElement("div");
  bg.className = "blob-bg";
  bg.innerHTML = `<div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>`;
  document.body.prepend(bg);
}

/* ---------- Hero sparkle accents ---------- */
export function mountHeroSparkle(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el || el.querySelector(".sparkle")) return;
  for (let i = 0; i < 3; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = "✨";
    s.style.cssText = `position:absolute;left:${10 + Math.random() * 80}%;top:${10 + Math.random() * 70}%;animation-delay:${Math.random() * 2}s`;
    el.appendChild(s);
  }
}
