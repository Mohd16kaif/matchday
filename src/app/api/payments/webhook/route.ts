import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  console.log('Dodo webhook received:', body)

  if (body.type === 'payment.succeeded') {
    const userId = body.data?.metadata?.user_id

    if (userId) {
      const supabase = await createClient()
      await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('id', userId)

      console.log('Upgraded user to Pro:', userId)
    }
  }

  return NextResponse.json({ received: true })
}
