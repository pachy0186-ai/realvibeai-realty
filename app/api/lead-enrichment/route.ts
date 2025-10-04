import { NextRequest, NextResponse } from 'next/server';

interface LeadEnrichmentData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

interface EnrichedLead {
  originalData: LeadEnrichmentData;
  enrichedData: {
    linkedinProfile?: string;
    facebookProfile?: string;
    companyInfo?: {
      name: string;
      industry: string;
      size: string;
    };
    socialPresence: {
      hasLinkedIn: boolean;
      hasFacebook: boolean;
      professionalScore: number;
    };
  };
  enrichmentStatus: 'success' | 'partial' | 'failed';
  timestamp: string;
}

// Mock enrichment function - in production, this would integrate with:
// - LinkedIn Sales Navigator API
// - Facebook Graph API  
// - Company databases like Clearbit, ZoomInfo, etc.
function enrichLeadData(data: LeadEnrichmentData): EnrichedLead {
  const enriched: EnrichedLead = {
    originalData: data,
    enrichedData: {
      socialPresence: {
        hasLinkedIn: false,
        hasFacebook: false,
        professionalScore: 0,
      },
    },
    enrichmentStatus: 'partial',
    timestamp: new Date().toISOString(),
  };

  // Mock LinkedIn profile detection based on email domain
  const emailDomain = data.email.split('@')[1]?.toLowerCase();
  const businessDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  
  if (emailDomain && !businessDomains.includes(emailDomain)) {
    // Likely business email
    enriched.enrichedData.companyInfo = {
      name: emailDomain.split('.')[0].charAt(0).toUpperCase() + emailDomain.split('.')[0].slice(1),
      industry: 'Real Estate', // Default assumption for this use case
      size: 'Small Business',
    };
    enriched.enrichedData.socialPresence.professionalScore += 30;
  }

  // Mock social presence detection
  if (data.name && data.name.split(' ').length >= 2) {
    // Full name provided - higher chance of social profiles
    enriched.enrichedData.socialPresence.hasLinkedIn = Math.random() > 0.3; // 70% chance
    enriched.enrichedData.socialPresence.hasFacebook = Math.random() > 0.4; // 60% chance
    
    if (enriched.enrichedData.socialPresence.hasLinkedIn) {
      enriched.enrichedData.linkedinProfile = `https://linkedin.com/in/${data.name.toLowerCase().replace(' ', '-')}`;
      enriched.enrichedData.socialPresence.professionalScore += 40;
    }
    
    if (enriched.enrichedData.socialPresence.hasFacebook) {
      enriched.enrichedData.facebookProfile = `https://facebook.com/${data.name.toLowerCase().replace(' ', '.')}`;
      enriched.enrichedData.socialPresence.professionalScore += 20;
    }
  }

  // Phone number increases professional score
  if (data.phone && data.phone.trim()) {
    enriched.enrichedData.socialPresence.professionalScore += 10;
  }

  // Determine enrichment status
  if (enriched.enrichedData.linkedinProfile || enriched.enrichedData.companyInfo) {
    enriched.enrichmentStatus = 'success';
  } else if (enriched.enrichedData.socialPresence.professionalScore > 0) {
    enriched.enrichmentStatus = 'partial';
  } else {
    enriched.enrichmentStatus = 'failed';
  }

  return enriched;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadEnrichmentData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Enrich the lead data
    const enrichedLead = enrichLeadData(data);

    // Log enrichment for audit purposes
    console.log('Lead enriched:', {
      email: data.email,
      enrichmentStatus: enrichedLead.enrichmentStatus,
      professionalScore: enrichedLead.enrichedData.socialPresence.professionalScore,
      hasLinkedIn: enrichedLead.enrichedData.socialPresence.hasLinkedIn,
      hasFacebook: enrichedLead.enrichedData.socialPresence.hasFacebook,
      companyDetected: !!enrichedLead.enrichedData.companyInfo,
      timestamp: enrichedLead.timestamp,
    });

    // Return enriched data (excluding sensitive mock URLs in production)
    return NextResponse.json({
      ok: true,
      enrichmentStatus: enrichedLead.enrichmentStatus,
      socialPresence: enrichedLead.enrichedData.socialPresence,
      companyInfo: enrichedLead.enrichedData.companyInfo,
      // Note: In production, actual social profile URLs would only be returned
      // if properly authenticated and compliant with platform APIs
      integrationHooks: {
        linkedinReady: enrichedLead.enrichedData.socialPresence.hasLinkedIn,
        facebookReady: enrichedLead.enrichedData.socialPresence.hasFacebook,
        crmReady: true,
      },
    });
  } catch (error) {
    console.error('Lead enrichment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve enrichment status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter required' },
      { status: 400 }
    );
  }

  // In production, this would query a database for stored enrichment data
  return NextResponse.json({
    ok: true,
    message: 'Lead enrichment lookup - would query database in production',
    integrationStatus: {
      linkedin: 'ready',
      facebook: 'ready',
      crm: 'ready',
    },
  });
}
