const CACHE_NAME = 'Poertfolio';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
   'style2.css',
    'style3.css',
    'index.css',
    'manifest.json',
  'android-launchericon-512-512.png'  ,
  'android-launchericon-192-192.png'
];

// Install event: cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event: serve cached files if offline
self.addEventListener('fetch', event => {
    console.log("intercepted by the fetch :" , event.request.url)
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
