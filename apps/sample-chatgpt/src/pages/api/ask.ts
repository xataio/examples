import { AskResult } from '@xata.io/client'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getDatabases } from '~/xata'

export const config = {
  runtime: 'edge',
}

const bodySchema = z.object({
  database: z.string(),
  question: z.string(),
})

const handler = async (req: NextRequest): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
    })
  }

  const body = bodySchema.safeParse(await req.json())
  if (!body.success) {
    return new Response(JSON.stringify({ message: 'Invalid body' }), {
      status: 400,
    })
  }

  const encoder = new TextEncoder()
  const variant = getDatabases().find((db) => db.id === body.data.database)
  if (!variant) {
    return new Response(JSON.stringify({ message: 'Invalid database' }), {
      status: 400,
    })
  }

  const { client: xata, lookupTable, options } = variant
  const stream = new ReadableStream({
    async start(controller) {
      xata.db[lookupTable].ask(body.data.question, {
        ...options,
        onMessage: (message: AskResult) => {
          controller.enqueue(encoder.encode(`event: message\n`))
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(message)}\n\n`)
          )
        },
      })
    },
  })

  return new Response(stream, {
    headers: {
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream;charset=utf-8',
    },
  })
}

export default handler
