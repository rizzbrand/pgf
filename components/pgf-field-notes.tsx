import Image from 'next/image'

import { PGF_IMAGES } from '@/lib/pgf-images'
import { cn } from '@/lib/utils'

type PgfFieldNotesProps = {
  className?: string
  /** Wide panoramic strip using the hero photo — great on the home page. */
  showCinematicBand?: boolean
}

export function PgfFieldNotes({
  className,
  showCinematicBand = true,
}: PgfFieldNotesProps) {
  return (
    <section
      className={cn('py-20 px-6 bg-secondary/50', className)}
      aria-labelledby="pgf-field-notes-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl" data-reveal>
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
            Field notes
          </p>
          <h2
            id="pgf-field-notes-heading"
            className="mt-3 font-serif text-3xl font-semibold md:text-4xl"
          >
            The work, up close.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Training, craft, and community — captured in moments from our programs across Ghana.
          </p>
        </div>

        {showCinematicBand ? (
          <div
            className="relative mb-6 overflow-hidden rounded-3xl border border-border/70 hairline md:mb-8"
            data-reveal
          >
            <div className="relative aspect-[21/9] min-h-[180px] w-full md:aspect-[2.4/1] md:min-h-[220px]">
              <Image
                src={PGF_IMAGES.hero}
                alt="Panoramic view of PGF training and community"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/30" />
            </div>
            <p className="absolute bottom-4 left-4 max-w-xs text-xs tracking-[0.15em] uppercase text-foreground/90 drop-shadow-sm md:bottom-6 md:left-8">
              Vocational investment in motion
            </p>
          </div>
        ) : null}

        {/* Asymmetric mosaic — hair, fashion, community */}
        <div
          className="grid gap-4 md:grid-cols-12 md:grid-rows-[minmax(200px,1fr)_minmax(200px,1fr)]"
          data-stagger
        >
          <div
            data-stagger-item
            className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border/70 hairline md:col-span-7 md:row-span-2 md:min-h-[460px]"
          >
            <Image
              src={PGF_IMAGES.about}
              alt="PGF participants and mentors"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground backdrop-blur-sm">
              Community
            </span>
          </div>

          <div
            data-stagger-item
            className="relative min-h-[200px] overflow-hidden rounded-3xl border border-border/70 hairline md:col-span-5"
          >
            <Image
              src={PGF_IMAGES.hairdressing}
              alt="Hairdressing track — technique and client care"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <span className="absolute left-4 top-4 rounded-full bg-foreground/85 px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase text-background">
              Hair
            </span>
          </div>

          <div
            data-stagger-item
            className="relative min-h-[200px] overflow-hidden rounded-3xl border border-border/70 hairline md:col-span-5"
          >
            <Image
              src={PGF_IMAGES.fashion}
              alt="Fashion track — design and presentation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase text-accent-foreground">
              Fashion
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
