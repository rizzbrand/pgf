import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminDonationsSubmissionsPage() {
  const rows = await prisma.donateSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  })

  return (
    <div className="grid gap-6">
      <div className="surface hairline rounded-2xl p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Submissions
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold">Donate / Support enquiries</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing latest {Math.min(rows.length, 500)} enquiries.
            </p>
          </div>

          <Button variant="outline" className="rounded-full bg-transparent" asChild>
            <Link href="/admin">Back</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {rows.length ? (
          rows.map((r) => (
            <div key={r.id} className="surface hairline rounded-2xl p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.email}
                    {r.phone ? ` · ${r.phone}` : ''}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{r.createdAt.toLocaleString()}</p>
              </div>
              <div className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">
                {r.message}
              </div>
            </div>
          ))
        ) : (
          <div className="surface hairline rounded-2xl p-8 text-sm text-muted-foreground">
            No donation enquiries yet.
          </div>
        )}
      </div>
    </div>
  )
}
