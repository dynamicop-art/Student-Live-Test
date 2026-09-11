const CACHE='arpan-learning-suite-v6-shell';
const CORE=['./','./index.html','./student.html','./admin.html','./teacher_dashboard.html','./style.css','./effects.js','./config.js','./manifest.webmanifest','./app-icon-192.png','./app-icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    const cleanRequest=new Request(url.origin+url.pathname,{method:'GET',headers:req.headers,credentials:'same-origin'});
    event.respondWith(fetch(req).then(res=>{if(!url.search){const copy=res.clone();caches.open(CACHE).then(c=>c.put(cleanRequest,copy));}return res;}).catch(()=>caches.match(cleanRequest).then(r=>r||caches.match('./index.html'))));return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}return res;})));
});
