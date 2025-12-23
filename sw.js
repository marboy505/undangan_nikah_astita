const CACHE_NAME = 'wedding-invite-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/IMG_3415.JPG',
  '/images/IMG_3416.JPG',
  '/images/IMG_3420.JPG',
  '/images/IMG_3423.JPG',
  '/images/IMG_3426.JPG',
  '/images/IMG_3428.JPG',
  '/images/IMG_3432.JPG',
  '/images/IMG_3433.JPG',
  '/images/IMG_3434(1).JPG',
  '/images/IMG_3438.JPG',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available, otherwise fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});