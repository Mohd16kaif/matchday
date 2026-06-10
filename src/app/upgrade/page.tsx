import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import UpgradeButton from '@/components/UpgradeButton'

export default async function UpgradePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user.id)
    .single()

  if (profile?.is_pro) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🏆</div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Matchday Pro</h1>
          <p className="text-sm text-gray-500">One-time payment for the entire World Cup 2026</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Unlimited groups</p>
              <p className="text-xs text-gray-400">Create groups for family, office, friends</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Group chat per match</p>
              <p className="text-xs text-gray-400">Live chat during each match with your group</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Spoiler shield</p>
              <p className="text-xs text-gray-400">Hide results until you are ready to watch</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-900">Match reminders</p>
              <p className="text-xs text-gray-400">Get notified before your group matches</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 mb-5 text-center">
          <p className="text-2xl font-bold text-gray-900">$4</p>
          <p className="text-xs text-gray-500">one-time, covers all 104 matches</p>
        </div>

        <UpgradeButton />

        <div className="text-center mt-4">
          <Link href="/dashboard" className="text-xs text-gray-400 hover:text-gray-600">
            Maybe later
          </Link>
        </div>
      </div>
    </div>
  )
}
