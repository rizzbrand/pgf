'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { ArrowLeft, Clock, Mail, MapPin } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const contactEmail = 'hello@privilegegirlsfoundation.org'

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
                Accra, Ghana
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
              This opens your email app with your details filled in — nothing is stored on this
              site.
            </p>
            <form
              className="mt-8 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data = new FormData(form)
                const topic =
                  topicOptions.find((o) => o.value === data.get('topic'))?.label ?? 'General'
                const subject = encodeURIComponent(`PGF — ${topic}`)
                const body = encodeURIComponent(
                  `Topic: ${topic}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || '—'}\n\nMessage:\n${data.get('message')}`,
                )
                window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
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
              <Button type="submit" className="rounded-full w-full sm:w-auto">
                Open in email
              </Button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter variant="simple" />
    </div>
  )
}
