

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}





//DOCUMENTATION:
//cache storage => window object


    //if convalitation if cache storage can be used    
    // if(window.caches){
    //     //to create a cache & code to be able to interact with the cache
    //     caches.open('test-1').then( cache => {
    //         //to add multiple files => addAll
    //         cache.addAll([
    //             '/index.html', 
    //             '/css/style.css', 
    //             'img/main.jpg'
    //         ]).then(()=> {
    //             //to be able to delete a file after the promise has been resolved
    //             //cache.delete('/css/style.css');

    //             //to replace an existing file in the cache
    //             cache.put('/index.html', new Response('Hallo Welt!!!'));


    //         })
    //          //to be able to read a file from the cache
    //         //  cache.match('/index.html').then( res => {
    //         //     res.text().then(console.log);
    //         //  })
    //     });
    //     caches.open('test-2');

    //     // to check if a certain cache exists
    //     caches.has('test-2').then(console.log);

    //     // to delete a cache
    //     //caches.delete('test-2').then(console.log);


    //     // to obtain all the caches
    //     caches.keys().then( key => {
    //         console.log(key);
    //     })
    // }