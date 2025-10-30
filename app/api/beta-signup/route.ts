import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for beta signup
const betaSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  brokerage: z.string().min(1, 'Brokerage/team name is required'),
  crm: z.string().min(1, 'CRM selection is required'),
  leadVolume: z.string().min(1, 'Lead volume is required'),
  metro: z.string().optional(),
  referralSource: z.string().optional(),
});

/**
 * POST /api/beta-signup
 * Handles beta program signup submissions
 * - Validates input
 * - Checks seat availability
 * - Creates signup record
 * - Increments claimed_seats counter
 * - Sends confirmation email (TODO: Phase C)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = betaSignupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const metro = data.metro || 'General'; // Default metro if not provided

    // Check if email already exists
    const { data: existingSignup } = await supabaseAdmin
      .from('beta_signups')
      .select('id')
      .eq('email', data.email)
      .single();

    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email has already been registered for the beta program' },
        { status: 409 }
      );
    }

    // Check seat availability for the metro
    const { data: seatData, error: seatError } = await supabaseAdmin
      .from('beta_seats')
      .select('total_seats, claimed_seats')
      .eq('metro', metro)
      .single();

    // If metro doesn't exist, create it with default values
    if (seatError && seatError.code === 'PGRST116') {
      const { error: insertError } = await supabaseAdmin
        .from('beta_seats')
        .insert({
          metro,
          total_seats: 10,
          claimed_seats: 0,
        });

      if (insertError) {
        console.error('Failed to create metro seat record:', insertError);
        return NextResponse.json(
          { error: 'Failed to process signup' },
          { status: 500 }
        );
      }
    } else if (seatError) {
      console.error('Supabase error:', seatError);
      return NextResponse.json(
        { error: 'Failed to check seat availability' },
        { status: 500 }
      );
    }

    // Check if seats are still available
    if (seatData && seatData.claimed_seats >= seatData.total_seats) {
      return NextResponse.json(
        {
          error: 'No seats available',
          message: `All ${seatData.total_seats} beta seats for ${metro} have been claimed. Join the waitlist?`,
        },
        { status: 409 }
      );
    }

    // Create the signup record
    const { data: signup, error: signupError } = await supabaseAdmin
      .from('beta_signups')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        brokerage: data.brokerage,
        crm: data.crm,
        lead_volume: data.leadVolume,
        metro: metro,
        referral_source: data.referralSource,
      })
      .select()
      .single();

    if (signupError) {
      console.error('Failed to create signup:', signupError);
      return NextResponse.json(
        { error: 'Failed to process signup' },
        { status: 500 }
      );
    }

    // Increment claimed_seats counter
    const { error: updateError } = await supabaseAdmin
      .from('beta_seats')
      .update({
        claimed_seats: (seatData?.claimed_seats || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('metro', metro);

    if (updateError) {
      console.error('Failed to update seat count:', updateError);
      // Don't fail the request, signup was successful
    }

    // TODO: Phase C - Send confirmation email via Resend
    // await sendBetaConfirmationEmail(data.email, data.firstName);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for beta program',
        data: {
          id: signup.id,
          email: signup.email,
          metro: signup.metro,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/beta-signup
 * Returns signup statistics (admin only, for dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check

    const { count, error } = await supabaseAdmin
      .from('beta_signups')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch signup count' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total_signups: count || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
