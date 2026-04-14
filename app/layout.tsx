import type { Metadata } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { PgfChatWidget } from '@/components/pgf-chat-widget'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://privilegegirlsfoundation.com'),
  title: {
    default: 'Privilege Girls Foundation | Building Women Who Build Businesses',
    template: '%s | Privilege Girls Foundation',
  },
  description:
    'Privilege Girls Foundation (PGF) sponsors young women through fully funded vocational training and supports them beyond graduation until they are stable and earning.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/pgf-svg.PNG', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Privilege Girls Foundation',
    title: 'Privilege Girls Foundation | Building Women Who Build Businesses',
    description:
      'PGF sponsors young women through fully funded vocational training (hairdressing and fashion) and supports them beyond graduation.',
    images: [{ url: '/logo2.PNG' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privilege Girls Foundation',
    description:
      'Fully funded vocational training and follow-through for young women in Ghana.',
    images: ['/logo2.PNG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <PgfChatWidget />
          <SonnerToaster richColors closeButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
