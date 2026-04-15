import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __pgfPrisma: PrismaClient | undefined
}

export function getPrisma() {
  // Prevent build-time crashes (e.g. Vercel "collect page data") when env is not set.
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL')
  }

  return (
    global.__pgfPrisma ??
    (global.__pgfPrisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }))
  )
}

