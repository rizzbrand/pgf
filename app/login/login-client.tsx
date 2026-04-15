'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'

type Mode = 'signin' | 'signup'

export function LoginClient() {
  const router = useRouter()
  const sp = useSearchParams()

  const next = useMemo(() => sp.get('next') || '/admin', [sp])

  const [mode, setMode] = useState<Mode>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-10">
        <div className="flex items-center justify-between">
          <SiteLogo href="/" />
          <Button size="sm" variant="outline" className="rounded-full" asChild>
            <Link href="/">Back to site</Link>
          </Button>
        </div>

        <div className="mt-10 surface hairline rounded-3xl p-7 md:p-8">
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Privilege Girls Foundation
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">
            {mode === 'signin' ? 'Admin sign in' : 'Create an account'}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {mode === 'signin'
              ? 'Sign in to access the admin dashboard.'
              : 'Create an account to continue. Admin access is limited to approved emails.'}
          </p>

          <form
            className="mt-7 grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setSubmitting(true)
              setError(null)

              try {
                if (mode === 'signup') {
                  const { error: signUpError } = await authClient.signUp.email({
                    name,
                    email,
                    password,
                    callbackURL: next,
                  })
                  if (signUpError) throw signUpError
                } else {
                  const { error: signInError } = await authClient.signIn.email({
                    email,
                    password,
                    callbackURL: next,
                    rememberMe: true,
                  })
                  if (signInError) throw signInError
                }

                router.push(next)
              } catch (err) {
                const message =
                  err && typeof err === 'object' && 'message' in err
                    ? String((err as { message?: unknown }).message || 'Sign in failed')
                    : 'Sign in failed'
                setError(message)
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {mode === 'signup' ? (
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </div>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@privilegegirlsfoundation.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  minLength={8}
                  required
                  className="pr-12"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
            </div>

            <Button type="submit" className="rounded-full" disabled={submitting}>
              {submitting
                ? mode === 'signin'
                  ? 'Signing in…'
                  : 'Creating account…'
                : mode === 'signin'
                  ? 'Sign in'
                  : 'Create account'}
            </Button>

            {error ? (
              <p className="text-sm text-destructive">{error}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {mode === 'signin' ? (
                  <>
                    Need an account?{' '}
                    <button
                      type="button"
                      className="underline underline-offset-4 hover:text-foreground"
                      onClick={() => setMode('signup')}
                    >
                      Create one
                    </button>
                    .
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="underline underline-offset-4 hover:text-foreground"
                      onClick={() => setMode('signin')}
                    >
                      Sign in
                    </button>
                    .
                  </>
                )}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

