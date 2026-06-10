import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'
import { createClient } from '@/lib/supabase/server'

const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: 'test_mode',
})

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, is_pro')
    .eq('id', user.id)
    .single()

  if (profile?.is_pro) {
    return NextResponse.json({ error: 'Already Pro' }, { status: 400 })
  }

  try {
    const payment = await client.payments.create({
      billing: {
        city: 'Mumbai',
        country: 'IN',
        state: 'MH',
        street: 'NA',
        zipcode: '400001',
      },
      customer: {
        email: user.email!,
        name: profile?.display_name ?? 'Matchday User',
      },
      product_cart: [
        {
          product_id: process.env.DODO_PRODUCT_ID!,
          quantity: 1,
        },
      ],
      payment_link: true,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
      metadata: {
        user_id: user.id,
      },
    })

    return NextResponse.json({ url: (payment as any).payment_link })
  } catch (err: any) {
    console.error('Dodo payment error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
