//offline ways of working


self.addEventListener('fetch', event => {


    // const offlineResponse = new Response(`
        
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <title>My first PWA</title>
    //     </head>
    //     <body class="container p-3">
    //          <h1 class="mt-3">Welcome - (Offline Mode)</h1>
    //             <hr>

    //             <p>
    //                 PWAs are the next step in traditional web applications, they allow us to use our web application even if we have no connection to the server and even allow us to receive push notifications.
    //             </p>
    //             <p> Here you will learn how to create and transform your web applications into powerful PWAs.</p>
    //             <p>
    //                 They load extremely fast and do not need an internet connection to work.
    //             </p>


    //     </body>
    //     </html>
        
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/html'
    //         }
    //     })

    const offlineResponse = fetch('pages/offline.html');

    const res = fetch( event.request )
                .catch(()=>{
                    return offlineResponse;
                });

    event.respondWith(res);
});

