import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/stats
 * Returns dashboard statistics
 * - Total signups
 * - Signups by status (pending, approved, rejected)
 * - Signups by metro
 * - Seat availability across metros
 * - Recent activity
 */
export async function GET(request: NextRequest) {
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

    // Get total signups
    const { count: totalSignups } = await supabaseAdmin
      .from('beta_signups')
      .select('*', { count: 'exact', head: true });

    // Get signups by status
    const { data: statusCounts } = await supabaseAdmin
      .from('beta_signups')
      .select('status')
      .then(({ data }) => {
        const counts = {
          pending: 0,
          approved: 0,
          rejected: 0,
        };
        data?.forEach((row: any) => {
          const status = row.status || 'pending';
          if (status in counts) {
            counts[status as keyof typeof counts]++;
          }
        });
        return { data: counts };
      });

    // Get signups by metro
    const { data: metroData } = await supabaseAdmin
      .from('beta_signups')
      .select('metro')
      .then(({ data }) => {
        const metroCounts: Record<string, number> = {};
        data?.forEach((row: any) => {
          const metro = row.metro || 'General';
          metroCounts[metro] = (metroCounts[metro] || 0) + 1;
        });
        return { data: metroCounts };
      });

    // Get seat availability by metro
    const { data: seatData } = await supabaseAdmin
      .from('beta_seats')
      .select('metro, total_seats, claimed_seats')
      .order('metro');

    // Get recent signups (last 10)
    const { data: recentSignups } = await supabaseAdmin
      .from('beta_signups')
      .select('id, first_name, last_name, email, metro, crm, status, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate ROI metrics (placeholder - will be real data in Phase D)
    const roiMetrics = {
      totalAppointmentsBooked: 0, // TODO: Connect to calendar API
      avgResponseTime: '< 2 min', // TODO: Calculate from engagement logs
      leadConversionRate: '0%', // TODO: Calculate from CRM data
      hoursSaved: 0, // TODO: Calculate based on automation
    };

    return NextResponse.json({
      overview: {
        totalSignups: totalSignups || 0,
        byStatus: statusCounts || { pending: 0, approved: 0, rejected: 0 },
        byMetro: metroData || {},
      },
      seats: seatData || [],
      recentSignups: recentSignups || [],
      roiMetrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
