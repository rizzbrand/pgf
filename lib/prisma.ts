import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var __pgfPrisma: PrismaClient | undefined
}

export const prisma =
  global.__pgfPrisma ??
  (global.__pgfPrisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  }))

