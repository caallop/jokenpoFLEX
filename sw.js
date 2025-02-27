/**
 * Service Worker JoKenPo
 * @author Guilherme Rosa, Vitor de Assis, Wellington R Cruz.
 */

//=========================================================
// Registro do Service Worker
// Se o navegador de internet suportar este recurso
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log("Service Worker registrado!")
        })
}

//=========================================================


// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('./jokenpoflex/')
                cache.add('./jokenpoflex/index.html')
                cache.add('./jokenpoflex/style.css')
                cache.add('./jokenpoflex/app.js')
                cache.add('./jokenpoflex/img/papel.png')
                cache.add('./jokenpoflex/img/pc.png')
                cache.add('./jokenpoflex/img/pcpapel.png')
                cache.add('./jokenpoflex/img/pcpedra.png')
                cache.add('./jokenpoflex/img/pctesoura.png')
                cache.add('./jokenpoflex/img/pedra.png')
                cache.add('./jokenpoflex/img/tesoura.png')
                cache.add('./jokenpoflex/img/bgyll.jpg')
            })
    )
})

// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker...", event)
    return self.clients.claim()
})


// Interceptação (solicitações https e servindo em cache quanto off-line)

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request)
            })
    )
})