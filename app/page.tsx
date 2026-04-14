'use client'

import {
  ArrowRight,
  Users,
  Zap,
  Award,
  ChevronDown,
  Menu,
  Sparkles,
  Handshake,
  LineChart,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { PGF_IMAGES } from '@/lib/pgf-images'
import { cn } from '@/lib/utils'
import { PgfFieldNotes } from '@/components/pgf-field-notes'
import { SiteFooter } from '@/components/site-footer'
import { SiteLogo } from '@/components/site-logo'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const navItems = useMemo(
    () => [
      { href: '/about', label: 'About' },
      { href: '#programs', label: 'Programs' },
      { href: '#impact', label: 'Impact' },
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
          delay: 0.1,
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

      const staggerGroups = Array.from(
        root.querySelectorAll<HTMLElement>('[data-stagger]'),
      )
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]')
        if (!items.length) return

        gsap.set(items, { willChange: 'transform, opacity' })
        gsap.from(items, {
          scrollTrigger: {
            trigger: group,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 16,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'willChange',
        })
      })
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
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
                  <div className="flex items-center justify-between">
                    <div className="text-sm tracking-[0.18em] uppercase text-muted-foreground">
                      Menu
                    </div>
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

      {/* Hero Section */}
      <section data-hero className="relative pt-28 pb-24 px-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 left-[25%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/14 blur-3xl" />
          <div className="absolute top-24 right-[-160px] h-[560px] w-[560px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:min-h-[calc(100svh-7rem)] py-10">
            <div className="text-center lg:text-left">
          <div
            data-hero-el
            className="mx-auto lg:mx-0 mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-xs tracking-[0.18em] uppercase text-muted-foreground backdrop-blur"
          >
            <span className="inline-block size-1.5 rounded-full bg-accent" />
            A premium founder community
          </div>
          <h1
            data-hero-el
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-balance leading-[1.02] mb-6"
          >
            Building women who build businesses.
          </h1>
          <p
            data-hero-el
            className="text-lg md:text-xl text-muted-foreground mb-10 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Privilege Girls Foundation empowers ambitious women entrepreneurs through mentorship, resources, and an exclusive community of changemakers.
          </p>
          <div data-hero-el className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/apply">
                Apply to Join <ArrowRight className="inline-block ml-2" size={18} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 bg-transparent"
              asChild
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>
          <div
            data-hero-el
            className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-xs tracking-[0.18em] uppercase text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent" size={16} /> Mentorship
            </div>
            <div className="flex items-center gap-2">
              <Handshake className="text-accent" size={16} /> Community
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <LineChart className="text-accent" size={16} /> Growth
            </div>
          </div>
            </div>

            <div className="relative">
              <div
                data-hero-el
                className="relative overflow-hidden rounded-3xl border border-border/70 hairline shadow-sm aspect-[3/4] w-full max-h-[min(72svh,680px)]"
              >
                <Image
                  src={PGF_IMAGES.hero}
                  alt="Women building skills through Privilege Girls Foundation training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/92 via-background/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                    Vocational investment
                  </p>
                  <p className="mt-2 font-serif text-2xl md:text-3xl font-semibold text-balance leading-tight">
                    Professionals in training. Skills that transfer to real work.
                  </p>
                </div>
              </div>

              <div data-hero-el className="mt-6 flex justify-center lg:justify-end">
                <Button variant="link" className="px-0 h-auto text-muted-foreground" asChild>
                  <Link href="#about">
                    Scroll <ChevronDown className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Layered wave divider (under-hero) */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-1">
          <svg
            className="block w-full h-[110px] sm:h-[140px] md:h-[170px]"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pgfWaveDeep" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 70%, black)" stopOpacity="0.72" />
                <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.78" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 70%, black)" stopOpacity="0.72" />
              </linearGradient>
              <linearGradient id="pgfWaveMid" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.36" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient id="pgfWaveLight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
                <stop offset="65%" stopColor="var(--accent)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.14" />
              </linearGradient>
            </defs>

            {/* top soft layers */}
            <path
              d="M0,94 C240,78 420,112 720,98 C1020,84 1180,64 1440,78 L1440,180 L0,180 Z"
              fill="url(#pgfWaveLight)"
            />
            <path
              d="M0,112 C250,98 430,136 720,120 C1010,104 1185,88 1440,104 L1440,180 L0,180 Z"
              fill="url(#pgfWaveMid)"
            />

            {/* deep base */}
            <path
              d="M0,130 C260,120 440,160 720,142 C1000,124 1190,110 1440,126 L1440,180 L0,180 Z"
              fill="url(#pgfWaveDeep)"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-secondary/60">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                We believe that women with ambition and vision deserve access to the same opportunities, networks, and resources as anyone else. At Privilege Girls Foundation, we&apos;re breaking down barriers and building a world where women entrepreneurs thrive.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Our community of mentors, investors, and business leaders is committed to supporting your growth at every stage of your entrepreneurial journey.
              </p>
            </div>
            <div
              data-reveal
              className="relative surface hairline overflow-hidden rounded-3xl aspect-[4/5] max-h-[520px] w-full"
            >
              <Image
                src={PGF_IMAGES.about}
                alt="PGF community and training"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div data-reveal className="lg:sticky lg:top-28">
              <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                The experience
              </div>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl font-semibold">
                A calm system for serious growth.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                We help you move with clarity: tighten strategy, refine execution, and build in a community that matches your ambition.
              </p>
              <div className="mt-6">
                <Button className="rounded-full px-7" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>

            <div data-stagger className="grid gap-4">
              {[
                {
                  n: '01',
                  t: 'Apply & align',
                  d: 'We match you with the right program based on your stage and goals.',
                },
                {
                  n: '02',
                  t: 'Mentorship that moves',
                  d: 'Practical feedback loops with operators who’ve built and scaled.',
                },
                {
                  n: '03',
                  t: 'Community, curated',
                  d: 'A high-trust network for partnership, support, and leverage.',
                },
                {
                  n: '04',
                  t: 'Execution support',
                  d: 'Frameworks, workshops, and resources that translate to progress.',
                },
              ].map((step) => (
                <div
                  key={step.n}
                  data-stagger-item
                  className="surface hairline rounded-3xl p-7"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                        {step.n}
                      </div>
                      <div className="mt-2 text-xl font-semibold">{step.t}</div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {step.d}
                      </p>
                    </div>
                    <div className="mt-1 size-10 rounded-2xl border border-border/70 bg-accent/10 flex items-center justify-center text-accent">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 data-reveal className="font-serif text-3xl md:text-4xl font-semibold">
              Values, with taste.
            </h2>
            <p data-reveal className="max-w-xl text-muted-foreground leading-relaxed">
              Minimal doesn’t mean plain. We’re deliberate about standards, aesthetics, and execution.
            </p>
          </div>

          <div data-stagger className="grid md:grid-cols-12 gap-6">
            {[
              {
                icon: Zap,
                title: 'Excellence',
                description: 'We champion the highest standards in business, mindset, and execution.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'We believe in the power of connection and collective growth.'
              },
              {
                icon: Award,
                title: 'Empowerment',
                description: 'We equip women with tools, knowledge, and confidence to lead.'
              }
            ].map((value, i) => (
              <div
                key={i}
                data-stagger-item
                className={cn(
                  'surface hairline rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-0.5',
                  i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-4' : 'md:col-span-3',
                )}
              >
                <value.icon className="text-accent mb-4" size={28} />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-14 px-6 bg-secondary/60 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Programs
            </div>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-balance md:text-3xl">
              Choose your lane.
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              Two focused tracks designed for practical skill, confidence, and business-ready execution.
            </p>
          </div>
          <div className="mx-auto grid min-w-0 max-w-4xl gap-5 sm:grid-cols-2 sm:justify-items-stretch">
              {[
                {
                  name: 'Hairdressing Track',
                  image: PGF_IMAGES.fashion,
                  imageAlt: 'Hairdressing training at PGF',
                  highlight: 'Craft + client-ready skills',
                  description:
                    'Master core techniques, modern styling, hygiene standards, and customer experience — then translate your skill into a consistent service business.',
                  bullets: ['Technique & styling', 'Client experience', 'Pricing & service design'],
                },
                {
                  name: 'Fashion Track',
                  image: PGF_IMAGES.hairdressing,
                  imageAlt: 'Fashion and design training at PGF',
                  highlight: 'Design + business fundamentals',
                  description:
                    'Build a refined brand, strengthen your design process, and learn how to position, produce, and sell — with mentorship that keeps your work elevated.',
                  bullets: ['Brand & positioning', 'Design process', 'Sales & go-to-market'],
                },
              ].map((program, i) => (
                <div
                  key={program.name}
                  className={cn(
                    'flex h-full min-h-0 flex-col overflow-hidden rounded-2xl surface hairline transition-all duration-300',
                    hoveredProgram === i
                      ? 'ring-1 ring-accent/35'
                      : 'hover:ring-1 hover:ring-accent/20',
                  )}
                  onMouseEnter={() => setHoveredProgram(i)}
                  onMouseLeave={() => setHoveredProgram(null)}
                >
                  <div className="relative aspect-[16/11] w-full shrink-0 border-b border-border/70 bg-muted/30 sm:aspect-[3/2]">
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.18em]">
                      {program.highlight}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">
                      {program.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">
                      {program.description}
                    </p>

                    <ul className="mt-4 grid gap-1.5 text-sm text-muted-foreground">
                      {program.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/80" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2.5">
                      <Button size="sm" className="rounded-full w-full sm:w-auto" asChild>
                        <Link href={`/apply?track=${i === 0 ? 'hairdressing' : 'fashion'}`}>
                          Apply for this track
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full bg-transparent w-full sm:w-auto"
                        asChild
                      >
                        <Link href="/contact">Ask a question</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <PgfFieldNotes />
      </div>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 data-reveal className="font-serif text-3xl md:text-4xl font-semibold">
              Impact, measured.
            </h2>
            <p data-reveal className="max-w-xl text-muted-foreground leading-relaxed">
              Clear numbers around training completion, livelihoods, and follow-through — the way we actually run the work.
            </p>
          </div>

          <div data-stagger className="grid md:grid-cols-12 gap-6 mb-12">
            {[
              { number: '110+', label: 'Women trained (to date)' },
              { number: '11', label: 'Cohorts completed' },
              { number: '74%', label: 'In work or self-employed (6 mo.)' },
              { number: '2', label: 'Vocational tracks' },
            ].map((stat, i) => (
              <div
                key={i}
                data-stagger-item
                className={cn(
                  'surface hairline rounded-3xl p-8',
                  i === 0 ? 'md:col-span-4' : i === 1 ? 'md:col-span-4' : 'md:col-span-2',
                )}
              >
                <div className="font-serif text-4xl md:text-5xl font-semibold text-foreground">
                  {stat.number}
                </div>
                <div className="mt-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border/70 pt-12">
            <h3 data-reveal className="font-serif text-2xl font-semibold mb-8">Success Stories</h3>
            <div data-stagger className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Ama Serwaa',
                  role: 'Salon owner, Accra',
                  story:
                    '"PGF paid for my full hairdressing programme — materials, accommodation, the lot. After graduation they helped me price services and set up my small salon. I\'m not guessing anymore; I\'m running a real business."',
                  metrics: 'Opened studio · 14 months in operation',
                },
                {
                  name: 'Yaa Mensah',
                  role: 'Fashion & alterations, Kumasi',
                  story:
                    '"The fashion track gave me pattern-making and finishing I didn\'t get anywhere else. PGF stayed with me past the certificate until my shop registration and first bulk order were done."',
                  metrics: '2 assistants · supplies contract with local boutique',
                },
              ].map((testimonial, i) => (
                <div key={i} data-stagger-item className="surface hairline rounded-3xl p-8">
                  <p className="text-lg italic text-foreground/80 mb-6 leading-relaxed">{testimonial.story}</p>
                  <div className="border-t border-border/70 pt-4">
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60 mb-3">{testimonial.role}</p>
                    <p className="text-sm text-accent font-medium">{testimonial.metrics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate */}
      {/* <section id="donate" className="py-20 px-6 border-t border-border/70">
        <div
          data-reveal
          className="max-w-5xl mx-auto surface hairline rounded-3xl p-10 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground mb-3">Support</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
              Fund training that lasts
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Your contribution covers skills training, materials, and follow-through so women graduate
              ready to earn — not just for a season, but for life.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/donate">Give to PGF</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href="/contact">Partner with us</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA — cream band + scoped light tokens (readable in dark mode) */}
      <section
        id="cta"
        className="pgf-band-surface relative border-t border-border/80 bg-pgf-band py-20 px-6"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
          aria-hidden
        />
        <div data-reveal className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-[#2a152c]">
            Ready to Build Your Legacy?
          </h2>
          <p className="text-lg mb-12 leading-relaxed max-w-2xl mx-auto text-[#5c4a5e]">
            Join a community of ambitious women entrepreneurs. Whether you&apos;re just starting out or scaling to the next level, there&apos;s a place for you at PGF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent text-[#2a152c]" asChild>
              <Link href="/contact">Schedule a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter variant="full" />
    </div>
  )
}
