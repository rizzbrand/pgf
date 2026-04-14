'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, FileText } from 'lucide-react'

import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type Track = 'Hairdressing' | 'Fashion' | 'Not sure'

function getTrackFromSearch(): Track {
  if (typeof window === 'undefined') return 'Not sure'
  const t = new URLSearchParams(window.location.search).get('track')?.toLowerCase()
  if (t === 'hair' || t === 'hairdressing') return 'Hairdressing'
  if (t === 'fashion') return 'Fashion'
  return 'Not sure'
}

export default function ApplyPage() {
  const navItems = useMemo(
    () => [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/#programs', label: 'Programs' },
      { href: '/#impact', label: 'Impact' },
      { href: '/donate', label: 'Donate' },
      { href: '/contact', label: 'Contact' },
    ],
    [],
  )

  const [track, setTrack] = useState<Track>(() => getTrackFromSearch())
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <SiteLogo href="/" />
          <div className="hidden items-center gap-7 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.href === '/apply'
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground transition-colors hover:text-foreground'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button size="sm" variant="outline" className="rounded-full md:hidden" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Application
              </p>
              <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
                Apply to a PGF track.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Share a few details and we’ll follow up with next steps. If you’re not sure which
                track fits, choose “Not sure” — we’ll guide you.
              </p>
            </div>

            <div className="surface hairline rounded-3xl p-7 md:p-8">
              <div className="flex items-start gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <FileText className="size-5" aria-hidden />
                </div>
                <div>
                  <p className="font-semibold">What happens next</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    We review applications and respond by email. If selected, we’ll share timelines
                    and required documents.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                {[
                  'You’ll receive a confirmation email immediately.',
                  'We may request extra details to confirm eligibility.',
                  'If you have questions, use /contact.',
                ].map((x) => (
                  <div key={x} className="flex items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-3xl border border-border/70 bg-secondary/40 p-8 md:p-10">
              <h2 className="font-serif text-2xl font-semibold">Your details</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Fields marked required help us respond quickly.
              </p>

              <form
                className="mt-8 grid gap-5"
                onSubmit={async (e) => {
                  e.preventDefault()
                  setSent(false)
                  setError(null)
                  const form = e.currentTarget
                  const data = new FormData(form)

                  const payload = {
                    track,
                    name: String(data.get('name') || ''),
                    email: String(data.get('email') || ''),
                    phone: String(data.get('phone') || ''),
                    age: String(data.get('age') || ''),
                    location: String(data.get('location') || ''),
                    availability: String(data.get('availability') || ''),
                    experience: String(data.get('experience') || ''),
                    message: String(data.get('message') || ''),
                  }

                  try {
                    setSubmitting(true)
                    const res = await fetch('/api/apply-email', {
                      method: 'POST',
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(payload),
                    })

                    if (!res.ok) {
                      const j = (await res.json().catch(() => null)) as
                        | { error?: string; status?: number; details?: string }
                        | null
                      const details = j?.details ? ` ${j.details}` : ''
                      setError((j?.error || 'Application failed to send. Please try again.') + details)
                      return
                    }

                    form.reset()
                    setTrack('Not sure')
                    setSent(true)
                  } catch {
                    setError('Application failed to send. Please try again.')
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                <div className="grid gap-2">
                  <Label>Track</Label>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {(['Hairdressing', 'Fashion', 'Not sure'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTrack(t)}
                        className={
                          track === t
                            ? 'rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm font-medium ring-1 ring-accent/35'
                            : 'rounded-2xl border border-border/70 bg-card/60 px-4 py-3 text-sm text-muted-foreground hover:bg-card'
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="age">Age (optional)</Label>
                    <Input id="age" name="age" inputMode="numeric" placeholder="e.g. 24" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+233 …" autoComplete="tel" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location (optional)</Label>
                    <Input id="location" name="location" placeholder="e.g. Accra" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="availability">Availability (optional)</Label>
                    <Input id="availability" name="availability" placeholder="e.g. Available this month" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience / background (optional)</Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    placeholder="Tell us briefly about your experience and what you want to learn."
                    className="resize-y min-h-[110px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Anything else? (optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Optional note to the team."
                    className="resize-y min-h-[90px]"
                  />
                </div>

                <Button type="submit" className="rounded-full w-full sm:w-auto" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit application'}
                </Button>
                {sent ? (
                  <p className="text-sm text-foreground/70">
                    Application submitted. We’ve emailed you a confirmation.
                  </p>
                ) : null}
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
              </form>
            </div>

            <div className="surface hairline rounded-3xl p-8 md:p-10">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Tip</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">Questions before applying?</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                If you’re deciding between tracks, or want to discuss your situation, send a note to the team.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button className="rounded-full" asChild>
                  <Link href="/contact">Ask a question</Link>
                </Button>
                <Button variant="outline" className="rounded-full bg-transparent" asChild>
                  <Link href="/donate">Support the work</Link>
                </Button>
              </div>
              <div className="mt-8 border-t border-border/70 pt-6 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Eligibility note</p>
                <p className="mt-2 leading-relaxed">
                  PGF supports applicants based on programme fit and availability. If we need more information, we’ll reach out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter variant="simple" />
    </div>
  )
}

