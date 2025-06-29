self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open('static-v1').then(cache =>
      cache.addAll([
        '/',                   // 首页
        '/index.html',         // 入口文件
        '/manifest.json',      // manifest
        '/icons/icon-192.png', // 小图标
        '/icons/icon-512.png', // 大图标
        // 如果有CSS或JS文件也可以加上，比如：
        // '/styles.css',
        // '/app.js',
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  // 清理旧缓存（可选）
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== 'static-v1').map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
