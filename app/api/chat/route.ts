import { NextResponse } from 'next/server'

import { pickRelevantKbChunks } from '@/lib/pgf-kb'

export const runtime = 'nodejs'

type IncomingMessage = {
  role: 'user' | 'assistant'
  text: string
}

function cleanAssistantText(text: string) {
  // Strip common markdown styling that looks noisy in chat UI.
  // - Remove leading list markers like "* " or "- "
  // - Remove remaining asterisks used for emphasis
  return text
    .replace(/^\s*[*-]\s+/gm, '')
    .replaceAll('*', '')
    .trim()
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GROQ_API_KEY' },
      { status: 500 },
    )
  }

  let body: { messages?: IncomingMessage[] } | undefined
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const messages = body?.messages?.filter((m) => m?.text?.trim()) ?? []
  if (!messages.length) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')?.text ?? ''
  const relevant = pickRelevantKbChunks(lastUserMsg, 6)
  const kbBlock = relevant
    .map((c) => `### ${c.title}\n${c.content}`)
    .join('\n\n')

  const systemInstruction = `You are PGF Assistant for Privilege Girls Foundation (PGF).

You must use ONLY the information in the provided PGF platform knowledge base and the user's messages.
If the user asks for something that isn't in the knowledge base, say you don't have that detail and suggest contacting PGF via /contact.

Response rules:
- Be concise, warm, and practical.
- Prefer short paragraphs; use numbered steps when giving guidance.
- Include relevant page paths like /donate, /contact, /about when helpful.
- Do not invent details (fees, schedules, bank changes, new programmes, etc.).

PGF platform knowledge base (most relevant excerpts):
${kbBlock}`.trim()

  const model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
  const url = 'https://api.groq.com/openai/v1/chat/completions'

  const groqBody = {
    model,
    temperature: 0.3,
    max_tokens: 350,
    messages: [
      { role: 'system', content: systemInstruction },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.text,
      })),
    ],
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(groqBody),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    return NextResponse.json(
      { error: 'Groq request failed', status: res.status, details: text },
      { status: 502 },
    )
  }

  const data = (await res.json()) as any
  const replyText: string | undefined = data?.choices?.[0]?.message?.content

  if (!replyText) {
    return NextResponse.json(
      { error: 'No reply returned from Groq' },
      { status: 502 },
    )
  }

  return NextResponse.json({ text: cleanAssistantText(replyText) })
}

