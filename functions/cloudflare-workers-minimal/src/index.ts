import { Router } from 'itty-router'
import { XataClient } from './xata'

declare global {
  const API_KEY: string
}

const router = Router()
const xata = new XataClient({
  branch: 'main',
  apiKey: API_KEY,
})

router.get('/:slug', async ({ params }) => {
  const element = await xata.db.urls.filter('slug', params?.slug).getOne()

  if (element?.destination) return Response.redirect(element.destination, 301)
  else {
    return buildResponse(
      { error: `Short url ${params?.slug} does not exist` },
      404,
    )
  }
})

router.get('/', async ({ url }, { headers }) => {
  const { searchParams } = new URL(url)

  const destination = searchParams.get('to')
  const alias = searchParams.get('as')

  const slug = alias ?? randomSlug()
  if (!destination) return buildResponse({ error: 'Missing to parameter' }, 400)

  const existingAlias = await xata.db.urls.filter('slug', slug).getOne()

  if (existingAlias && existingAlias.destination === destination) {
    return buildResponse(
      { data: `https://shortener.sfera-xata.workers.dev/${slug}` },
      200,
    )
  } else if (existingAlias && existingAlias.slug === alias) {
    return buildResponse(
      {
        error: `Slug ${slug} is already taken by ${existingAlias.destination}`,
      },
      400,
    )
  } else if (existingAlias) {
    return buildResponse(
      {
        error: `Unable to build a slug due to collision. Please contact an administrator.`,
      },
      400,
    )
  }

  if (!isValidUrl(destination)) {
    return buildResponse({ error: 'Invalid url in to parameter' }, 400)
  }

  const ownerIp = headers.get('x-forwarded-for') || headers.get('x-real-ip')
  const userAliases = await xata.db.urls.filter('ownerIp', ownerIp).getMany()

  if (userAliases.length >= 100) {
    return buildResponse(
      { error: `You have reached the limit of 100 aliases` },
      400,
    )
  }

  const redirect = await xata.db.urls.create({
    destination,
    slug,
    ownerIp,
  })

  return buildResponse(
    { data: `https://shortener.sfera-xata.workers.dev/${redirect.slug}` },
    201,
  )
})

router.all('*', () => buildResponse({ error: 'Route not found' }, 404))

addEventListener('fetch', (event) => {
  event.respondWith(
    router.handle(event.request, { headers: event.request.headers }),
  )
})

function isValidUrl(url: string): boolean {
  try {
    const urlWithProtocol = /^(https?):\/\//.test(url) ? url : `https://${url}`
    new URL(urlWithProtocol)

    return true
  } catch (e) {
    return false
  }
}

function randomSlug(): string {
  return Math.random().toString(36).substring(2, 6)
}

function buildResponse(
  response: { error: string } | { data: string },
  status: number,
): Response {
  return new Response(JSON.stringify(response), { status })
}
