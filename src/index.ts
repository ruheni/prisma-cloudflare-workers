addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(request) {
  return new Response(`An event was fired: ${request.method}`, {
    headers: { "content-type": "text/plain" },
  })
}