'use client'

import { useState, useEffect, useTransition } from 'react'
import { WC2026_MATCHES, formatMatchDate, formatMatchTime, type Match } from '@/lib/matches'
import { setRsvp, toggleVote } from '@/app/actions/rsvp'

interface RsvpData {
  match_id: string
  status: 'going' | 'maybe' | 'out'
}

interface VoteData {
  match_id: string
}

interface Props {
  groupId: string
  userId: string
  initialRsvps: RsvpData[]
  initialVotes: VoteData[]
  memberCount: number
  liveMatches?: Match[]
}

export default function MatchSchedule({
  groupId,
  userId,
  initialRsvps,
  initialVotes,
  memberCount,
  liveMatches,
}: Props) {
  const [timezone, setTimezone] = useState('UTC')
  const [filter, setFilter] = useState<'upcoming' | 'all'>('upcoming')
  const [rsvps, setRsvps] = useState<RsvpData[]>(initialRsvps)
  const [votes, setVotes] = useState<VoteData[]>(initialVotes)

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  const allMatches = liveMatches ?? WC2026_MATCHES
  const now = new Date()
  const matches = filter === 'upcoming'
    ? allMatches.filter(m => new Date(m.date) > now)
    : allMatches

  const displayMatches = matches.slice(0, 20)

  async function handleRsvp(matchId: string, status: 'going' | 'maybe' | 'out') {
    const current = rsvps.find(r => r.match_id === matchId)
    if (current?.status === status) {
      setRsvps(rsvps.filter(r => r.match_id !== matchId))
    } else {
      setRsvps([...rsvps.filter(r => r.match_id !== matchId), { match_id: matchId, status }])
    }
    await setRsvp(groupId, matchId, status)
  }

  async function handleVote(matchId: string) {
    const hasVoted = votes.some(v => v.match_id === matchId)
    if (hasVoted) {
      setVotes(votes.filter(v => v.match_id !== matchId))
    } else {
      setVotes([...votes, { match_id: matchId }])
    }
    await toggleVote(groupId, matchId)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Match schedule</h3>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter('upcoming')}
              className={`text-xs px-3 py-1 rounded-md transition-colors ${
                filter === 'upcoming'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All matches
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">Times in your local timezone · Tap a match to vote or RSVP</p>
      </div>

      <div className="divide-y divide-gray-50">
        {displayMatches.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            No upcoming matches
          </div>
        ) : (
          displayMatches.map((match) => {
            const myRsvp = rsvps.find(r => r.match_id === match.id)
            const myVote = votes.some(v => v.match_id === match.id)
            const voteCount = votes.filter(v => v.match_id === match.id).length
            const isPast = new Date(match.date) < new Date()

            return (
              <MatchRow
                key={match.id}
                match={match}
                timezone={timezone}
                myRsvp={myRsvp?.status}
                myVote={myVote}
                voteCount={voteCount}
                memberCount={memberCount}
                isPast={isPast}
                onRsvp={handleRsvp}
                onVote={handleVote}
              />
            )
          })
        )}
      </div>

      {matches.length > 20 && (
        <div className="p-4 text-center border-t border-gray-100">
          <button
            onClick={() => setFilter('all')}
            className="text-xs text-green-600 hover:text-green-700"
          >
            View all {WC2026_MATCHES.length} matches →
          </button>
        </div>
      )}
    </div>
  )
}

function MatchRow({
  match,
  timezone,
  myRsvp,
  myVote,
  voteCount,
  memberCount,
  isPast,
  onRsvp,
  onVote,
}: {
  match: Match
  timezone: string
  myRsvp?: 'going' | 'maybe' | 'out'
  myVote: boolean
  voteCount: number
  memberCount: number
  isPast: boolean
  onRsvp: (matchId: string, status: 'going' | 'maybe' | 'out') => void
  onVote: (matchId: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={`${isPast ? 'opacity-50' : ''}`}>
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => !isPast && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {match.stage}
              </span>
              {voteCount > 0 && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  🗳️ {voteCount}/{memberCount} voted
                </span>
              )}
              {myRsvp === 'going' && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ Going</span>
              )}
              {myRsvp === 'maybe' && (
                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">? Maybe</span>
              )}
              {myRsvp === 'out' && (
                <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">✗ Out</span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {match.homeTeam} <span className="text-gray-400 font-normal">vs</span> {match.awayTeam}
            </p>
            {match.score && match.status === 'FINISHED' && (
              <p className="text-xs font-bold text-green-700 mt-0.5">{match.score}</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">
              📍 {match.venue}, {match.city}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-medium text-gray-700">
              {formatMatchDate(match.date, timezone)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {formatMatchTime(match.date, timezone)}
            </p>
            {!isPast && (
              <p className="text-xs text-gray-300 mt-1">{expanded ? '▲' : '▼'}</p>
            )}
          </div>
        </div>
      </div>

      {expanded && !isPast && (
        <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
          <div className="pt-3 space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Your RSVP</p>
              <div className="flex gap-2">
                <button
                  onClick={() => startTransition(() => onRsvp(match.id, 'going'))}
                  disabled={isPending}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                    myRsvp === 'going'
                      ? 'bg-green-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-green-300'
                  }`}
                >
                  ✓ Going
                </button>
                <button
                  onClick={() => startTransition(() => onRsvp(match.id, 'maybe'))}
                  disabled={isPending}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                    myRsvp === 'maybe'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-yellow-300'
                  }`}
                >
                  ? Maybe
                </button>
                <button
                  onClick={() => startTransition(() => onRsvp(match.id, 'out'))}
                  disabled={isPending}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                    myRsvp === 'out'
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-red-300'
                  }`}
                >
                  ✗ Out
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Vote to watch this match</p>
              <button
                onClick={() => startTransition(() => onVote(match.id))}
                disabled={isPending}
                className={`w-full py-2 rounded-xl text-xs font-medium transition-colors ${
                  myVote
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-amber-300'
                }`}
              >
                {myVote ? '🗳️ Voted: tap to remove' : '🗳️ Vote to watch this match'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
