import { NextResponse } from 'next/server'

import { getResendFrom, resendSendEmail } from '@/lib/resend'
import { renderApplyOwnerEmail, renderApplyReceiptEmail } from '@/lib/email-templates'
import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'

type ApplyPayload = {
  track: 'Hairdressing' | 'Fashion' | 'Not sure'
  name: string
  email: string
  phone: string
  age?: string
  location?: string
  availability?: string
  experience?: string
  message?: string
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 })
}

export async function POST(req: Request) {
  const prisma = getPrisma()
  let body: ApplyPayload
  try {
    body = (await req.json()) as ApplyPayload
  } catch {
    return badRequest('Invalid JSON')
  }

  const track = String(body.track || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const age = String(body.age || '').trim()
  const location = String(body.location || '').trim()
  const availability = String(body.availability || '').trim()
  const experience = String(body.experience || '').trim()
  const message = String(body.message || '').trim()

  if (!track || !name || !email || !phone) {
    return badRequest('Missing required fields')
  }

  // Persist for admin dashboard (best-effort; do not fail submission).
  try {
    await prisma.applicationSubmission.create({
      data: {
        track,
        name,
        email,
        phone,
        age: age || null,
        location: location || null,
        availability: availability || null,
        experience: experience || null,
        message: message || null,
      },
    })
  } catch {
    // no-op
  }

  const to = process.env.APPLICATIONS_INBOX || process.env.CONTACT_INBOX || 'info@privilegegirlsfoundation.com'
  const from = getResendFrom()

  const subject = `PGF Application — ${track} — ${name}`
  const text = [
    `Track: ${track}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Age: ${age || '—'}`,
    `Location: ${location || '—'}`,
    `Availability: ${availability || '—'}`,
    '',
    'Experience / background:',
    experience || '—',
    '',
    'Message:',
    message || '—',
  ].join('\n')

  const result = await resendSendEmail({
    from,
    to,
    subject,
    text,
    html: renderApplyOwnerEmail({
      track,
      name,
      email,
      phone,
      age,
      location,
      availability,
      experience,
      message,
    }),
    replyTo: email,
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'apply' },
      { name: 'track', value: track.toLowerCase().replace(/[^a-z0-9_-]+/g, '-') },
    ],
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, status: result.status, details: result.details },
      { status: 502 },
    )
  }

  const receipt = await resendSendEmail({
    from,
    to: email,
    subject: 'We received your application — Privilege Girls Foundation',
    text: [
      `Hi ${name},`,
      '',
      'Thanks for applying to Privilege Girls Foundation (PGF). We’ve received your application and will follow up with next steps.',
      '',
      `Track: ${track}`,
      '',
      'Your details:',
      `Phone: ${phone}`,
      `Location: ${location || '—'}`,
      '',
      'PGF Contact',
      'Email: info@privilegegirlsfoundation.com',
      'Phone / WhatsApp: +233 203 427 795',
      'Website: https://privilegegirlsfoundation.com/apply',
    ].join('\n'),
    html: renderApplyReceiptEmail({ name, track }),
    replyTo: 'info@privilegegirlsfoundation.com',
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'apply-receipt' },
    ],
  })

  return NextResponse.json({
    ok: true,
    id: result.id,
    receiptSent: receipt.ok,
    receiptId: receipt.ok ? receipt.id : null,
  })
}

