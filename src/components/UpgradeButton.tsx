'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleUpgrade() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/payments/create-checkout', {
        method: 'POST',
      })
      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Something went wrong')
        setLoading(false)
      }
    } catch (err) {
      setError('Failed to start checkout')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Upgrade to Pro - $4'}
      </button>
      {error && (
        <p className="text-xs text-red-500 text-center mt-2">{error}</p>
      )}
    </div>
  )
}
