'use client'

import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-2 bg-gray-900 text-white text-xs rounded-xl hover:bg-gray-700 transition-colors min-w-[60px]"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
