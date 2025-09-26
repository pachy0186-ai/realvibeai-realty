import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, name, phone, message } = body;
    
    if (!email || !name || !message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create contact data object
    const contactData = {
      name,
      email,
      phone: phone || '',
      message,
      submittedAt: new Date().toISOString(),
      source: 'website_contact_form'
    };

    // Get the contact email from environment variables
    const contactEmail = process.env.CONTACT_TO || 'realvibeairealty@gmail.com';
    
    // Log the contact submission (in production, this would go to email/CRM)
    console.log('Contact form submission received:', contactData);
    console.log('Contact email for notifications:', contactEmail);
    
    // TODO: In production, integrate with:
    // - Email service (SendGrid, Mailgun, etc.) to send to contactEmail
    // - CRM system (HubSpot, Salesforce, etc.) to store contact
    // - Database to persist contact data
    
    // For now, simulate successful processing
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Contact form submitted successfully',
      contactId: `contact_${Date.now()}`
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
