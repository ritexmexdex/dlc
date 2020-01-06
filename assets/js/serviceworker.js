;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_dlc',
  urlsToCache = [
    		'assets/js/sw.js',
			'assets/css/main.css',
			'assets/js/jquery.min.js',
			'assets/js/jquery.dropotron.min.js',
			'assets/js/jquery.scrolly.min.js',
			'assets/js/jquery.scrollex.min.js',
			'assets/js/browser.min.js',
			'assets/js/breakpoints.min.js',
			'assets/js/util.js',
			'assets/js/main.js',
    		'images/dlc.png',
			'code/highcharts.js',
        	'code/modules/data.js',
        	'code/modules/drilldown.js',
    		'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {e.waitUntil(caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting())
      }).catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})