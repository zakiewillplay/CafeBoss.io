const CACHE_NAME = 'cafeboss-v1';
const urlsToCache = [
  '/CafeBoss.io/index.html',
  '/CafeBoss.io/auth.html',
  '/CafeBoss.io/dashboard.html',
  '/CafeBoss.io/menu.html',
  '/CafeBoss.io/admin.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});