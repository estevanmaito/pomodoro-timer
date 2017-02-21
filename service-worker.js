/* eslint-disable no-undef */

// cache on install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pomodoro-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/src/assets/audio/beep.mp3',
        '/src/assets/css/style.css',
        '/src/assets/font/fontello.woff2',
        '/favicon.png',
        '/dist/build.js'
      ]);
    })
  );
});

// cache, falling back to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
