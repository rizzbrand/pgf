import { NextResponse } from 'next/server'

import { getResendFrom, resendSendEmail } from '@/lib/resend'

export const runtime = 'nodejs'

type ContactPayload = {
  topic: string
  name: string
  email: string
  phone?: string
  message: string
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 })
}

function toTagValue(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]+/g, '-') // Resend tag value constraint
    .replace(/-+/g, '-')
    .slice(0, 32)
}

export async function POST(req: Request) {
  let body: ContactPayload
  try {
    body = (await req.json()) as ContactPayload
  } catch {
    return badRequest('Invalid JSON')
  }

  const topic = String(body.topic || '').trim()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const message = String(body.message || '').trim()

  if (!topic || !name || !email || !message) {
    return badRequest('Missing required fields')
  }

  const to = process.env.CONTACT_INBOX || 'info@privilegegirlsfoundation.com'
  const from = getResendFrom()

  const subject = `PGF Contact — ${topic} — ${name}`
  const text = [
    `Topic: ${topic}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    '',
    message,
  ].join('\n')

  const result = await resendSendEmail({
    from,
    to,
    subject,
    text,
    replyTo: email,
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'contact' },
      { name: 'topic', value: toTagValue(topic) },
    ],
  })

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, status: result.status, details: result.details },
      { status: 502 },
    )
  }

  // Best-effort confirmation back to the user (do not fail the whole request).
  const receipt = await resendSendEmail({
    from,
    to: email,
    subject: 'We received your message — Privilege Girls Foundation',
    text: [
      `Hi ${name},`,
      '',
      'Thanks for reaching out to Privilege Girls Foundation (PGF). We’ve received your message and will reply as soon as we can.',
      '',
      `Topic: ${topic}`,
      '',
      'A copy of your message:',
      message,
      '',
      'PGF Contact',
      'Email: info@privilegegirlsfoundation.com',
      'Phone / WhatsApp: +233 203 427 795',
      'Location: North Legon, Accra, Ghana',
      'Website: https://privilegegirlsfoundation.com/contact',
    ].join('\n'),
    replyTo: 'info@privilegegirlsfoundation.com',
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'contact-receipt' },
    ],
  })

  return NextResponse.json({
    ok: true,
    id: result.id,
    receiptSent: receipt.ok,
    receiptId: receipt.ok ? receipt.id : null,
  })
}

