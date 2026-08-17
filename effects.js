// Small shared visual-polish helpers: floating background blobs + confetti burst.
// Pure decoration — no data, no network calls, safe to include anywhere.

export function mountBlobs(){
  if(document.querySelector(".blob-bg"))return;
  const d=document.createElement("div");
  d.className="blob-bg";
  d.innerHTML=`<div class="blob blob1"></div><div class="blob blob2"></div><div class="blob blob3"></div><div class="blob blob4"></div>`;
  document.body.prepend(d);
}

export function confettiBurst(count=90){
  const colors=["#7c3aed","#ec4899","#f59e0b","#06b6d4","#10b981","#fde68a"];
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
