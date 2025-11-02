import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_FEATURE_VIRTUAL_ISA: process.env.NEXT_PUBLIC_FEATURE_VIRTUAL_ISA,
    NEXT_PUBLIC_FEATURE_BETA_FORM: process.env.NEXT_PUBLIC_FEATURE_BETA_FORM,
    NEXT_PUBLIC_FEATURE_BETA_COUNTER: process.env.NEXT_PUBLIC_FEATURE_BETA_COUNTER,
    NEXT_PUBLIC_FEATURE_ADMIN: process.env.NEXT_PUBLIC_FEATURE_ADMIN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '(set)' : '(not set)',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '(set)' : '(not set)',
  });
}
