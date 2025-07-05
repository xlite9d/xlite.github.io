const cacheName = 'LVcog-v1';
const filesToCache = [
  '/js/sw.js'
];

// Install: Cache essential files
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate worker immediately
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Activate: Clean up old caches (optional but smart)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== cacheName) return caches.delete(key);
      }))
    )
  );
  self.clients.claim(); // Take control of uncontrolled clients
});

// Fetch: Fast cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
