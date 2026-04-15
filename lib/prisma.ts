declare global {
  // eslint-disable-next-line no-var
  var __pgfPrisma: unknown | undefined
}

export function getPrisma() {
  // Prevent build-time crashes (e.g. Vercel "collect page data") when env is not set.
  if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL')
  }

  // Lazy import so the build step doesn't require Prisma engine binaries.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('@prisma/client') as typeof import('@prisma/client')

  return (
    global.__pgfPrisma ??
    (global.__pgfPrisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    }))
  )
}

