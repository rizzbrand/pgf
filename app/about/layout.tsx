import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Privilege Girls Foundation (PGF) — fully funded vocational training in hairdressing and fashion, plus follow-through support beyond graduation.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}

