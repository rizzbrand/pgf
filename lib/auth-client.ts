import { createAuthClient } from 'better-auth/react'

// Use same-origin requests to avoid cross-domain CORS preflights (www vs non-www).
export const authClient = createAuthClient()

