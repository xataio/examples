import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privateUrls = ['/in*']

const isPrivate = (url: string) => {
  return privateUrls.find((privateUrl) => {
    const matcher = new RegExp(`^${privateUrl}$`.replace('*$', '($|/)'))
    return url.match(matcher)
  })
}

export default withClerkMiddleware((req: NextRequest) => {
  const { userId } = getAuth(req)

  if (!userId && isPrivate(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    '/((?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
}
