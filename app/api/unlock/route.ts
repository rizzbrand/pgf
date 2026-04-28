import { NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'

const COOKIE_NAME = 'pgf_site_unlock'

function getRequiredPassword() {
  return (process.env.SITE_PASSWORD || '').trim()
}

function getSignerSecret() {
  // Reuse Better Auth secret if available, else fall back to any other app secret.
  return (
    (process.env.BETTER_AUTH_SECRET || '').trim() ||
    (process.env.AUTH_SECRET || '').trim() ||
    'pgf-site-lock'
  )
}

function sign(value: string) {
  const h = crypto.createHmac('sha256', getSignerSecret()).update(value).digest('base64url')
  return `${value}.${h}`
}

export async function POST(req: Request) {
  const required = getRequiredPassword()
  if (!required) {
    // If SITE_PASSWORD isn't set, site lock is disabled.
    return NextResponse.json({ ok: true, disabled: true })
  }

  let body: { password?: string; next?: string }
  try {
    body = (await req.json()) as { password?: string; next?: string }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const password = String(body.password || '').trim()
  const next = typeof body.next === 'string' ? body.next : '/'

  if (!password || password !== required) {
    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true, next })
  res.cookies.set({
    name: COOKIE_NAME,
    value: sign('unlocked'),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}

