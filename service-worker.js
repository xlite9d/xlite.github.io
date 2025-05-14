self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('vplaza-cache').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/vplazax.png',
          '/vplazax.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });
  
