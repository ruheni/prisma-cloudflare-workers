import { PrismaClient } from "@prisma/client"
import { Router } from "itty-router"

const router = Router()
const prisma = new PrismaClient()

const headers = {
  "Content-Type": "application/json"
}

router.get("/quotes", async () => {
  const results = await prisma.quote.findMany()
  return new Response(JSON.stringify(results, null, 2), {
    headers
  })
})

router.get("/quotes/:id", async ({ params }) => {
  // @ts-ignore
  const { id } = params

  const result = await prisma.quote.findUnique({
    where: {
      id
    }
  })

  return new Response(JSON.stringify(result), {
    headers
  })
})

router.post("/quotes", async (request: Request) => {
  // @ts-ignore
  const { content, author } = await request.json()

  const result = await prisma.quote.create({
    data: {
      content,
      author
    }
  })

  return new Response(JSON.stringify(result, null, 2), {
    headers
  })
})

/** handle 404 results */
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)