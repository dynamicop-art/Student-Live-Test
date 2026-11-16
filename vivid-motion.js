/* Decorative only. No data requests; navigation never waits for an animation. */
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const allowed=()=>!reduced.matches&&!document.body.classList.contains('calm-mode')&&!document.hidden;
 const layer=document.createElement('div');layer.className='ambient-learning';layer.setAttribute('aria-hidden','true');
 ['✦','π','◈','∑','✧','Aa'].forEach((symbol,i)=>{const span=document.createElement('span');span.className='ambient-symbol';span.textContent=symbol;span.style.setProperty('--left',`${8+i*17}%`);span.style.setProperty('--size',`${22+(i%3)*9}px`);span.style.setProperty('--duration',`${18+i*2}s`);span.style.setProperty('--delay',`${-i*4}s`);layer.append(span);});document.body.prepend(layer);
 const glow=document.createElement('div');glow.className='route-glow';glow.setAttribute('aria-hidden','true');document.body.append(glow);
 let running=[],blooms=[];
 function cancel(){running.forEach(a=>a.cancel());running=[];blooms.forEach(el=>el.remove());blooms=[];}
 function animate(el,frames,options){if(!el?.animate)return;const animation=el.animate(frames,options);running.push(animation);animation.finished.then(()=>{running=running.filter(a=>a!==animation);},()=>{});return animation;}
 function reveal(target){cancel();if(!allowed()||!target)return;animate(target,[{opacity:.35,transform:'translate3d(0,18px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:340,easing:'cubic-bezier(.2,.75,.25,1)'});animate(glow,[{opacity:0,transform:'scaleX(.05)'},{opacity:1,transform:'scaleX(.6)',offset:.45},{opacity:0,transform:'scaleX(1)'}],{duration:420,easing:'ease-out'});}
 document.addEventListener('learning:section',e=>reveal(document.getElementById(e.detail?.id)));
 document.addEventListener('pointerup',e=>{if(!allowed()||e.button!==0||!e.target.closest?.('button,a.btn'))return;const bloom=document.createElement('span');bloom.className='tap-bloom';bloom.setAttribute('aria-hidden','true');bloom.style.left=`${e.clientX}px`;bloom.style.top=`${e.clientY}px`;document.body.append(bloom);blooms.push(bloom);if(blooms.length>3)blooms.shift().remove();const animation=bloom.animate?.([{opacity:.55,transform:'scale(.25)'},{opacity:0,transform:'scale(1.5)'}],{duration:360,easing:'ease-out'});if(animation)animation.finished.then(()=>{bloom.remove();blooms=blooms.filter(b=>b!==bloom);},()=>bloom.remove());else bloom.remove();});
 function visibility(){document.body.classList.toggle('motion-paused',document.hidden);if(!allowed())cancel();}document.addEventListener('visibilitychange',visibility);
 reduced.addEventListener?.('change',()=>{if(reduced.matches)cancel();});
 new MutationObserver(()=>{if(document.body.classList.contains('calm-mode'))cancel();}).observe(document.body,{attributes:true,attributeFilter:['class']});
 visibility();reveal(document.querySelector('.hero.topbar')||document.querySelector('.hero')||document.querySelector('.lounge-wrap>header'));
})();
