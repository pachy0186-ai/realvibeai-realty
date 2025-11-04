// lib/supabaseAdmin.ts
<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-only client with service role key for trusted operations.
export const supabaseAdmin = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false },
});
=======
// Server-only Supabase client (uses SERVICE ROLE). Do NOT import in client components.

import { createClient } from '@supabase/supabase-js'

// Read from env (service role must never be exposed to the browser)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE

// Optional helper you can use in API routes to guard execution
export const isSupabaseConfigured = (): boolean =>
  Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE)

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  // Don't crash the build; warn so Preview can still compile.
  // Your API routes should call isSupabaseConfigured() before using the client.
  console.warn(
    '[supabaseAdmin] Missing env vars: ' +
      `${!SUPABASE_URL ? 'NEXT_PUBLIC_SUPABASE_URL ' : ''}` +
      `${!SUPABASE_SERVICE_ROLE ? 'SUPABASE_SERVICE_ROLE ' : ''}`.trim()
  )
}

/**
 * Admin (service-role) client for server-side code only:
 * - Use inside /app/api/* route handlers or server utilities.
 * - Never import from client components.
 */
export const supabaseAdmin = SUPABASE_URL && SUPABASE_SERVICE_ROLE
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false },
      global: {
        headers: {
          'X-Client-Info': 'realvibeai-realty/admin',
        },
      },
    })
  // Fallback dummy client to avoid undefined imports; guard with isSupabaseConfigured()
  : (null as unknown as ReturnType<typeof createClient>)
>>>>>>> c07b372 (wip: local edits)
