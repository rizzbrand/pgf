'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  text: "Hi — I'm here to help you learn about Privilege Girls Foundation: programmes, donations, partnerships, and how to apply. Ask me anything. (This chat is a UI preview — hook up your AI when you're ready.)",
}

const DEMO_REPLIES = [
  'Thanks for your message. In a live setup, this would connect to your AI or FAQ. For programme details, visit Programs on the site or use Contact.',
  "I'd recommend checking our Impact section for outcomes, and /donate if you'd like to support training. Want a direct link to the contact form?",
  'PGF focuses on vocational training and follow-through so women can run real businesses. Explore the site for hairdressing and fashion tracks.',
]

export function PgfChatWidget() {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])
  const [pending, setPending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const scrollToEnd = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    if (open) scrollToEnd()
  }, [open, messages, pending, scrollToEnd])

  const send = useCallback(() => {
    const text = input.trim()
    if (!text || pending) return

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
    }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setPending(true)

    window.setTimeout(() => {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)]!,
      }
      setMessages((m) => [...m, reply])
      setPending(false)
    }, 700)
  }, [input, pending])

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end p-4 pb-5 sm:p-6">
        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <Button
            type="button"
            size="lg"
            onClick={() => setOpen(true)}
            className={cn(
              'h-14 w-14 rounded-full p-0 shadow-lg shadow-[color-mix(in_srgb,var(--pgf-dark-purple)_45%,transparent)]',
              'bg-[var(--pgf-dark-purple)] text-[var(--pgf-off-white)] ring-2 ring-[var(--pgf-yellow)]/35 ring-offset-2 ring-offset-[var(--background)]',
              'hover:bg-[color-mix(in_srgb,var(--pgf-dark-purple)_88%,black)] focus-visible:ring-[var(--pgf-yellow)]',
            )}
            aria-label="Open PGF assistant chat"
            aria-expanded={open}
            aria-controls={titleId}
          >
            <span className="relative flex size-8 items-center justify-center">
              <MessageCircle className="size-7" strokeWidth={1.75} aria-hidden />
           
            </span>
          </Button>
          <span className="sr-only sm:not-sr-only sm:rounded-full sm:bg-card/95 sm:px-3 sm:py-1 sm:text-[11px] sm:font-medium sm:text-muted-foreground sm:shadow-sm sm:ring-1 sm:ring-border/60">
            Ask PGF
          </span>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            'flex max-h-[min(560px,85vh)] min-h-0 w-full max-w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-md',
            'border-border/80 bg-[var(--pgf-off-white)] shadow-2xl',
          )}
        >
          <DialogHeader
            className={cn(
              'shrink-0 space-y-0 border-b border-white/10 bg-[var(--pgf-dark-purple)] px-4 py-4 text-left',
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Sparkles className="size-5 text-[var(--pgf-yellow)]" aria-hidden />
                </div>
                <div>
                  <DialogTitle
                    id={titleId}
                    className="font-serif text-lg text-[var(--pgf-off-white)] leading-tight"
                  >
                    PGF Assistant
                  </DialogTitle>
                  <DialogDescription className="text-xs text-white/65">
                    Quick answers · demo replies
                  </DialogDescription>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full text-[var(--pgf-off-white)] hover:bg-white/10 hover:text-[var(--pgf-off-white)]"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X className="size-5" />
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="h-72 min-h-0 flex-1 px-3 py-4 sm:h-80">
            <div className="flex flex-col gap-3 pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm',
                    m.role === 'user'
                      ? 'ml-auto bg-[var(--pgf-dark-purple)] text-[var(--pgf-off-white)]'
                      : 'mr-auto border border-border/60 bg-card text-foreground',
                  )}
                >
                  {m.text}
                </div>
              ))}
              {pending && (
                <div className="mr-auto flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3.5 py-2.5 text-sm text-muted-foreground">
                  <span className="flex gap-1">
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-[var(--pgf-bright-purple)] [animation-delay:-0.2s]" />
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-[var(--pgf-bright-purple)] [animation-delay:-0.1s]" />
                    <span className="inline-block size-1.5 animate-bounce rounded-full bg-[var(--pgf-bright-purple)]" />
                  </span>
                  Thinking…
                </div>
              )}
              <div ref={endRef} />
            </div>
          </ScrollArea>

          <div className="shrink-0 border-t border-border/70 bg-card/50 p-3">
            <div className="flex gap-2 rounded-2xl border border-border/80 bg-background p-1.5 shadow-inner">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Message…"
                rows={1}
                className="min-h-[44px] max-h-28 resize-none border-0 bg-transparent px-3 py-2.5 text-sm shadow-none focus-visible:ring-0"
                disabled={pending}
              />
              <Button
                type="button"
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl bg-[var(--pgf-dark-purple)] text-[var(--pgf-off-white)] hover:bg-[color-mix(in_srgb,var(--pgf-dark-purple)_88%,black)] disabled:opacity-40"
                onClick={send}
                disabled={pending || !input.trim()}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              UI only — no data is sent to a server.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
