/**
 * Service worker
 * @author Vitor de Assis
 */

// Instalação (cache "armazenamento local")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('./jokenpo/')
                cache.add('./jokenpo/index.html')
                cache.add('./jokenpo/style.css')
                cache.add('./jokenpo/app.js')
                cache.add('./jokenpo/img/papel.png')
                cache.add('./jokenpo/img/pc.png')
                cache.add('./jokenpo/img/pcpapel.png')
                cache.add('./jokenpo/img/pcpedra.png')
                cache.add('./jokenpo/img/pctesoura.png')
                cache.add('./jokenpo/img/pedra.png')
                cache.add('./jokenpo/img/tesoura.png')
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