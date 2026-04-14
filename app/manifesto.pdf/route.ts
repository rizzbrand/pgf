import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export const runtime = 'nodejs'

const MANIFESTO_TEXT = `PRIVILEGE GIRLS FOUNDATION (PGF)
MANIFESTO

We believe a girl’s future should not be limited by poverty, circumstance, or silence.
We believe dignity is practical: it looks like skills, safety, support, and real options.
We believe opportunity must be delivered, not promised.

Our mission
PGF exists to empower girls and women through vocational training, mentorship, and practical support—so they can earn income, build stable lives, and lead with confidence.

What we stand for
1) Dignity first
   - Every participant is treated with respect, privacy, and care.
   - No exploitation. No shame. No performative “saving.”

2) Skills that pay
   - Training must connect to real work and real income.
   - We focus on practical, market-relevant skills with clear next steps.

3) Support that follows through
   - Training is the beginning, not the finish line.
   - We back learning with tools, guidance, and pathways to launch.

4) Safe, human-centered programs
   - We prioritize wellbeing, safety, and a learning environment built on trust.
   - We listen, adapt, and respond to real needs on the ground.

5) Community and mentorship
   - We build confidence through coaching, role models, and peer support.
   - We help participants navigate life and work with clarity and courage.

6) Integrity and accountability
   - We steward donations responsibly and transparently.
   - We measure what matters: skills gained, livelihoods started, stability improved.

How we do the work
- Vocational tracks (e.g., hairdressing and fashion)
- Materials and toolkits to practice and launch
- Mentorship, guidance, and practical life skills
- Partnerships that provide placements, resources, and market access

A pledge to our supporters
If you give, we will honor your gift with care, clarity, and impact.
We will keep our focus on outcomes and people—not optics.

A pledge to our participants
You are not a statistic. You are not a project.
You belong in rooms where your voice matters and your work is valued.
We will walk with you as you build a future you can own.

Join us
Donate, partner, sponsor a cohort, or contribute tools and materials.

Website: https://privilegegirlsfoundation.com
Email: info@privilegegirlsfoundation.com
`

async function renderManifestoPdfBytes() {
  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle('PGF Manifesto')
  pdfDoc.setAuthor('Privilege Girls Foundation')
  pdfDoc.setSubject('Privilege Girls Foundation Manifesto')

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // A4 size in points
  const pageWidth = 595.28
  const pageHeight = 841.89
  const margin = 56

  const titleSize = 18
  const subtitleSize = 12
  const bodySize = 11
  const lineHeight = 15
  const textColor = rgb(0x2a / 255, 0x15 / 255, 0x2c / 255)
  const mutedColor = rgb(0x5c / 255, 0x4a / 255, 0x5e / 255)

  const wrap = (text: string, maxWidth: number) => {
    const normalized = text.replace(/\r\n/g, '\n')
    const paragraphs = normalized.split('\n')
    const lines: string[] = []

    for (const paragraph of paragraphs) {
      if (!paragraph.trim()) {
        lines.push('')
        continue
      }

      const words = paragraph.split(/\s+/).filter(Boolean)
      let current = ''
      for (const w of words) {
        const next = current ? `${current} ${w}` : w
        const width = fontRegular.widthOfTextAtSize(next, bodySize)
        if (width <= maxWidth) {
          current = next
        } else {
          if (current) lines.push(current)
          current = w
        }
      }
      if (current) lines.push(current)
    }
    return lines
  }

  const contentWidth = pageWidth - margin * 2
  const bodyLines = wrap(MANIFESTO_TEXT, contentWidth)

  let page = pdfDoc.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  page.drawText('Privilege Girls Foundation (PGF)', {
    x: margin,
    y: y - titleSize,
    size: titleSize,
    font: fontBold,
    color: textColor,
  })
  y -= titleSize + 10

  page.drawText('Manifesto', {
    x: margin,
    y: y - subtitleSize,
    size: subtitleSize,
    font: fontBold,
    color: mutedColor,
  })
  y -= subtitleSize + 18

  for (const line of bodyLines) {
    if (y - lineHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight])
      y = pageHeight - margin
    }

    if (!line) {
      y -= lineHeight
      continue
    }

    page.drawText(line, {
      x: margin,
      y: y - bodySize,
      size: bodySize,
      font: fontRegular,
      color: textColor,
    })
    y -= lineHeight
  }

  return await pdfDoc.save()
}

export async function GET() {
  const bytes = await renderManifestoPdfBytes()
  return new Response(bytes, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'attachment; filename="PGF-Manifesto.pdf"',
      'cache-control': 'public, max-age=3600',
    },
  })
}
