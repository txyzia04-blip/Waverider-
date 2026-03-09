const CACHE = 'waverider-v1';
const ASSETS = [
  '/Waverider-/',
  '/Waverider-/index.html',
  '/Waverider-/manifest.json',
  '/Waverider-/icons/icon-192.png',
  '/Waverider-/icons/icon-512.png',
  '/Waverider-/icons/apple-touch-icon.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
