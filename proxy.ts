import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getAuth } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) return NextResponse.next()

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
  matcher: ['/admin/:path*'],
}

