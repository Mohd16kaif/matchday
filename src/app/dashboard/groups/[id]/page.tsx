import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getBaseUrl } from '@/lib/utils'
import CopyButton from '@/components/CopyButton'
import MatchScheduleServer from '@/components/MatchScheduleServer'

interface Props {
  params: Promise<{ id: string }>
}

export default async function GroupPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: group, error: groupError } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .single()

  console.log('group:', group, 'groupError:', groupError)

  if (!group) notFound()

  const { data: membership } = await supabase
    .from('group_members')
    .select('role')
    .eq('group_id', id)
    .eq('user_id', user.id)
    .single()

  if (!membership) redirect('/dashboard')

  const { data: members, error: membersError } = await supabase
    .from('group_members')
    .select(`
      role,
      joined_at,
      profiles (
        display_name,
        avatar_url
      )
    `)
    .eq('group_id', id)

  console.log('members:', members, 'error:', membersError)

  const { data: rsvps } = await supabase
    .from('rsvps')
    .select('match_id, status')
    .eq('group_id', id)
    .eq('user_id', user.id)

  const { data: votes } = await supabase
    .from('votes')
    .select('match_id')
    .eq('group_id', id)
    .eq('user_id', user.id)

  const memberCount = members?.length ?? 1
  const inviteLink = `${getBaseUrl()}/join/${group.invite_code}`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 text-lg">
            ←
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <span className="font-semibold text-gray-900">{group.name}</span>
              {membership.role === 'owner' && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  host
                </span>
              )}
            </div>
            {group.location_label && (
              <p className="text-xs text-gray-400 mt-0.5 ml-7">
                📍 {group.location_label}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Invite friends</h3>
          <p className="text-xs text-gray-500 mb-3">Share this link: friends join in one tap</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-600 font-mono truncate">
              {inviteLink}
            </div>
            <CopyButton text={inviteLink} />
          </div>
          <div className="flex gap-2 mt-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Join my World Cup 2026 watch party group "${group.name}" on Matchday! ${inviteLink}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs bg-green-50 text-green-700 px-3 py-2 rounded-xl hover:bg-green-100 transition-colors"
            >
              Share on WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Watching the World Cup 2026 with friends! Join our group on Matchday 🏆 ${inviteLink}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors"
            >
              Share on X
            </a>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Members ({members?.length ?? 0})
          </h3>
          <div className="space-y-2">
            {members?.map((m: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-700">
                  {m.profiles?.display_name?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{m.profiles?.display_name ?? 'Unknown'}</p>
                </div>
                {m.role === 'owner' && (
                  <span className="text-xs text-gray-400">host</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <MatchScheduleServer
          groupId={group.id}
          userId={user.id}
          initialRsvps={(rsvps ?? []) as any}
          initialVotes={(votes ?? []) as any}
          memberCount={memberCount}
        />

      </main>
    </div>
  )
}
