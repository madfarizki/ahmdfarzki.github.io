importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
const CACHE_NAME = "news-v7";
var base_url = "https://api.football-data.org/";

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/pages/next.html', revision: '1' },
  { url: '/pages/result.html', revision: '1' },
  { url: '/pages/information.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: '/favicon.ico', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/favorit.html', revision: '1' },
]);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp(base_url + "v2/competitions/2003/matches"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp(base_url + "v2/competitions/2003/teams"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp(base_url + "v2/teams/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp("https://fonts.googleapis.com/icon?family=Material+Icons"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.staleWhileRevalidate()
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});