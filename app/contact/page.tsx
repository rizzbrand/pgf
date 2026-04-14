'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const contactEmail = 'info@privilegegirlsfoundation.com'
const contactPhone = '+233 203 427 795'
const contactWhatsApp = '+233 203 427 795'
const contactLocation = 'North Legon, Accra, Ghana'

const topicOptions = [
  { value: 'general', label: 'General enquiry' },
  { value: 'programme', label: 'Programme application' },
  { value: 'partnership', label: 'Partnership / CSR' },
  { value: 'media', label: 'Media' },
  { value: 'other', label: 'Other' },
] as const

export default function ContactPage() {
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
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <SiteLogo href="/" />
          <div className="hidden items-center gap-6 text-sm lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.href === '/contact' ? 'page' : undefined}
                className={
                  item.href === '/contact'
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground transition-colors hover:text-foreground'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full px-5 hidden sm:inline-flex" asChild>
              <Link href="/donate">Donate</Link>
            </Button>
            <Button size="sm" variant="outline" className="rounded-full lg:hidden" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
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

          <p className="mt-8 text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Connect
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re applying to a programme, exploring a partnership, or asking a
            question — send us a note. We read every message and reply as soon as we can.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="flex flex-col gap-4">
            <div className="surface hairline rounded-2xl p-6">
              <MapPin className="mb-3 size-8 text-accent" aria-hidden />
              <h2 className="font-semibold">Visit & mail</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Privilege Girls Foundation
                <br />
                {contactLocation}
              </p>
            </div>
            <div className="surface hairline rounded-2xl p-6">
              <Mail className="mb-3 size-8 text-accent" aria-hidden />
              <h2 className="font-semibold">Email</h2>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-2 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>
            </div>
            <div className="surface hairline rounded-2xl p-6">
              <Phone className="mb-3 size-8 text-accent" aria-hidden />
              <h2 className="font-semibold">Phone / WhatsApp</h2>
              <div className="mt-2 grid gap-1.5 text-sm">
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {contactPhone}
                </a>
                <div className="text-muted-foreground">
                  WhatsApp: <span className="font-medium text-foreground">{contactWhatsApp}</span>
                </div>
              </div>
            </div>
            <div className="surface hairline rounded-2xl p-6">
              <Clock className="mb-3 size-8 text-accent" aria-hidden />
              <h2 className="font-semibold">Response time</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                We typically respond within a few business days. Urgent partnership or media
                requests — mention it in the subject line of your message.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Want to give instead?{' '}
              <Link href="/donate" className="font-medium text-foreground underline-offset-4 hover:underline">
                Support the work
              </Link>
              .
            </p>
          </div>

          <div className="rounded-3xl border border-border/70 bg-secondary/40 p-8 md:p-10">
            <h2 className="font-serif text-2xl font-semibold">Send a message</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Send a message directly from the site. We&apos;ll reply by email.
            </p>
            <form
              className="mt-8 grid gap-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setSent(false)
                setError(null)
                const form = e.currentTarget
                const data = new FormData(form)
                const topic =
                  topicOptions.find((o) => o.value === data.get('topic'))?.label ?? 'General'
                const payload = {
                  topic,
                  name: String(data.get('name') || ''),
                  email: String(data.get('email') || ''),
                  phone: String(data.get('phone') || ''),
                  message: String(data.get('message') || ''),
                }

                try {
                  setSubmitting(true)
                  const res = await fetch('/api/contact-email', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(payload),
                  })

                  if (!res.ok) {
                    const j = (await res.json().catch(() => null)) as
                      | { error?: string; status?: number; details?: string }
                      | null
                    const details = j?.details ? ` ${j.details}` : ''
                    setError((j?.error || 'Message failed to send. Please try again.') + details)
                    return
                  }

                  form.reset()
                  setSent(true)
                } catch {
                  setError('Message failed to send. Please try again.')
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <select
                  id="topic"
                  name="topic"
                  defaultValue="general"
                  className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none',
                  )}
                >
                  {topicOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+233 …" autoComplete="tel" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you need — programme interest, partnership idea, or question."
                  className="resize-y min-h-[120px]"
                />
              </div>
              <Button
                type="submit"
                className="rounded-full w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
              {sent ? (
                <p className="text-sm text-foreground/70">
                  Message sent. We&apos;ll reply soon — and we&apos;ve sent you a confirmation.
                </p>
              ) : null}
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
            </form>
          </div>
        </div>
      </main>

      <SiteFooter variant="simple" />
    </div>
  )
}
