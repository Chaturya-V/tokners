'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "4a537919ae846f08db20ba27dff4142c",
"assets/AssetManifest.json": "e108b735d0d54dc84bfe095b5a164d6a",
"assets/assets/fonts/GOTHIC.TTF": "8917856b57da55472606a59f43b41588",
"assets/assets/images/app_logo.svg": "650894c3f1cb0fa88b037bb78e1cc1f6",
"assets/assets/images/background/desktop_bg.png": "0a29aa886b789cc331d1174c46376f0c",
"assets/assets/images/background/desktop_footer_bg.png": "f95688150691ffbe5fe2a922cf39f16d",
"assets/assets/images/background/desktop_presale_bg.png": "2e4fdd8d3672bbd9a5986f26b842bc3d",
"assets/assets/images/background/mobile_bg.png": "a9ee7e355511cd61519cec601acf79c9",
"assets/assets/images/background/mobile_presale_bg.png": "908cc747a880221db6de69e0dad72bd8",
"assets/assets/images/contact_us.png": "46dc16f0ad2a1078347c77dfc580fee1",
"assets/assets/images/desktop_arc.png": "fc631452c77b53d1414d2faff44aa11e",
"assets/assets/images/deskto_cover_image.png": "d45340cdfba4a6ff0a81fbdfe83ce0de",
"assets/assets/images/ic_crown.png": "2496b44397e3b72ff2ad212904d9daef",
"assets/assets/images/ic_star.png": "d211468d0a228d9bf699215ec82b5972",
"assets/assets/images/img_vector.png": "ae2eb6012609db824ac9261b6f94fb4e",
"assets/assets/images/mobile_arc.png": "38f2ad843fae725d00b31ea8519a9db9",
"assets/assets/images/mobile_cover_image.png": "fbcbcec22429f4834cf8172404c91437",
"assets/assets/images/our_team_card_bg.png": "32d66c086cfd95e28e740007253bf228",
"assets/assets/images/phase_one.png": "82dbfff7075118c2882508322da98cda",
"assets/assets/images/phase_three.png": "4ca4b14e0646c839ed7218336e531338",
"assets/assets/images/phase_two.png": "f229fc4754565fbe159f9cf1e371853b",
"assets/assets/images/presale_vector_bottom.png": "659f54791e1b0245a17171524911206d",
"assets/assets/images/presale_vector_top.png": "c5ab9d16eef6ca2c77fb3859fb50ea29",
"assets/assets/images/profile_1.png": "e7014ef3cd842810b08b760ed85dd594",
"assets/assets/images/profile_2.png": "283ae4d675415db25dcafcbe547cab4c",
"assets/assets/images/profile_3.png": "630abc15384d858c39e94daa7b493569",
"assets/assets/images/profile_4.png": "2c9c0fd3a855e970875777375a33f496",
"assets/assets/images/token_distribution.png": "90dd5a98d690fe199ed61973070bdeb3",
"assets/assets/images/token_distribution_blur.png": "30cb8696e6c90934118f07a0a6252388",
"assets/assets/images/tokner_coming.png": "bae9c68d7349c39a84cce8480814bff1",
"assets/assets/images/tokner_logo.svg": "8c9cc7e8122ca002158664f035955463",
"assets/FontManifest.json": "37b5105992110758df673815cf4c84ae",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "b959c3aea89950874d2e9583ca9b2193",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "10f588143d2256c095e76f8370a773df",
"/": "10f588143d2256c095e76f8370a773df",
"main.dart.js": "b3b4f529638467ceb5da080805c3d27c",
"manifest.json": "8bc132f6d047a6ac1666428033e90bc7",
"version.json": "8ec59e8a181ca2c2208e0106c4d76b8e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
