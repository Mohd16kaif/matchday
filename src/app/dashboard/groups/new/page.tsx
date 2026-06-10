'use client'

import { createGroup } from '@/app/actions/groups'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function NewGroupPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await createGroup(formData)
    if (result?.error === 'upgrade_required') {
      router.push('/upgrade')
    } else if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
            ←
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">⚽</span>
            <span className="font-semibold text-gray-900">New watch party</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Create a group</h2>
          <p className="text-sm text-gray-500 mb-6">Give your group a name and invite your friends.</p>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Group name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. The Lads, Office World Cup, Family Group"
                required
                maxLength={50}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="location_label"
                placeholder="e.g. Mumbai, London, New York"
                maxLength={50}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Helps friends know where the watch party is happening</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create group'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
