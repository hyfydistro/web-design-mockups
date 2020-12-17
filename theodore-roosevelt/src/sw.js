const cacheName = "v1";

const cacheAssets = [
  "index.html",
  "style.css",
  "script.js",
  "fonts/century-gothic/GOTHIC.TTF",
  "fonts/garamond/GARA.TTF",
  "fonts/garamond/GARABD.TTF",
  "fonts/garamond/GARAIT.TTF",
  "images/hero-sml-600w.png",
  "images/tr-age11-paris-209w.jpg",
  "images/Birthplace-from-west-sml-600w.jpg",
  "images/roosevelt-reading-sml-600w.jpg",
  "images/rough-riders-sml-600w.jpg",
  "images/spanish-vs-americans-sml-600w.jpg",
  "images/tr-and-taft-sml-600w.jpg",
  "images/tr-at-chicago-sml-600w.jpg",
  "images/tr-avid-boxer-at-harvard-sml-600w.jpg",
  "images/tr-horse-sml-600w.jpg",
  "images/tr-medical-xray-sml-600w.jpg",
  "images/tr-mother-and-first-wife-sml-600w.jpg",
  "images/tr-new-family-sml-600w.jpg",
  "images/tr-safari-sml-600w.jpg",
  "images/tr-sherif-sml-600w.jpg",
  "images/tr-tomb-sml-600w.jpg",
  "images/tr-writings-sml-600w.jpg",
  "images/white-house-portrait-sml-600w.jpg"
];

// Call Install Event
self.addEventListener("install", (e) => {

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
// Where you clean up any old cache
self.addEventListener("activate", (e) => {
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  // Check whether the live set is available, and
  // if not, use the cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
