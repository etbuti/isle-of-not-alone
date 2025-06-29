const CACHE_NAME = 'goldisle-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/budcup2025.html',
  '/budcup2025-cn.html',
  '/music.html',
  '/trade.html',
  // 如果你还有其他页面或资源文件，如 CSS、图片等，也可以在这里继续添加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
