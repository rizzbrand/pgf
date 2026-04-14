import type { ReactNode } from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'

import { SiteLogo } from '@/components/site-logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SiteFooterProps = {
  variant?: 'full' | 'simple'
  /** Optional CTAs on the right (e.g. About page: Back home + Get involved) */
  actions?: ReactNode
  className?: string
}

const programsLinks = [
  { href: '/#programs', label: 'Hairdressing' },
  { href: '/#programs', label: 'Fashion' },
  { href: '/#impact', label: 'Impact' },
] as const

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/donate', label: 'Donate' },
  { href: '/#impact', label: 'Impact' },
  { href: '/contact', label: 'Contact' },
] as const

const socialLinks = [
  { href: '#', label: 'LinkedIn', Icon: Linkedin },
  { href: '#', label: 'Instagram', Icon: Instagram },
  { href: '#', label: 'Twitter', Icon: Twitter },
] as const

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#impact', label: 'Impact' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
] as const

const PGF_CONTACT = {
  email: 'info@privilegegirlsfoundation.com',
  phone: '+233 203 427 795',
  location: 'North Legon, Accra, Ghana',
} as const

function FooterLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm text-white/75 transition-colors hover:text-[var(--pgf-off-white)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pgf-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pgf-dark-purple)] rounded-sm',
        className,
      )}
    >
      {children}
    </Link>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 mb-4">{children}</p>
  )
}

export function SiteFooter({ variant = 'full', actions, className }: SiteFooterProps) {
  const shell = cn(
    'pgf-footer-surface relative border-t border-white/10',
    className,
  )

  if (variant === 'simple') {
    return (
      <footer className={shell}>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--pgf-yellow)]/50 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <p className="font-serif text-lg font-semibold text-[var(--pgf-off-white)]">
                Privilege Girls Foundation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Building women who build businesses.
              </p>
              <p className="mt-4 inline-flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--pgf-yellow)]" aria-hidden />
                <span>{PGF_CONTACT.location}</span>
              </p>
              <div className="mt-5 grid gap-2 text-sm text-white/70">
                <a
                  href={`mailto:${PGF_CONTACT.email}`}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <Mail className="size-4 text-white/80" aria-hidden />
                  {PGF_CONTACT.email}
                </a>
                <a
                  href={`tel:${PGF_CONTACT.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <Phone className="size-4 text-white/80" aria-hidden />
                  {PGF_CONTACT.phone}
                </a>
              </div>
            </div>
            {actions ? (
              <div className="flex flex-wrap items-center gap-3 lg:shrink-0">{actions}</div>
            ) : null}
          </div>

          <nav
            aria-label="Footer"
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-10 sm:gap-x-8"
          >
            {quickLinks.map((item) => (
              <FooterLink key={item.href + item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/55">
              © {new Date().getFullYear()} Privilege Girls Foundation. All rights reserved.
            </p>
            <FooterLink href="/" className="text-xs font-medium w-fit">
              ← Back to home
            </FooterLink>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={shell}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--pgf-yellow)]/45 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SiteLogo
              href="/"
              logoHeightPx={52}
              className="max-w-[280px] [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-[0.96]"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Building women who build businesses — through vocational training, mentorship, and follow-through.
            </p>
            <p className="mt-5 inline-flex items-start gap-2 text-sm text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--pgf-yellow)]" aria-hidden />
              <span>Based in {PGF_CONTACT.location}</span>
            </p>
            <div className="mt-7 flex flex-col gap-2.5">
              <div className="flex flex-wrap gap-3">
                <Button
                  className="rounded-full bg-[var(--pgf-yellow)] text-[var(--pgf-dark-purple)] hover:bg-[var(--pgf-yellow)]/90"
                  asChild
                >
                  <Link href="/donate">Donate</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
              <div className="grid gap-2 text-sm text-white/70">
                <a
                  href={`mailto:${PGF_CONTACT.email}`}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <Mail className="size-4 text-white/80" aria-hidden />
                  {PGF_CONTACT.email}
                </a>
                <a
                  href={`tel:${PGF_CONTACT.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <Phone className="size-4 text-white/80" aria-hidden />
                  {PGF_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3 lg:gap-8">
            <div>
              <SectionLabel>Programs</SectionLabel>
              <ul className="space-y-3">
                {programsLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>Organization</SectionLabel>
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>Connect</SectionLabel>
              <p className="text-xs text-white/55 leading-relaxed mb-4 max-w-[28ch]">
                Follow for updates and stories. Links can be updated when handles are ready.
              </p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={cn(
                        'inline-flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-[var(--pgf-off-white)]',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--pgf-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--pgf-dark-purple)] rounded-sm',
                      )}
                      aria-label={label}
                    >
                      <Icon className="size-4 text-white/80" aria-hidden />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} Privilege Girls Foundation. All rights reserved.
          </p>
          <nav aria-label="Legal and contact" className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <FooterLink href="/contact" className="text-xs">
              Contact
            </FooterLink>
            <FooterLink href="/donate" className="text-xs">
              Donate
            </FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  )
}
