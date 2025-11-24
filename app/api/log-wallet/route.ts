import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase env not configured')
  return createClient(url, key, { auth: { persistSession: false } })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { event, address, connector, chainId, ts } = body || {}
    const sb = getSupabase()
    const payload = {
      address: address ?? null,
      event: event ?? 'wallet_event',
      props: { connector, chainId, ts, ua: req.headers.get('user-agent') },
    }
    // Table name per docs: analytics_events
    const { error } = await sb.from('analytics_events').insert(payload)
    if (error) {
      // return 200 with message but include error to avoid breaking UI
      return NextResponse.json({ ok: false, error: error.message }, { status: 200 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 200 })
  }
}
