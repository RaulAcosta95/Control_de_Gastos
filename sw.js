const STATIC_CACHE_NAME = 'site-static-v2';
const DYNAMIC_CACHE_NAME = 'site-dynamic-v2';
//No hay Package.json
//El AUDIT REPORT LIGHTHOUSE no se realiza si hay algún error
const ASSETS = [//Los ASSETS son archivos en ruta para pre-cargar
    '/',
    '/js/app.js',
    '/css/global.css',
    '/fallback.html',
    '/images/404-Error-bro.svg',
    '/images/icons/icon-128x128.ico',
    '/images/icons/icon-144x144.png',
    '/index.html',
    '/js/components/AniadirNuevoGastoComponent.js',
    '/js/components/BotonNuevoGastoComponent.js',
    '/js/components/DetalleGastoComponent.js',
    '/js/components/GastoEnListaComponent.js',
    '/js/components/ListaGastosComponent.js',
    '/js/components/ModificarGastoComponent.js',
    '/js/modoOffline.js',
    '/manifest.json',
    '/package-lock.json',
    '/images/delete.png'
]


  // cache size limit function
  const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if(keys.length > size){
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
  };
  
  
  self.addEventListener('install', evt => {
    //console.log('service worker installed');
     evt.waitUntil(
       caches.open(STATIC_CACHE_NAME).then(cache=> {
         console.log('caching shell assets');
         cache.addAll(ASSETS);
       })
     );
   });
    
    // activate event
   self.addEventListener('activate', evt => {
     evt.waitUntil(
       caches.keys().then(keys=>{
         return Promise.all(keys
          .filter(key=> key !== STATIC_CACHE_NAME && key !==DYNAMIC_CACHE_NAME)
          .map(key => caches.delete(key))
          )
       })
     );
  
    });
    
    self.addEventListener('fetch', evt => {
        if(navigator.onLine) {
        } else {
            console.log('Offline');
            this.dispatchEvent( new CustomEvent('modoOffline', {
                bubbles: true,
                composed:true
            }));
            evt.respondWith(
              caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                  return caches.open(STATIC_CACHE_NAME).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    // check cached items size
                    limitCacheSize(STATIC_CACHE_NAME, 60);
                    return fetchRes;
                  })
                });
              }).catch(() => {
                if(evt.request.url.indexOf('.html') > -1){
                  return caches.match('fallback.html');
                } 
              })
            );
        }
    });