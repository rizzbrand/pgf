type Brand = {
  name: string
  siteUrl: string
  accent: string
  bg: string
  card: string
  text: string
  muted: string
  border: string
}

const PGF_BRAND: Brand = {
  name: 'Privilege Girls Foundation',
  siteUrl: 'https://privilegegirlsfoundation.com',
  accent: '#ffd800',
  bg: '#f6eae3',
  card: '#fffcf8',
  text: '#2a152c',
  muted: '#5c4a5e',
  border: '#cfc8d0',
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0; color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; width:34%; vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0; color:${PGF_BRAND.text}; font-size:14px; line-height:1.5; vertical-align:top;">
        ${escapeHtml(value || '—')}
      </td>
    </tr>
  `.trim()
}

function baseEmail({
  preheader,
  title,
  subtitle,
  bodyHtml,
  cta,
  footerNote,
}: {
  preheader: string
  title: string
  subtitle?: string
  bodyHtml: string
  cta?: { label: string; href: string }
  footerNote?: string
}) {
  const pre = escapeHtml(preheader)
  const sub = subtitle ? `<p style="margin:10px 0 0; color:${PGF_BRAND.muted}; font-size:14px; line-height:1.6;">${escapeHtml(subtitle)}</p>` : ''
  const ctaHtml = cta
    ? `
      <div style="margin-top:18px;">
        <a href="${cta.href}" style="display:inline-block; background:${PGF_BRAND.text}; color:${PGF_BRAND.bg}; text-decoration:none; padding:12px 16px; border-radius:999px; font-size:14px; font-weight:600;">
          ${escapeHtml(cta.label)}
        </a>
      </div>
    `.trim()
    : ''
  const footer = footerNote
    ? `<p style="margin:18px 0 0; color:${PGF_BRAND.muted}; font-size:12px; line-height:1.6;">${escapeHtml(footerNote)}</p>`
    : ''

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background:${PGF_BRAND.bg}; color:${PGF_BRAND.text}; font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      ${pre}
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${PGF_BRAND.bg}; padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px; width:100%;">
            <tr>
              <td style="padding:0 8px 14px;">
                <div style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
                  <div style="font-weight:700; letter-spacing:-0.02em;">${escapeHtml(PGF_BRAND.name)}</div>
                  <div style="height:1px; flex:1; background:linear-gradient(90deg, transparent, ${PGF_BRAND.accent}, transparent); opacity:0.55;"></div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="background:${PGF_BRAND.card}; border:1px solid ${PGF_BRAND.border}; border-radius:18px; padding:22px 20px;">
                <h1 style="margin:0; font-size:22px; line-height:1.25; letter-spacing:-0.01em;">${escapeHtml(title)}</h1>
                ${sub}
                <div style="margin-top:18px;">
                  ${bodyHtml}
                </div>
                ${ctaHtml}
                ${footer}
              </td>
            </tr>
            <tr>
              <td style="padding:14px 8px 0; color:${PGF_BRAND.muted}; font-size:12px; line-height:1.6; text-align:center;">
                North Legon, Accra, Ghana ·
                <a href="${PGF_BRAND.siteUrl}" style="color:${PGF_BRAND.text}; text-decoration:none;">${PGF_BRAND.siteUrl.replace('https://', '')}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim()
}

export function renderContactOwnerEmail(input: {
  topic: string
  name: string
  email: string
  phone?: string
  message: string
}) {
  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid ${PGF_BRAND.border}; margin-top:10px;">
      ${renderRow('Topic', input.topic)}
      ${renderRow('Name', input.name)}
      ${renderRow('Email', input.email)}
      ${renderRow('Phone', input.phone || '—')}
    </table>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Message</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.message)}</div>
    </div>
  `.trim()

  return baseEmail({
    preheader: `New contact message: ${input.topic}`,
    title: 'New message from the website',
    subtitle: 'Contact form submission',
    bodyHtml: body,
    cta: { label: 'Open Contact page', href: `${PGF_BRAND.siteUrl}/contact` },
  })
}

export function renderContactReceiptEmail(input: { name: string; topic: string; message: string }) {
  const body = `
    <p style="margin:0; font-size:14px; line-height:1.7; color:${PGF_BRAND.text};">
      Hi ${escapeHtml(input.name)},<br/>
      Thanks for reaching out. We’ve received your message and will reply as soon as we can.
    </p>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Your message</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.message)}</div>
    </div>
  `.trim()

  return baseEmail({
    preheader: 'We received your message to PGF',
    title: 'We received your message',
    subtitle: `Topic: ${input.topic}`,
    bodyHtml: body,
    footerNote: 'If you need to add more information, simply reply to this email.',
    cta: { label: 'Visit PGF Contact', href: `${PGF_BRAND.siteUrl}/contact` },
  })
}

export function renderDonateOwnerEmail(input: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid ${PGF_BRAND.border}; margin-top:10px;">
      ${renderRow('Name', input.name)}
      ${renderRow('Email', input.email)}
      ${renderRow('Phone', input.phone || '—')}
    </table>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Message</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.message)}</div>
    </div>
  `.trim()

  return baseEmail({
    preheader: 'New donate/support enquiry',
    title: 'New support / donation enquiry',
    subtitle: 'Donation form submission',
    bodyHtml: body,
    cta: { label: 'Open Donate page', href: `${PGF_BRAND.siteUrl}/donate` },
  })
}

export function renderDonateReceiptEmail(input: { name: string; message: string }) {
  const body = `
    <p style="margin:0; font-size:14px; line-height:1.7; color:${PGF_BRAND.text};">
      Hi ${escapeHtml(input.name)},<br/>
      Thank you for your interest in supporting PGF. We’ve received your message and will reply with next steps.
    </p>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Your message</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.message)}</div>
    </div>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Donation details (reference)</div>
      <div style="font-size:14px; line-height:1.7; color:${PGF_BRAND.text};">
        Bank: ECOBANK GHANA<br/>
        Account name: Privilege Girls Foundation<br/>
        Account number: <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">1441004988219</span><br/>
        Preferred platform: Paystack or Flutterwave
      </div>
    </div>
  `.trim()

  return baseEmail({
    preheader: 'Thanks for supporting PGF',
    title: 'Thanks for supporting PGF',
    subtitle: 'We received your message',
    bodyHtml: body,
    footerNote: 'If you have questions, just reply to this email.',
    cta: { label: 'Visit Donate', href: `${PGF_BRAND.siteUrl}/donate` },
  })
}

export function renderApplyOwnerEmail(input: {
  track: string
  name: string
  email: string
  phone: string
  age?: string
  location?: string
  availability?: string
  experience?: string
  message?: string
}) {
  const body = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid ${PGF_BRAND.border}; margin-top:10px;">
      ${renderRow('Track', input.track)}
      ${renderRow('Name', input.name)}
      ${renderRow('Email', input.email)}
      ${renderRow('Phone', input.phone)}
      ${renderRow('Age', input.age || '—')}
      ${renderRow('Location', input.location || '—')}
      ${renderRow('Availability', input.availability || '—')}
    </table>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Experience / background</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.experience || '—')}</div>
    </div>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Message</div>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${escapeHtml(input.message || '—')}</div>
    </div>
  `.trim()

  return baseEmail({
    preheader: `New application: ${input.track}`,
    title: 'New PGF application',
    subtitle: 'Application form submission',
    bodyHtml: body,
    cta: { label: 'Open Apply page', href: `${PGF_BRAND.siteUrl}/apply` },
  })
}

export function renderApplyReceiptEmail(input: { name: string; track: string }) {
  const body = `
    <p style="margin:0; font-size:14px; line-height:1.7; color:${PGF_BRAND.text};">
      Hi ${escapeHtml(input.name)},<br/>
      Thanks for applying to Privilege Girls Foundation (PGF). We’ve received your application and will follow up with next steps.
    </p>
    <div style="margin-top:14px; padding:14px; border:1px solid ${PGF_BRAND.border}; border-radius:14px; background:#ffffff;">
      <div style="color:${PGF_BRAND.muted}; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:8px;">Track</div>
      <div style="font-size:14px; line-height:1.6;">${escapeHtml(input.track)}</div>
    </div>
  `.trim()

  return baseEmail({
    preheader: 'We received your PGF application',
    title: 'We received your application',
    subtitle: 'Confirmation',
    bodyHtml: body,
    footerNote: 'If you need to add more information, reply to this email.',
    cta: { label: 'Visit Apply page', href: `${PGF_BRAND.siteUrl}/apply` },
  })
}

