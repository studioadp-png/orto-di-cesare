const CACHE = 'orto-cesare-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './images/cicoria.jpg',
  './images/finocchi.jpg',
  './images/romanesco.jpg',
  './images/insalate.jpg',
  './images/patate.jpg',
  './images/pomodori.jpg',
  './images/zucchine.jpg',
  './images/mele.jpg',
  './images/cachi.jpg',
  './images/arance.jpg',
  './images/olio.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});