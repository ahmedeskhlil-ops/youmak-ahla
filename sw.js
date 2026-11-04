/* يومك حلو — Service Worker: كاش + إشعارات الخلفية (FCM) */
importScripts("config.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
const C = "yawmak-v3";
const ASSETS = ["./", "index.html", "style.css", "config.js", "app.js", "data.js", "platform.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
try {
  if (self.YH_CONFIG && String(self.YH_CONFIG.apiKey).indexOf("YOUR_") < 0) {
    firebase.initializeApp(self.YH_CONFIG);
    firebase.messaging().onBackgroundMessage(function (p) {
      const d = p.data || {};
      self.registration.showNotification(d.title || "يومك حلو", {
        body: d.body || "", icon: "icon-192.png", badge: "icon-192.png", dir: "rtl", lang: "ar", data: { url: d.url || "./" }
      });
    });
  }
} catch (e) {}
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(ASSETS).catch(() => {}))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { const c = res.clone(); caches.open(C).then(x => x.put(r, c)); return res; })
    .catch(() => caches.match(r).then(m => m || caches.match("index.html"))));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    for (const c of l) { if ("focus" in c) return c.focus(); }
    return clients.openWindow((e.notification.data && e.notification.data.url) || "./");
  }));
});
