//app shell => all that is needed for the application in order to work(need for quick loading)
// save app shell in cache storage

//const CACHE_NAME = 'cache-1';

const CACHE_STATIC_NAME='static-v2';
const CACHE_DYNAMIC_NAME='dynamic-v1';
const CACHE_INMUTABLE_NAME='inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 25;



function cleanCache(cacheName, numItems){

    caches.open(cacheName)
            .then( cache => {
                //to get a records of all items in the cache
              return  cache.keys()
                    .then( keys => {
                       if(keys.length > numItems){
                        cache.delete(keys[0])
                            .then( cleanCache (cacheName, numItems));
                       }
                    });
            });
}

self.addEventListener('install', event => {
    
    //open cache
    const cachePromise = caches.open(CACHE_STATIC_NAME)
    .then( cache => {

       return cache.addAll([

            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg', 
            '/img/no-img.jpg',
            '/js/app.js'

        ]);
    });

    const cacheInmutable =  caches.open(CACHE_INMUTABLE_NAME)
                            .then( cache => {
                                return cache.addAll([
                                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
                                ]);

                            });


    // wait until the promise is resolved in full
    event.waitUntil(Promise.all([cachePromise, cacheInmutable]));

})

//implementing caching strategies
self.addEventListener('fetch', event => {

    //! 5- Strategy: "Cache & network race"
    // to see which responds faster: the cache or the network
    const cacheAndNetworkRace = new Promise((resolve, reject)=> {
        let rejectP = false;

        const failedOnce = () => {
            
            if(rejectP){
                if( /\.(png|jpg)$/i.test(event.request.url)){
                    resolve(caches.match('/img/no-img.jpg'))
                }else{
                    
                    reject('Response not founded');
                }
            }else{

                rejectP = true;
            }
        };

        //network
        fetch(event.request).then( res => {

          (res.ok) ? resolve(res) : failedOnce();

        }).catch( failedOnce);

        //caches
        caches.match(event.request)
                    .then( res => {
                        res ? resolve(res) : failedOnce();
                    }).catch( failedOnce )
    })


    event.respondWith(cacheAndNetworkRace)
    //! 4- Strategy: "Cache with network update"
    //When performance is critical for the application to appear as fast as possible
    // when upgrades play a major role

    //to be able to read bootstrap
    // if(event.request.url.includes('bootstrap')){
    //     return event.respondWith(caches.match(event.request));
    // };
    // const cacheWithNetworkUpdate = caches.open(CACHE_STATIC_NAME)
    //                             .then(cache => {
    //                                 fetch(event.request)
    //                                     .then(newRes =>{
    //                                         // cache update to get the latest version:
    //                                         cache.put(event.request, newRes);
    //                                     })
    //                                     return cache.match(event.request);

    //                             })


    // event.respondWith(cacheWithNetworkUpdate);

    //! 3- Strategy: "Network with cache Fallback"
    //  it will always try to obtain the most current information from the Internet 
    // contra mobile:  making ever data consumption 
    // const networkWithCacheFallback = fetch(event.request)
    //     .then( res =>{
    //         if(!res) return caches.match(event.request);
    //       //  console.log('Response Fetch',  res);
    //         caches.open(CACHE_DYNAMIC_NAME)
    //             .then( cache => {
    //                 cache.put(event.request, res);
    //                 cleanCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
    //             })

    //         return res.clone()
    //     }).catch(err => {
    //         return caches.match(event.request);
    //     })



    // event.respondWith(networkWithCacheFallback);

    //! 2-Strategy: "Cache with Network Fallback  (then cache)"=> first try to find the files in the cache and if not found perform http request
    // const cachePromiseWitNetworkFallbackThenCache = caches.match(event.request)
    // .then( res => {
    //     if(res) return res;
    //     // if !res (if the resource does not exist in the cache)=> http request
    //     console.log('it does not exists', event.request.url);

    //     return fetch( event.request)

    //             .then(newRes => {
    //                 caches.open(CACHE_DYNAMIC_NAME)
    //                         .then( cache => {
    //                             cache.put(event.request, newRes);
    //                             cleanCache(CACHE_DYNAMIC_NAME, 25);
    //                         })
    //                 return newRes.clone();
    //             });
    // });

    // event.respondWith( cachePromiseWitNetworkFallbackThenCache); 
    

    //! 1- Strategy."Cache Only": The entire application is served from the cache. No https request
    //event.respondWith( caches.match(event.request));

});