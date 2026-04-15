import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminNav } from '@/app/admin/_components/admin-nav'
import { getAuth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/login?next=/admin')

  const role = (session.user as unknown as { role?: string }).role
  if (role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <AdminHeader email={session.user.email} />
        <div className="mt-6">
          <AdminNav />
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  )
}

