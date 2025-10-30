import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/beta-seats?metro=Miami
 * Returns available seats for a specific metro area
 * Public endpoint (read-only)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const metro = searchParams.get('metro');

    if (!metro) {
      return NextResponse.json(
        { error: 'Metro parameter is required' },
        { status: 400 }
      );
    }

    // Query Supabase for the metro's seat availability
    const { data, error } = await supabase
      .from('beta_seats')
      .select('total_seats, claimed_seats, updated_at')
      .eq('metro', metro)
      .single();

    if (error) {
      // If metro doesn't exist, return default values
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          metro,
          total: 10,
          claimed: 0,
          available: 10,
          updated_at: new Date().toISOString(),
        });
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch seat data' },
        { status: 500 }
      );
    }

    const available = data.total_seats - data.claimed_seats;

    return NextResponse.json({
      metro,
      total: data.total_seats,
      claimed: data.claimed_seats,
      available,
      updated_at: data.updated_at,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
