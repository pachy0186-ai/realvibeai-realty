import { ContactInput } from './sanitize';
import { supabaseAdmin, isSupabaseConfigured } from './supabaseAdmin';

export type IntegrationResult = {
  leadId?: string;
  warning?: string;
};

const splitName = (name: string): { first: string; last: string | null } => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return { first: name, last: null };
  }
  return {
    first: parts[0],
    last: parts.slice(1).join(' ') || null,
  };
};

export async function storeLeadInSupabase(contact: ContactInput): Promise<IntegrationResult> {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return { warning: 'Lead vault is not configured. Our team will follow up manually.' };
  }

  const { first, last } = splitName(contact.name);
  const sourceUrl = contact.sourceUrl || contact.source || null;

  const { data, error } = await supabaseAdmin
    .from('realvibeai_leads')
    .insert({
      contact_type: 'contact_form',
      source_url: sourceUrl,
      email: contact.email,
      first_name: first,
      last_name: last,
      phone: contact.phone || null,
      message: contact.message,
      raw_data: contact,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { leadId: data?.id };
}

const hubspotToken =
  process.env.HUBSPOT_PRIVATE_APP_TOKEN ||
  process.env.HUBSPOT_ACCESS_TOKEN ||
  process.env.HUBSPOT_API_KEY ||
  '';

export async function syncHubSpotContact(contact: ContactInput): Promise<IntegrationResult> {
  if (!hubspotToken) {
    return { warning: 'Automatic CRM sync is disabled in this environment.' };
  }

  const endpoint = 'https://api.hubapi.com/crm/v3/objects/contacts';
  const { first, last } = splitName(contact.name);

  const properties: Record<string, string> = {
    email: contact.email,
    firstname: first,
    message: contact.message,
    source: contact.source || 'contact_form',
    ai_consent: String(Boolean(contact.aiConsent)),
    follow_up_consent: String(Boolean(contact.followUpConsent)),
  };

  if (last) properties.lastname = last;
  if (contact.phone) properties.phone = contact.phone;
  if (contact.intent) properties.lead_intent = contact.intent;
  if (contact.timeframe) properties.lead_timeframe = contact.timeframe;
  if (contact.budget) properties.lead_budget = contact.budget;
  if (contact.financing) properties.lead_financing_status = contact.financing;
  if (contact.sourceUrl) properties.source_url = contact.sourceUrl;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${hubspotToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  });

  if (response.status === 409) {
    return { warning: 'This contact already exists in our CRM.' };
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HubSpot sync failed: ${response.status} ${text}`);
  }

  return {};
}
