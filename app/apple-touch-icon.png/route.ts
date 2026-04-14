import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'pgf-svg.PNG')
  const bytes = await readFile(filePath)

  return new Response(bytes, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}

