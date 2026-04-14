'use client'

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, Building2, Check, Copy, Download, Heart, Package } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PGF_IMAGES } from '@/lib/pgf-images'

export default function DonatePage() {
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

  const donationsEmail = 'info@privilegegirlsfoundation.com'
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const manifestoHref = '/manifesto.pdf'

  const bankDetails = {
    bankName: 'ECOBANK GHANA',
    accountName: 'Privilege Girls Foundation',
    accountNumber: '1441004988219',
    mobileMoney: 'Not yet',
    preferredPlatform: 'Paystack or Flutterwave',
  } as const

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
                  item.href === '/donate'
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground transition-colors hover:text-foreground'
                }
                aria-current={item.href === '/donate' ? 'page' : undefined}
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
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <p className="mt-8 text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Support the work
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            A stake in a woman&apos;s future.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            PGF is funded through corporate partnerships, individual contributions, and in-kind
            sponsorships. What you give goes directly into training, materials, accommodation, and
            business setup — so a woman can move from learning a skill to running her own operation.
          </p>
          <p className="mt-4 font-serif text-xl font-semibold text-foreground">
            Your contribution is not a handout. It is an investment.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="sm" className="rounded-full w-full sm:w-auto" asChild>
              <Link href="/contact">Talk to the team</Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-full bg-transparent w-full sm:w-auto"
              asChild
            >
              <a href={manifestoHref} download>
                <Download className="size-4" />
                Download manifesto
              </a>
            </Button>
          </div>
          </div>

          <div className="surface hairline relative overflow-hidden rounded-3xl">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            <Image
              src={PGF_IMAGES.about}
              alt="Privilege Girls Foundation — training and support in Ghana"
              width={1200}
              height={900}
              className="h-[320px] w-full object-cover md:h-[360px]"
              sizes="(max-width: 1024px) 100vw, 44vw"
              priority={false}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
              <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Donate
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-balance">
                Fund training that lasts — skills, tools, and follow-through.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: 'Corporate & partners',
              body: 'Sponsor a cohort, fund materials, or host trainees. We&apos;ll align with your CSR goals and report clearly on outcomes.',
            },
            {
              icon: Heart,
              title: 'Individual giving',
              body: 'One-time or recurring support helps cover tuition, kits, and accommodation for women in our hairdressing and fashion tracks.',
            },
            {
              icon: Package,
              title: 'In-kind',
              body: 'Tools, fabrics, salon equipment, and professional services — we match what you can offer to real needs on the ground.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="surface hairline flex flex-col rounded-2xl p-6 md:p-7"
            >
              <card.icon className="mb-4 size-9 text-accent" aria-hidden />
              <h2 className="font-semibold text-lg">{card.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Where your support goes
          </h2>
          <ul className="mt-6 grid gap-3 text-muted-foreground">
            {[
              'Vocational training fees and certification',
              'Materials and tools for hairdressing and fashion',
              'Safe accommodation during the programme',
              'Business setup and follow-through after graduation',
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold md:text-3xl">
            Bank and payment details
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            For donations and partnership payments, contributions can be processed via{' '}
            <span className="font-medium text-foreground">{bankDetails.preferredPlatform}</span>{' '}
            and deposited into the account below.
          </p>
          <div className="mt-6 surface hairline rounded-3xl p-7 md:p-8">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Bank name
                </dt>
                <dd className="mt-1 font-medium">{bankDetails.bankName}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Account name
                </dt>
                <dd className="mt-1 font-medium">{bankDetails.accountName}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Account number
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-sm">{bankDetails.accountNumber}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full bg-transparent"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(bankDetails.accountNumber)
                        setCopied(true)
                        window.setTimeout(() => setCopied(false), 1500)
                      } catch {
                        // no-op
                      }
                    }}
                    aria-label={
                      copied ? 'Account number copied' : 'Copy account number to clipboard'
                    }
                    title={copied ? 'Copied' : 'Copy'}
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Mobile money
                </dt>
                <dd className="mt-1 font-medium">{bankDetails.mobileMoney}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-border/70 bg-secondary/40 p-8 md:p-10">
          <h2 className="font-serif text-2xl font-semibold">Get in touch to give</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Share your name and how you&apos;d like to support — we&apos;ll respond with next steps.
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
                name: String(data.get('name') || ''),
                email: String(data.get('email') || ''),
                phone: String(data.get('phone') || ''),
                message: String(data.get('message') || ''),
              }

              try {
                setSubmitting(true)
                const res = await fetch('/api/donate-email', {
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
              <Label htmlFor="message">How you&apos;d like to help</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="e.g. one-time gift, sponsor a cohort, in-kind donation…"
                className="resize-y min-h-[100px]"
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
                Message sent. We&apos;ll reply by email — and we&apos;ve sent you a confirmation.
              </p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <p className="text-xs text-muted-foreground">
              Prefer email? Write us at{' '}
              <a className="underline-offset-4 hover:underline" href={`mailto:${donationsEmail}`}>
                {donationsEmail}
              </a>
              .
            </p>
          </form>
        </div>
      </main>

      <SiteFooter variant="simple" />
    </div>
  )
}
