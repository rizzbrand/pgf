import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply to Privilege Girls Foundation (PGF) vocational training tracks. Share your details and we’ll follow up with next steps.',
  alternates: { canonical: '/apply' },
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}

