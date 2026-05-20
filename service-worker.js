const CACHE='edukacja-bez-granic-v10';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/logo.png?v=4','./assets/icon-192.png?v=10','./assets/icon-512.png?v=10'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
