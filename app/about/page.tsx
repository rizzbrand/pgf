'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import { Menu } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { PgfFieldNotes } from '@/components/pgf-field-notes'
import { Button } from '@/components/ui/button'
import { PGF_IMAGES } from '@/lib/pgf-images'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  const navItems = useMemo(
    () => [
      { href: '/', label: 'Home' },
      { href: '/#programs', label: 'Programs' },
      { href: '/#impact', label: 'Impact' },
      { href: '/donate', label: 'Donate' },
      { href: '/contact', label: 'Contact' },
    ],
    [],
  )

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const reduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (reduceMotion) return

      const hero = root.querySelector('[data-hero]')
      const heroEls = hero?.querySelectorAll('[data-hero-el]')

      if (hero && heroEls?.length) {
        gsap.set(heroEls, { willChange: 'transform, opacity' })
        gsap.from(heroEls, {
          opacity: 0,
          y: 14,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.05,
          clearProps: 'willChange',
        })
      }

      const revealEls = Array.from(root.querySelectorAll('[data-reveal]'))
      revealEls.forEach((el) => {
        gsap.set(el, { willChange: 'transform, opacity' })
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 18,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'willChange',
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 z-50 h-16 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <SiteLogo href="/" />

          <div className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="rounded-full px-5 hidden sm:inline-flex" asChild>
              <Link href="/donate">Donate</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden rounded-full bg-transparent"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="p-0">
                <div className="p-6">
                  <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    Menu
                  </div>
                  <div className="mt-6 grid gap-3 text-base">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl border border-border/70 bg-card/60 px-4 py-3 backdrop-blur hover:bg-card transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button className="w-full rounded-full" asChild>
                      <Link href="/donate">Donate</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header data-hero className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-[25%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/14 blur-3xl" />
          <div className="absolute top-24 right-[-160px] h-[560px] w-[560px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end py-10">
            <div>
              <div
                data-hero-el
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-xs tracking-[0.18em] uppercase text-muted-foreground backdrop-blur"
              >
                The foundation
              </div>
              <h1
                data-hero-el
                className="mt-5 font-serif text-5xl md:text-6xl font-semibold leading-[1.02] text-balance"
              >
                This is not charity.
                <br />
                This is investment.
              </h1>
              <p
                data-hero-el
                className="mt-6 text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl"
              >
                Privilege Girls Foundation sponsors young women aged 18 to 35 through fully funded vocational training in hairdressing and fashion — and supports them beyond graduation until they are standing on their own.
              </p>
              <div data-hero-el className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="rounded-full px-8" asChild>
                  <Link href="/#programs">Explore programs</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent" asChild>
                  <Link href="/contact">Partner with PGF</Link>
                </Button>
              </div>
            </div>

            <div data-hero-el className="grid gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 hairline">
                <Image
                  src={PGF_IMAGES.hero}
                  alt="Young women in vocational training with Privilege Girls Foundation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="surface hairline rounded-3xl p-8">
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  Vision
                </div>
                <p className="mt-3 font-serif text-3xl font-semibold leading-tight">
                  A Ghana where every young woman has access to the skills, confidence, and structure to build her own livelihood.
                </p>
                <div className="mt-7 border-t border-border/70 pt-6">
                  <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    Mission
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Privilege Girls Foundation sponsors young women aged 18 to 35 through fully funded vocational training in hair and fashion. We support them in building character, developing professional skills, and establishing their own businesses.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    We do not stop at graduation. PGF stays until the woman is standing on her own.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Under-hero wave */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-1">
          <svg
            className="block w-full h-[110px] sm:h-[140px] md:h-[170px]"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pgfAboutWaveDeep" x1="0" y1="0" x2="1" y2="0">
                <stop
                  offset="0%"
                  stopColor="color-mix(in oklab, var(--accent) 70%, black)"
                  stopOpacity="0.72"
                />
                <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.78" />
                <stop
                  offset="100%"
                  stopColor="color-mix(in oklab, var(--accent) 70%, black)"
                  stopOpacity="0.72"
                />
              </linearGradient>
              <linearGradient id="pgfAboutWaveMid" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.36" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient id="pgfAboutWaveLight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
                <stop offset="65%" stopColor="var(--accent)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.14" />
              </linearGradient>
            </defs>

            <path
              d="M0,94 C240,78 420,112 720,98 C1020,84 1180,64 1440,78 L1440,180 L0,180 Z"
              fill="url(#pgfAboutWaveLight)"
            />
            <path
              d="M0,112 C250,98 430,136 720,120 C1010,104 1185,88 1440,104 L1440,180 L0,180 Z"
              fill="url(#pgfAboutWaveMid)"
            />
            <path
              d="M0,130 C260,120 440,160 720,142 C1000,124 1190,110 1440,126 L1440,180 L0,180 Z"
              fill="url(#pgfAboutWaveDeep)"
            />
          </svg>
        </div>
      </header>

      {/* Values */}
      <section className="py-20 px-6 bg-secondary/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div data-reveal className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                Values
              </div>
              <h2 data-reveal className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
                What we stand on.
              </h2>
            </div>
            <p data-reveal className="max-w-xl text-muted-foreground leading-relaxed">
              Structure matters. Dignity matters. Follow-through matters. We invest in women as professionals in training — and we stay.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {[
              {
                title: 'Dignity',
                body:
                  'Every woman who enters a PGF program is treated as a professional in training, not a charity case. This is investment, not aid.',
                span: 'md:col-span-5',
              },
              {
                title: 'Quiet Action',
                body:
                  'PGF does not perform generosity. The work speaks. The results speak. The women speak.',
                span: 'md:col-span-4',
              },
              {
                title: 'Structure Before Scale',
                body:
                  'Every program is properly built before it grows. Quality of training matters more than number of graduates.',
                span: 'md:col-span-3',
              },
              {
                title: 'Follow-Through',
                body:
                  'PGF does not stop at graduation. Business setup support means seeing it through until the woman is operating independently.',
                span: 'md:col-span-7',
              },
              {
                title: 'Faith',
                body:
                  'PGF is rooted in the belief that God places opportunity in the hands of those who will steward it well.',
                span: 'md:col-span-5',
              },
            ].map((v) => (
              <div
                key={v.title}
                data-reveal
                className={`surface hairline rounded-3xl p-8 ${v.span}`}
              >
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {v.title}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning + tagline */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div data-reveal>
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Positioning
            </div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
              PGF is not a charity.
              <br />
              It is a vocational investment platform.
            </h2>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Most foundations give resources. PGF builds character and businesses. The difference is what happens after the training ends. PGF stays until the woman is standing on her own.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              We do not use the language of charity. We do not speak about our women as vulnerable or marginalized. They are professionals in training. That is how we talk about them. That is how we treat them.
            </p>
          </div>

          <div data-reveal className="surface hairline rounded-3xl p-10">
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Tagline
            </div>
            <div className="mt-4 rounded-3xl border border-border/70 bg-foreground text-background p-10">
              <p className="font-serif text-4xl md:text-5xl font-semibold leading-[1.05]">
                Building women who
                <br />
                build businesses.
              </p>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              This line captures everything PGF does in one breath. It communicates investment, agency, and outcome. The women are not recipients. They are builders.
            </p>
          </div>
        </div>
      </section>

      {/* Tone of voice */}
      <section className="py-20 px-6 bg-secondary/60">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Tone of voice
          </div>
          <h2 data-reveal className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
            How PGF speaks.
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div data-reveal className="surface hairline rounded-3xl p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                PGF speaks with warmth and authority. Never pity. Never performance. Never “look what we did for these poor girls.”
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The women are the story, not the foundation. PGF is the structure behind them, not the spotlight in front of them.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Language is clear, direct, and grounded. Short sentences. No jargon. No NGO-speak.
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                When PGF speaks publicly, it sounds like a woman who has been where these girls are going. Because it is.
              </p>
            </div>

            <div className="grid gap-6">
              <div data-reveal className="surface hairline rounded-3xl p-8">
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  We say
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {[
                    'Professionals in training',
                    'Vocational investment',
                    'Building character and skill',
                    'Standing on her own',
                    'The women we invest in',
                    'She is building something real',
                    'Her future, our commitment',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-accent/80" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal className="surface hairline rounded-3xl p-8">
                <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  We never say
                </div>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {[
                    'Vulnerable populations',
                    'Charity / handout / donation',
                    'Underprivileged girls',
                    'Saving / rescuing',
                    'Beneficiaries',
                    'Giving back to the less fortunate',
                    'These poor girls',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-foreground/30" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto + contribute */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2">
          <div data-reveal className="surface hairline rounded-3xl p-10">
            <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              The manifesto
            </div>
            <h2 className="mt-3 font-serif text-4xl font-semibold">
              This is what we believe.
            </h2>
            <div className="mt-6 grid gap-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Every year, thousands of young women in Ghana have the drive to work but no access to training. They are not lacking ambition. They are lacking opportunity.
              </p>
              <p>
                Privilege Girls Foundation exists to close that gap.
              </p>
              <p>
                We sponsor young women aged 18 to 35 through fully funded vocational training programs in hairdressing and fashion. Every cost is covered. Tuition. Materials. Accommodation. From the first day of training to the last.
              </p>
              <p>
                But we do not stop at graduation.
              </p>
              <p>
                Once a woman completes her program, PGF supports her in building character and setting up her own business. Because a certificate without a plan is just paper. We believe in building women who can stand on their own — from learning a skill to running a shop, from dependence to ownership.
              </p>
            </div>
            <p className="mt-8 font-serif text-2xl font-semibold">
              This is not charity.
              <br />
              This is investment.
            </p>
          </div>

          <div data-reveal className="rounded-3xl border border-border/70 bg-foreground text-background p-10">
            <div className="text-xs tracking-[0.18em] uppercase text-background/70">
              How you can contribute
            </div>
            <h3 className="mt-3 font-serif text-4xl font-semibold">
              A stake in a woman’s future.
            </h3>
            <div className="mt-6 grid gap-4 text-sm text-background/80 leading-relaxed">
              <p>
                PGF is funded through corporate partnerships, individual donations, and in-kind sponsorships. Every contribution goes directly to training, materials, accommodation, and business setup costs for our women.
              </p>
              <p>
                Whether you are a business owner, a supplier, a corporate partner, or an individual who believes in what we are building — there is a place for you in this work.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90" asChild>
                <Link href="/contact">Partner with PGF</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-background/70 text-background hover:bg-background/10" asChild>
                <Link href="/contact">Sponsor a cohort</Link>
              </Button>
            </div>
            <p className="mt-10 font-serif text-2xl font-semibold">
              Your contribution is not a donation.
              <br />
              It is a stake in a woman&apos;s future.
            </p>
          </div>
        </div>
      </section>

      <PgfFieldNotes showCinematicBand={false} />

      <SiteFooter
        variant="simple"
        actions={
          <>
            <Button
              variant="outline"
              className="rounded-full border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/">Back home</Link>
            </Button>
            <Button
              className="rounded-full bg-[var(--pgf-yellow)] text-[var(--pgf-dark-purple)] hover:bg-[var(--pgf-yellow)]/90"
              asChild
            >
              <Link href="/contact">Get involved</Link>
            </Button>
          </>
        }
      />
    </div>
  )
}

