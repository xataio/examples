addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(event) {
  let request = event.request
  const url = new URL(request.url)
  if (url.pathname === '/') {
    return showListing()
  }
  if (url.pathname === '/favicon.ico') {
    return new Response(null, { status: 404 })
  }

  const cache = caches.default
  // The domain below is not really important, but it needs to be something different
  // than the worker domain, otherwise the cache won't be used.
  const cacheKey = new Request(`https://short.xata.dev${url.pathname}`, {
    method: 'GET',
  })
  let response = await cache.match(cacheKey)
  if (!response) {
    console.log(`Cache miss for ${url.pathname}`)
    const record = await getOneFromXata('/tables/urls/query', {
      filter: {
        shortUrl: url.pathname,
      },
    })
    if (record === null) {
      return new Response(`Path [${url.pathname}] not found.`, {
        headers: { 'content-type': 'text/plain' },
      })
    } else {
      let response = new Response(null, { status: 302 })
      response.headers.append('Location', record.url)
      response.headers.append('Cache-Control', 's-maxage=3600')
      await cache.put(cacheKey, response.clone())
      return response
    }
  }
  console.log(`Cache hit for: ${url.pathname}.`)
  return response
}

async function showListing() {
  const records = await getFromXata('/tables/urls/query', null)
  let htmlList = `<ul>`
  for (const record of records) {
    htmlList += `
      <li><a href="${record.shortUrl}">${record.shortUrl}</a></li>
    `
  }
  htmlList += `</ul>`

  return new Response(`<html>${htmlList}</html>`, {
    headers: { 'content-type': 'text/html' },
  })
}

async function getOneFromXata(path, body) {
  const records = await getFromXata(path, body)
  return records.length > 0 ? records[0] : null
}

async function getFromXata(path, body) {
  const resp = await fetch(
    `https://demo-uni3q8.xata.sh/db/urlshortener:main${path}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${XATA_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )
  if (resp.status > 299) {
    throw new Error(`Error ${resp.status} ${await resp.text()}`)
  }
  const { records } = await resp.json()
  return records
}
