const cacheName = "v1";

const cacheAssets = [
  "introducing-json.html",
  "affiliated-technologies.html",
  "grammar.html",
  "script.js",
  "css/main.css",
  "css/_typography.css",
  "css/_space.css",
  "css/_color.css",
  "css/affiliated-technologies.css",
  "css/grammar.css",
  "img/favicon.ico",
  "img/logo-icon-sml-36wx36h.png",
  "img/array-sml-600w.png",
  "img/number-sml-600w.png",
  "img/object-sml-600w.png",
  "img/string-sml-600w.png",
  "img/value-sml-600w.png",
  "img/whitespace-sml-600w.png",
  "img/book-poster.png",
  "img/json-article.png",
  "img/json-conference.jpg",
  "img/json-logo.jpg",
  "img/language-icon3-150w.png",
  "img/back-to-top-icon-58wx58h.png",
];

// Call Install Event
self.addEventListener("install", (e) => {
  // * console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        // * console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
// Where you clean up any old cache
self.addEventListener("activate", (e) => {
  // * console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            // * console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
  // * console.log("Service Worker: Fetching");
  // * console.log(e.request.url);
  // Check whether the live set is available, and
  // if not, use the cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
