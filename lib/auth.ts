import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

import { prisma } from '@/lib/prisma'

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@privilegegirlsfoundation.com').trim().toLowerCase()

let _auth: ReturnType<typeof betterAuth> | null = null

export function getAuth() {
  if (_auth) return _auth

  _auth = betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: ['user', 'admin'],
          required: false,
          defaultValue: 'user',
          input: false,
        },
      },
    },
    experimental: { joins: true },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const email = String(user.email || '').trim().toLowerCase()
            const role = email === ADMIN_EMAIL ? 'admin' : 'user'
            return {
              data: {
                ...user,
                role,
              },
            }
          },
        },
      },
    },
    database: prismaAdapter(prisma, { provider: 'mongodb' }),
    plugins: [nextCookies()],
  })

  return _auth
}

