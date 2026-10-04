const C = "get-moving-v1";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-180.png"]
  .concat(["01-katze-kuh","02-open-book","03-wandengel","04-y-t-raises","05-90-90","06-tiefe-hocke","07-dead-hang"]
  .flatMap(id => [1,2,3].map(n => `bilder/${id}-${n}.svg`)));
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
