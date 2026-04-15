import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function toCsvCell(value: unknown) {
  const s = String(value ?? '')
  const escaped = s.replaceAll('"', '""')
  return `"${escaped}"`
}

export default async function AdminApplicationsPage() {
  const rows = await prisma.applicationSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 500,
  })

  const csv = [
    [
      'createdAt',
      'track',
      'name',
      'email',
      'phone',
      'age',
      'location',
      'availability',
      'experience',
      'message',
    ].join(','),
    ...rows.map((r) =>
      [
        r.createdAt.toISOString(),
        r.track,
        r.name,
        r.email,
        r.phone,
        r.age ?? '',
        r.location ?? '',
        r.availability ?? '',
        (r.experience ?? '').replaceAll('\n', ' '),
        (r.message ?? '').replaceAll('\n', ' '),
      ]
        .map(toCsvCell)
        .join(','),
    ),
  ].join('\n')

  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`

  return (
    <div className="grid gap-6">
      <div className="surface hairline rounded-2xl p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
              Submissions
            </p>
            <h1 className="mt-2 font-serif text-3xl font-semibold">Applications</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing latest {Math.min(rows.length, 500)} submissions.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="outline" className="rounded-full bg-transparent" asChild>
              <Link href="/admin">Back</Link>
            </Button>
            <Button className="rounded-full" asChild>
              <a href={csvHref} download={`pgf-applications-${new Date().toISOString().slice(0, 10)}.csv`}>
                Download CSV
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="surface hairline overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/60 bg-muted/30">
              <tr className="text-muted-foreground">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Track</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? (
                rows.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 last:border-b-0">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.createdAt.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.track}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.name}</td>
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.phone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{r.location || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-8 text-muted-foreground" colSpan={6}>
                    No applications yet. Submit the Apply form to see entries here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
