export type ResendSendEmailInput = {
  from: string
  to: string | string[]
  subject: string
  text: string
  html?: string
  replyTo?: string
  tags?: Array<{ name: string; value: string }>
}

function isValidFrom(from: string) {
  const s = from.trim()
  if (!s) return false
  // Either "email@domain.com" or "Name <email@domain.com>"
  const plain = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/
  const named = /^.+<\s*[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+\s*>$/
  return plain.test(s) || named.test(s)
}

export function getResendFrom() {
  const envFrom = (process.env.RESEND_FROM || '').trim()
  if (isValidFrom(envFrom)) return envFrom

  const domain = (process.env.RESEND_DOMAIN || 'privilegegirlsfoundation.com').trim()
  return `Privilege Girls Foundation <noreply@${domain}>`
}

export async function resendSendEmail(input: ResendSendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      ok: false as const,
      status: 500,
      error: 'Missing RESEND_API_KEY',
      details: '',
    }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
      reply_to: input.replyTo,
      tags: input.tags,
    }),
  })

  if (!res.ok) {
    const details = await res.text().catch(() => '')
    return {
      ok: false as const,
      status: res.status,
      error: 'Resend request failed',
      details,
    }
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null
  return { ok: true as const, id: data?.id ?? null }
}

