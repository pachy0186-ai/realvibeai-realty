import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/applicants
 * Returns all beta applicants with optional filtering
 * Query params:
 *   - status: pending | approved | rejected
 *   - metro: filter by metro area
 *   - limit: number of results (default 50)
 *   - offset: pagination offset
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add proper admin authentication
    // For now, check for a simple admin token
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_API_TOKEN;
    
    if (adminToken && authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const metro = searchParams.get('metro');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('beta_signups')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    if (metro) {
      query = query.eq('metro', metro);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applicants' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      applicants: data || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/applicants
 * Update applicant status (approve/reject)
 * Body: { id: string, status: 'approved' | 'rejected', notes?: string }
 */
export async function PATCH(request: NextRequest) {
  try {
    // TODO: Add proper admin authentication
    const authHeader = request.headers.get('authorization');
    const adminToken = process.env.ADMIN_API_TOKEN;
    
    if (adminToken && authHeader !== `Bearer ${adminToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: approved, rejected, or pending' },
        { status: 400 }
      );
    }

    // Update the applicant status
    const { data, error } = await supabaseAdmin
      .from('beta_signups')
      .update({
        status,
        admin_notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update applicant' },
        { status: 500 }
      );
    }

    // TODO: Phase D - Send approval/rejection email

    return NextResponse.json({
      success: true,
      applicant: data,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
