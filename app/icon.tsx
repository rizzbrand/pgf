import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

// Next.js will serve this as /icon.png (used for favicons/app icons).
export default async function Icon() {
  const res = await fetch(
    new URL('../public/pgf-svg.PNG', import.meta.url),
  ).catch(() => null)

  // If fetch fails for any reason, return a simple PGF fallback icon.
  if (!res || !res.ok) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#541b57',
            color: '#f6eae3',
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          PGF
        </div>
      ),
      { width: 512, height: 512 },
    )
  }

  const arrayBuffer = await res.arrayBuffer()
  return new ImageResponse(
    (
      <img
        src={`data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`}
        width={512}
        height={512}
        alt="Privilege Girls Foundation"
      />
    ),
    { width: 512, height: 512 },
  )
}

