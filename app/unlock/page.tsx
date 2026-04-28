'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function UnlockClient() {
  const router = useRouter()
  const sp = useSearchParams()

  const next = useMemo(() => sp.get('next') || '/', [sp])

  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <SiteLogo href="/" />
          <Button size="sm" variant="outline" className="rounded-full" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>

        <div className="mt-10 surface hairline rounded-3xl p-7 md:p-8">
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Privilege Girls Foundation
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">Site locked</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter the access password to view this site.
          </p>

          <form
            className="mt-7 grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setSubmitting(true)
              setError(null)

              try {
                const res = await fetch('/api/unlock', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({ password, next }),
                })
                const data = (await res.json()) as { ok?: boolean; error?: string; next?: string }
                if (!res.ok || !data.ok) {
                  throw new Error(data.error || 'Unlock failed')
                }
                router.push(data.next || next)
              } catch (err) {
                setError(
                  err && typeof err === 'object' && 'message' in err
                    ? String((err as { message?: unknown }).message || 'Unlock failed')
                    : 'Unlock failed',
                )
              } finally {
                setSubmitting(false)
              }
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="site-password">Password</Label>
              <Input
                id="site-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
            </div>

            <Button type="submit" className="rounded-full" disabled={submitting}>
              {submitting ? 'Unlocking…' : 'Unlock'}
            </Button>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default function UnlockPage() {
  return (
    <Suspense>
      <UnlockClient />
    </Suspense>
  )
}

