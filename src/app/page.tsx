import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚽</span>
            <span className="font-semibold text-gray-900">Matchday</span>
          </div>
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          World Cup 2026 · 104 matches, 39 days
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
          Watch the World Cup<br />with your people
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Create a watch party group, invite friends, vote on matches, and RSVP. All in one place. No more WhatsApp chaos.
        </p>
        <Link
          href="/login"
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-2xl text-base font-medium hover:bg-green-700 transition-colors"
        >
          Create your group: it's free
        </Link>
        <p className="text-xs text-gray-400 mt-4">No credit card. Free to use.</p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="font-semibold text-gray-900 mb-2">Match schedule</h3>
            <p className="text-sm text-gray-500">Every World Cup 2026 match in your local timezone. Never miss a kickoff.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-2xl mb-3">🗳️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Vote on matches</h3>
            <p className="text-sm text-gray-500">Your group votes on which matches to watch together. Democracy wins.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-semibold text-gray-900 mb-2">Invite with a link</h3>
            <p className="text-sm text-gray-500">Share one link on WhatsApp or Twitter. Friends join in one tap.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-4 py-6">
        <div className="max-w-4xl mx-auto text-center text-xs text-gray-400">
          Built for World Cup 2026 · Free to use
        </div>
      </footer>
    </div>
  )
}