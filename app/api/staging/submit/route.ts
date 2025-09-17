import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const email = formData.get('email') as string;
    const propertyType = formData.get('propertyType') as string;
    const roomType = formData.get('roomType') as string;
    const images = formData.getAll('images') as File[];
    
    // Validate required fields
    if (!email || !propertyType || !roomType) {
      return NextResponse.json(
        { ok: false, error: 'Email, property type, and room type are required' },
        { status: 400 }
      );
    }

    if (images.length === 0) {
      return NextResponse.json(
        { ok: false, error: 'At least one image is required' },
        { status: 400 }
      );
    }

    // Generate unique request ID
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const requestId = `VSR-${randomId}-${timestamp}`;

    // TODO: Process images and call staging provider API
    // For now, log the submission details
    
    console.log('Staging submission:', {
      requestId,
      email,
      propertyType,
      roomType,
      imageCount: images.length,
      imageSizes: images.map(img => ({ name: img.name, size: img.size }))
    });
    
    return NextResponse.json({ 
      ok: true, 
      requestId,
      message: 'Your virtual staging request has been submitted successfully'
    });
  } catch (error) {
    console.error('Staging submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}