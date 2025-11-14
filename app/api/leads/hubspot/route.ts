import { NextResponse } from 'next/server'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabaseAdmin'

function extractLeadData(rawPayload: any) {
  const data: Record<string, any> = {
    raw_data: rawPayload,
    contact_type: 'hubspot',
    source_url: rawPayload.context?.pageUri || 'unknown',
    hubspot_vid: rawPayload.context?.vid || null,
  }

  const properties = rawPayload.properties || []

  const getPropValue = (name: string) => {
    const prop = properties.find((p: any) => p.name === name)
    return prop ? prop.value : null
  }

  data.email = getPropValue('email')
  data.first_name = getPropValue('firstname')
  data.last_name = getPropValue('lastname')
  data.phone = getPropValue('phone')
  data.message = getPropValue('message')

  if (!data.email) {
    console.error('HubSpot payload missing email field.')
    return null
  }

  return data
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  try {
    const rawPayload = await request.json()
    const leadData = extractLeadData(rawPayload)

    if (!leadData) {
      return NextResponse.json(
        { error: 'Invalid HubSpot payload' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('realvibeai_leads')
      .insert([leadData])
      .select()

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: 'Database insert failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Lead stored', lead_id: data[0].id },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'HubSpot lead endpoint active' },
    { status: 200 }
  )
}