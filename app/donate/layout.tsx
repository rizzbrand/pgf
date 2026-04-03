import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Privilege Girls Foundation — corporate partnerships, individual giving, and in-kind support for vocational training and women-led businesses.',
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children
}
