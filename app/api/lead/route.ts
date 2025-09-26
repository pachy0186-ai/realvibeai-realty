import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { email, name, phone, company, leadVolume, message, interests } = body;
    
    if (!email || !name) {
      return NextResponse.json(
        { ok: false, error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Create lead data object
    const leadData = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      leadVolume: leadVolume || '',
      message: message || '',
      interests: interests || [],
      submittedAt: new Date().toISOString(),
      source: 'website_contact_form'
    };

    // Get the contact email from environment variables
    const contactEmail = process.env.CONTACT_TO || 'realvibeairealty@gmail.com';
    
    // Log the lead submission (in production, this would go to a database or CRM)
    console.log('Lead submission received:', leadData);
    console.log('Contact email for notifications:', contactEmail);
    
    // TODO: In production, integrate with:
    // - Email service (SendGrid, Mailgun, etc.) to send notifications to contactEmail
    // - CRM system (HubSpot, Salesforce, etc.) to store lead
    // - Database to persist lead data
    
    // For now, simulate successful processing
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Lead submitted successfully',
      leadId: `lead_${Date.now()}`
    });
    
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
