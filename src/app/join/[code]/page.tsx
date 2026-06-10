import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ code: string }>
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params
  const supabase = await createClient()

  // Find group by invite code
  const { data: group } = await supabase
    .from('groups')
    .select('id, name, location_label')
    .eq('invite_code', code)
    .single()

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-sm w-full text-center">
          <div className="text-3xl mb-3">❌</div>
          <h1 className="text-lg font-semibold text-gray-900 mb-2">Invalid invite link</h1>
          <p className="text-sm text-gray-500 mb-5">This invite link is invalid or has expired.</p>
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Go to Matchday
          </Link>
        </div>
      </div>
    )
  }

  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  // If logged in, try to join the group automatically
  if (user) {
    // Check if already a member
    const { data: existing } = await supabase
      .from('group_members')
      .select('id')
      .eq('group_id', group.id)
      .eq('user_id', user.id)
      .single()

    if (!existing) {
      // Check free tier limit: max 5 groups per user
      const { count } = await supabase
        .from('group_members')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      if (!count || count < 5) {
        await supabase.from('group_members').insert({
          group_id: group.id,
          user_id: user.id,
          role: 'member',
        })
      }
    }

    redirect(`/dashboard/groups/${group.id}`)
  }

  // Get member count for social proof
  const { count: memberCount } = await supabase
    .from('group_members')
    .select('*', { count: 'exact', head: true })
    .eq('group_id', group.id)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-sm w-full text-center">
        <div className="text-4xl mb-4">⚽</div>
        <p className="text-sm text-gray-500 mb-1">You have been invited to join</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{group.name}</h1>
        {group.location_label && (
          <p className="text-sm text-gray-400 mb-1">📍 {group.location_label}</p>
        )}
        <p className="text-xs text-gray-400 mb-6">
          {memberCount} {memberCount === 1 ? 'member' : 'members'} already joined
        </p>

        <div className="bg-green-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-800 font-medium">World Cup 2026 Watch Party</p>
          <p className="text-xs text-green-600 mt-1">
            Vote on matches · RSVP · Stay in sync with your group
          </p>
        </div>

        <Link
          href={`/login?next=/join/${code}`}
          className="block w-full bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors mb-3"
        >
          Join with Google
        </Link>
        <p className="text-xs text-gray-400">
          Free to join · No credit card needed
        </p>
      </div>
    </div>
  )
}
