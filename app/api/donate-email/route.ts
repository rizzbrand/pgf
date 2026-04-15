import { NextResponse } from 'next/server'

import { getResendFrom, resendSendEmail } from '@/lib/resend'
import { renderDonateOwnerEmail, renderDonateReceiptEmail } from '@/lib/email-templates'
import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'

type DonatePayload = {
  name: string
  email: string
  phone?: string
  message: string
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 })
}

export async function POST(req: Request) {
  const prisma = getPrisma()
  let body: DonatePayload
  try {
    body = (await req.json()) as DonatePayload
  } catch {
    return badRequest('Invalid JSON')
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const message = String(body.message || '').trim()

  if (!name || !email || !message) {
    return badRequest('Missing required fields')
  }

  // Persist for admin dashboard (best-effort; do not fail submission).
  try {
    await prisma.donateSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    })
  } catch {
    // no-op
  }

  const to = process.env.DONATIONS_INBOX || 'info@privilegegirlsfoundation.com'
  const from = getResendFrom()

  const subject = `PGF Donate / Support enquiry — ${name}`
  const text = [
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
    html: renderDonateOwnerEmail({ name, email, phone, message }),
    replyTo: email,
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'donate' },
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
    subject: 'Thanks for supporting PGF — we received your message',
    text: [
      `Hi ${name},`,
      '',
      'Thank you for your interest in supporting Privilege Girls Foundation (PGF). We’ve received your message and will reply with next steps.',
      '',
      'A copy of your message:',
      message,
      '',
      'Donation details (for reference)',
      'Bank: ECOBANK GHANA',
      'Account name: Privilege Girls Foundation',
      'Account number: 1441004988219',
      'Preferred platform: Paystack or Flutterwave',
      '',
      'PGF Contact',
      'Email: info@privilegegirlsfoundation.com',
      'Phone / WhatsApp: +233 203 427 795',
      'Website: https://privilegegirlsfoundation.com/donate',
    ].join('\n'),
    html: renderDonateReceiptEmail({ name, message }),
    replyTo: 'info@privilegegirlsfoundation.com',
    tags: [
      { name: 'source', value: 'website' },
      { name: 'type', value: 'donate-receipt' },
    ],
  })

  return NextResponse.json({
    ok: true,
    id: result.id,
    receiptSent: receipt.ok,
    receiptId: receipt.ok ? receipt.id : null,
  })
}

