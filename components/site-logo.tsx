import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type SiteLogoProps = {
  href?: string
  className?: string
  /**
   * Fits inside a fixed `h-16` navbar — only adjust if you change the nav height.
   */
  logoHeightPx?: number
}

export function SiteLogo({ href = '/', className, logoHeightPx = 60 }: SiteLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex min-w-0 max-w-[min(720px,calc(100vw-7.5rem))] sm:max-w-[min(720px,calc(100vw-22rem))] items-center shrink',
        className,
      )}
    >
      <Image
        src="/logo.PNG"
        alt="Privilege Girls Foundation"
        width={900}
        height={180}
        sizes="(max-width: 768px) 78vw, 720px"
        className="max-w-full min-w-0 object-contain object-left"
        style={{ height: logoHeightPx, width: 'auto' }}
        priority
      />
    </Link>
  )
}
