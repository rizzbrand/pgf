export type PgfKbChunk = {
  id: string
  title: string
  tags: string[]
  content: string
}

/**
 * Curated knowledge base derived from the current PGF site.
 * Keep this updated whenever site copy, contact details, or donation info changes.
 */
export const PGF_KB: PgfKbChunk[] = [
  {
    id: 'core',
    title: 'PGF overview',
    tags: ['pgf', 'overview', 'mission', 'vision'],
    content: `
Privilege Girls Foundation (PGF) is based in Ghana.

PGF sponsors young women (roughly ages 18–35) through fully funded vocational training in:
- Hairdressing
- Fashion

PGF supports women beyond graduation until they are stable and earning. The focus is skills + follow-through, so women can run real businesses.
`.trim(),
  },
  {
    id: 'contact',
    title: 'Contact details',
    tags: ['contact', 'email', 'phone', 'whatsapp', 'location', 'accra', 'north legon'],
    content: `
Official email: info@privilegegirlsfoundation.com
Phone / WhatsApp: +233 203 427 795
Location: North Legon, Accra, Ghana

Contact page: /contact
`.trim(),
  },
  {
    id: 'donate-overview',
    title: 'How to donate / support PGF',
    tags: ['donate', 'support', 'giving', 'csr', 'partner', 'in-kind'],
    content: `
PGF is funded through:
- Corporate partnerships / CSR sponsorships
- Individual giving (one-time or recurring)
- In-kind support (tools, fabrics, salon equipment, professional services)

Donation page: /donate
`.trim(),
  },
  {
    id: 'donate-where-funds-go',
    title: 'Where support goes',
    tags: ['donate', 'impact', 'funds', 'training', 'materials', 'accommodation', 'business'],
    content: `
Where your support goes:
- Vocational training fees and certification
- Materials and tools for hairdressing and fashion
- Safe accommodation during the programme
- Business setup and follow-through after graduation
`.trim(),
  },
  {
    id: 'payments',
    title: 'Bank and payment details',
    tags: ['donate', 'payments', 'bank', 'account', 'ecobank', 'paystack', 'flutterwave'],
    content: `
Bank name: ECOBANK GHANA
Account name: Privilege Girls Foundation
Account number: 1441004988219
Mobile money: Not yet
Preferred payment platform: Paystack or Flutterwave
`.trim(),
  },
  {
    id: 'site-navigation',
    title: 'Website pages',
    tags: ['website', 'pages', 'navigation', 'links'],
    content: `
Key pages:
- Home: /
- About: /about
- Donate: /donate
- Contact: /contact
`.trim(),
  },
]

function tokenize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+/#\s-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

export function pickRelevantKbChunks(query: string, limit = 6) {
  const q = tokenize(query)
  if (!q.length) return PGF_KB.slice(0, limit)

  const scored = PGF_KB.map((chunk) => {
    const hay = tokenize(`${chunk.title} ${chunk.tags.join(' ')} ${chunk.content}`)
    const set = new Set(hay)
    let score = 0
    for (const t of q) {
      if (set.has(t)) score += 3
      // slight boost for partial matches (e.g., "whatsapp" vs "whatsApp" already normalized)
      if (t.length >= 5 && hay.some((h) => h.startsWith(t) || t.startsWith(h))) score += 1
    }
    return { chunk, score }
  })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.chunk)

  return scored.slice(0, limit)
}

