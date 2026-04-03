import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Privilege Girls Foundation — programme enquiries, partnerships, media, and general questions. Based in Accra, Ghana.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
