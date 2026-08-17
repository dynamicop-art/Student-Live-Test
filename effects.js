// Small shared visual-polish helpers: floating background blobs, confetti burst,
// tiny synth sound effects (Web Audio, no audio files) and toast notifications.
// Pure client-side decoration — no data, no network calls, safe to include anywhere.

export function mountBlobs(){
  if(document.querySelector(".blob-bg"))return;
  const d=document.createElement("div");
  d.className="blob-bg";
  d.innerHTML=`<div class="blob blob1"></div><div class="blob blob2"></div><div class="blob blob3"></div><div class="blob blob4"></div>`;
  document.body.prepend(d);
}

export function confettiBurst(count=90){
  const colors=["#1d4ed8","#4f46e5","#c8960c","#7c3aed","#16a34a","#f3d477"];
  const layer=document.createElement("div");
  layer.className="confetti-layer";
  document.body.appendChild(layer);
  for(let i=0;i<count;i++){
    const p=document.createElement("div");
    p.className="confetti-piece";
    const size=6+Math.random()*7;
    p.style.left=Math.random()*100+"vw";
    p.style.width=size+"px";
    p.style.height=size*0.4+"px";
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    const duration=2.2+Math.random()*1.6;
    const delay=Math.random()*0.5;
    p.style.animationDuration=duration+"s";
    p.style.animationDelay=delay+"s";
    layer.appendChild(p);
  }
  setTimeout(()=>layer.remove(),4200);
}

/* ---------- SOUND (tiny synth chimes, no external audio files) ---------- */
function soundOn(){try{return localStorage.getItem("sound")!=="off";}catch(e){return true;}}
export function isSoundOn(){return soundOn();}
export function setSoundOn(on){try{localStorage.setItem("sound",on?"on":"off");}catch(e){}}

let _actx=null;
function ctx(){
  if(!soundOn())return null;
  try{_actx=_actx||new (window.AudioContext||window.webkitAudioContext)();if(_actx.state==="suspended")_actx.resume();return _actx;}
  catch(e){return null;}
}
function tone(freq,start,dur,type="sine",gainPeak=0.16){
  const c=ctx();if(!c)return;
  const osc=c.createOscillator(),gain=c.createGain();
  osc.type=type;osc.frequency.value=freq;
  osc.connect(gain);gain.connect(c.destination);
  const t0=c.currentTime+start;
  gain.gain.setValueAtTime(0,t0);
  gain.gain.linearRampToValueAtTime(gainPeak,t0+0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  osc.start(t0);osc.stop(t0+dur+0.02);
}
// kind: "success" | "perfect" | "click" | "notify" | "timer"
export function playChime(kind="success"){
  if(!soundOn())return;
  if(kind==="perfect"){tone(523.25,0,.16,"triangle");tone(659.25,.13,.16,"triangle");tone(783.99,.26,.28,"triangle");}
  else if(kind==="success"){tone(587.33,0,.14,"sine");tone(880,.11,.22,"sine");}
  else if(kind==="click"){tone(660,0,.06,"square",.08);}
  else if(kind==="notify"){tone(740,0,.1,"sine",.12);tone(988,.09,.14,"sine",.1);}
  else if(kind==="timer"){tone(440,0,.18,"triangle");tone(440,.22,.18,"triangle");tone(440,.44,.3,"triangle");}
}

/* ---------- TOASTS ---------- */
export function toast(message,icon="✅"){
  let layer=document.querySelector(".toast-layer");
  if(!layer){layer=document.createElement("div");layer.className="toast-layer";document.body.appendChild(layer);}
  const t=document.createElement("div");
  t.className="toast";
  t.innerHTML=`<span>${icon}</span><span>${message}</span>`;
  layer.appendChild(t);
  setTimeout(()=>t.remove(),2800);
}
