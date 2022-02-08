import { Router } from "itty-router"
import quotes from '../data.json'

const router = Router()

const headers = {
  "Content-Type": "application/json"
}

router.get("/quotes", async () => {
  return new Response(JSON.stringify(quotes, null, 2), {
    headers
  })
})

router.get("/quotes/:id", async ({ params }) => {
  // @ts-ignore
  const { id } = params

  const result = quotes.filter(quote => quote.id === id)

  return new Response(JSON.stringify(result), {
    headers
  })
})

router.post("/quotes", async (request: Request) => {
  // @ts-ignore
  const { content, author } = await request.json()

  const result = { content, author }

  return new Response(JSON.stringify(result, null, 2), {
    headers
  })
})

/** handle 404 results */
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)