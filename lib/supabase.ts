import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for browser/public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations (API routes only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Type definitions for beta_seats table
export interface BetaSeat {
  id: string;
  metro: string;
  total_seats: number;
  claimed_seats: number;
  updated_at: string;
}

// Type definitions for beta_signups table
export interface BetaSignup {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  brokerage: string;
  crm: string;
  lead_volume: string;
  metro?: string;
  referral_source?: string;
  created_at: string;
}
