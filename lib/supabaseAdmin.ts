// lib/supabaseAdmin.ts
// Server-only Supabase client (uses SERVICE ROLE). Do NOT import in client components.

import { createClient } from '@supabase/supabase-js'

// Read from env (service role must never be exposed to the browser)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

// Helper: allow routes to guard when local env isn’t configured
export const isSupabaseConfigured =
  Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE)

// Export a server-only admin client when configured; otherwise a typed null
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE!, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : (null as unknown as ReturnType<typeof createClient>)