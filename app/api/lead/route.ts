import { NextRequest, NextResponse } from 'next/server';
import { sanitizeASCII } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate and sanitize required fields
    const email = sanitizeASCII(body.email);
    const name = sanitizeASCII(body.name);
    const phone = sanitizeASCII(body.phone);
    const message = sanitizeASCII(body.message);
    
    if (!email || !name) {
      return NextResponse.json(
        { ok: false, error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // TODO: Integrate with HubSpot API
    // For now, return success response
    
    console.log('Lead submission:', { email, name, phone, message });
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}