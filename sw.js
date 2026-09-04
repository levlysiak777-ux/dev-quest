/* =========================================================================
   Dev Quest — service worker
   Меняешь index.html — подними CACHE_VERSION, тогда старый кэш очистится.
   ========================================================================= */

const CACHE_VERSION = 'dev-quest-v1';

/* Всё, что нужно приложению для полной работы без интернета. */
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

/* --- Установка: складываем оболочку приложения в кэш --- */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // addAll падает целиком, если хоть один файл не найден — кладём поштучно
    await Promise.all(ASSETS.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[sw] не удалось закэшировать', url, err);
      }
    }));
    self.skipWaiting();
  })());
});

/* --- Активация: чистим кэши прошлых версий --- */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k === CACHE_VERSION ? null : caches.delete(k))));
    await self.clients.claim();
  })());
});

/* --- Запросы: сначала кэш, потом сеть; навигация всегда падает в index.html --- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // чужие домены не трогаем

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_VERSION);

    const cached = await cache.match(req, { ignoreSearch: true });
    if (cached) {
      // Обновляем копию в фоне, но отдаём мгновенно из кэша
      fetchAndPut(cache, req);
      return cached;
    }

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && fresh.type === 'basic') {
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // Сети нет: для перехода по страницам отдаём оболочку приложения
      if (req.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return new Response('Офлайн', {
        status: 503,
        statusText: 'Offline',
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});

/* Фоновое обновление кэша — молча, ошибки офлайна игнорируем */
function fetchAndPut(cache, req) {
  fetch(req).then((res) => {
    if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
  }).catch(() => {});
}

/* Позволяет странице попросить воркер активироваться немедленно */
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
