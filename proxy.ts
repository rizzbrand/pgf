import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'node:crypto'

import { getAuth } from '@/lib/auth'

const UNLOCK_COOKIE = 'pgf_site_unlock'

function isLikelyAssetPath(pathname: string) {
  return (
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/manifesto.pdf' ||
    pathname === '/icon' ||
    /\.[a-z0-9]+$/i.test(pathname)
  )
}

function getSignerSecret() {
  return (
    (process.env.BETTER_AUTH_SECRET || '').trim() ||
    (process.env.AUTH_SECRET || '').trim() ||
    'pgf-site-lock'
  )
}

function verifySignedCookie(value: string) {
  const [payload, sig] = value.split('.')
  if (!payload || !sig) return false
  const expected = crypto.createHmac('sha256', getSignerSecret()).update(payload).digest('base64url')
  try {
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Public routes needed to unlock.
  if (pathname === '/unlock' || pathname.startsWith('/api/unlock')) return NextResponse.next()

  // If SITE_PASSWORD is set, require unlock cookie for all non-asset routes.
  const sitePassword = (process.env.SITE_PASSWORD || '').trim()
  if (sitePassword && !isLikelyAssetPath(pathname)) {
    const cookie = request.cookies.get(UNLOCK_COOKIE)?.value
    const ok = cookie ? verifySignedCookie(cookie) : false
    if (!ok) {
      const url = request.nextUrl.clone()
      url.pathname = '/unlock'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const session = await getAuth().api.getSession({
    headers: request.headers,
  })

  if (!session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  const role = (session.user as unknown as { role?: string }).role
  if (role !== 'admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}

