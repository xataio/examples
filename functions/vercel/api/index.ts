import type { VercelRequest, VercelResponse } from '@vercel/node'

const XATAFLY =
  '<svg viewBox="0 0 505 419" focusable="false" aria-label="Xata"><path d="M394.8 418.4c29-29 48.4-65 54-100.5 5.5-35.4-3.3-67.2-24.4-88.4L315 338.5l79.7 79.9Z" fill="white"></path><path d="M109.2 419c-29-28.9-48.3-65-53.9-100.5-5.5-35.4 3.3-67.2 24.4-88.4L189 339 109.2 419Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M45.5 109.8c0 41 16.4 80.1 45.4 109l109.2 109a154.3 154.3 0 0 0-.3-218.2L90.6.6a154.3 154.3 0 0 0-45 109.2Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M458.6 109.2c0 40.9-16.4 80.1-45.4 109L304 327.2a154.3 154.3 0 0 1 .3-218.2L413.5 0c28.9 29 45.1 68.2 45 109.2Z" fill="white"></path></svg>'

export default async function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  response.send(
    `<body style="background-color: black; color: white; font-family: sans-serif; height: 100vh; width: 100%; overflow:hidden; display: grid; place-items: center;">
    <div>
        <h1 style="font-size: 3rem">${XATAFLY}</h1>
        <div style="font-size: 2rem;">
        <strong>check the</strong> <a style="color: #ff0075" rel="noopener noreferrer" href="https://github.com/xataio/examples/tree/main/functions/vercel-functions">documentation</a>
        </div>
    </div>
    </body>`
  )

  return
}
