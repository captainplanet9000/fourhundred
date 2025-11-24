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
    const { address, quantity, txHash, chainId, priceWei, ts } = body || {}
    const sb = getSupabase()
    const payload = {
      address,
      event: 'mint',
      props: { quantity, txHash, chainId, priceWei, ts, ua: req.headers.get('user-agent') },
    }
    // Store in analytics_events for simplicity
    const { error } = await sb.from('analytics_events').insert(payload)
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 200 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'unknown' }, { status: 200 })
  }
}
