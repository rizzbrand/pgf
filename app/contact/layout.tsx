import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Privilege Girls Foundation — programme enquiries, partnerships, media, and general questions. Based in North Legon, Accra, Ghana.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
