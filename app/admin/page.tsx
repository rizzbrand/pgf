import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const prisma = getPrisma()
  const [applications, contact, donations] = await Promise.all([
    prisma.applicationSubmission.count(),
    prisma.contactSubmission.count(),
    prisma.donateSubmission.count(),
  ])

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="surface hairline rounded-2xl p-6 md:col-span-2">
        <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Dashboard
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">Privilege Girls Foundation</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Manage submissions coming in from the website forms.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button className="rounded-full" asChild>
            <Link href="/admin/applications">View applications</Link>
          </Button>
          <Button variant="outline" className="rounded-full bg-transparent" asChild>
            <Link href="/admin/contact">View contact</Link>
          </Button>
          <Button variant="outline" className="rounded-full bg-transparent" asChild>
            <Link href="/admin/donations">View donations</Link>
          </Button>
        </div>
      </div>

      <div className="surface hairline rounded-2xl p-6">
        <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
          Totals
        </p>
        <div className="mt-4 grid gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Applications</span>
            <span className="font-medium">{applications}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Contact messages</span>
            <span className="font-medium">{contact}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Donation/support</span>
            <span className="font-medium">{donations}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

