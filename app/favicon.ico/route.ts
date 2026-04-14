import { readFile } from 'node:fs/promises'
import path from 'node:path'

export const runtime = 'nodejs'

export async function GET() {
  // Serve the PNG bytes at the conventional /favicon.ico path.
  // Most browsers accept PNG content here; this avoids stale/cached default favicons.
  const filePath = path.join(process.cwd(), 'public', 'pgf-svg.PNG')
  const bytes = await readFile(filePath)

  return new Response(bytes, {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  })
}

