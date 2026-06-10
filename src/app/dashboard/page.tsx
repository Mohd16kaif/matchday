import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: memberships, error: membershipError } = await supabase
    .from('group_members')
    .select(`
      role,
      joined_at,
      groups (
        id,
        name,
        location_label,
        invite_code,
        created_at
      )
    `)
    .eq('user_id', user.id)

  console.log('memberships:', memberships, 'error:', membershipError)

  const groups = memberships?.map((m: any) => ({
    ...m.groups,
    role: m.role,
  })) ?? []

  async function signOut() {
    'use server'
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚽</span>
            <span className="font-semibold text-gray-900">Matchday</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              {profile?.display_name}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Your groups</h2>
          <Link
            href="/dashboard/groups/new"
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
          >
            + New group
          </Link>
        </div>

        {groups.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <div className="text-4xl mb-3">⚽</div>
            <h3 className="font-semibold text-gray-900 mb-1">No groups yet</h3>
            <p className="text-sm text-gray-500 mb-5">
              Create a group and invite your friends to plan watch parties together
            </p>
            <Link
              href="/dashboard/groups/new"
              className="inline-block bg-green-600 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
            >
              Create your first group
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((group: any) => (
              <Link
                key={group.id}
                href={`/dashboard/groups/${group.id}`}
                className="block bg-white rounded-2xl border border-gray-200 p-5 hover:border-green-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{group.name}</span>
                      {group.role === 'owner' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          host
                        </span>
                      )}
                    </div>
                    {group.location_label && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        📍 {group.location_label}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-300 text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!profile?.is_pro && groups.length >= 1 && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm text-amber-800 font-medium">
              Free plan: 1 group limit
            </p>
            <p className="text-xs text-amber-600 mt-0.5">
              Upgrade to Pro for unlimited groups, group chat, and more.
            </p>
            <Link
              href="/upgrade"
              className="inline-block mt-2 text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Upgrade for $4 →
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
