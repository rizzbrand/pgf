'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

export function AdminHeader({ email }: { email: string }) {
  const router = useRouter()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <p className="font-serif text-2xl font-semibold">Admin</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="rounded-full" asChild>
          <Link href="/">View site</Link>
        </Button>
        <Button
          size="sm"
          className="rounded-full"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push('/login')
                },
              },
            })
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  )
}

