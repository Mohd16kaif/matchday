import { Match } from '@/lib/matches'

const API_KEY = process.env.FOOTBALL_DATA_API_KEY
const BASE_URL = 'https://api.football-data.org/v4'

export async function fetchWC2026Matches(): Promise<Match[]> {
  try {
    const res = await fetch(`${BASE_URL}/competitions/WC/matches`, {
      headers: {
        'X-Auth-Token': API_KEY ?? '',
      },
      next: { revalidate: 3600 }, // cache for 1 hour
    })

    if (!res.ok) {
      console.error('football-data.org error:', res.status, res.statusText)
      return getFallbackMatches()
    }

    const data = await res.json()

    if (!data.matches || data.matches.length === 0) {
      return getFallbackMatches()
    }

    const matches: Match[] = data.matches.map((m: any) => ({
      id: String(m.id),
      date: m.utcDate,
      homeTeam: m.homeTeam?.name ?? 'TBD',
      awayTeam: m.awayTeam?.name ?? 'TBD',
      stage: formatStage(m.stage),
      venue: m.venue ?? 'TBD',
      city: extractCity(m.venue ?? ''),
      score: m.score?.fullTime
        ? `${m.score.fullTime.home ?? '?'} - ${m.score.fullTime.away ?? '?'}`
        : null,
      status: m.status,
    }))

    return matches
  } catch (err) {
    console.error('Failed to fetch matches:', err)
    return getFallbackMatches()
  }
}

function formatStage(stage: string): string {
  const map: Record<string, string> = {
    'GROUP_STAGE': 'Group Stage',
    'LAST_32': 'Round of 32',
    'LAST_16': 'Round of 16',
    'QUARTER_FINALS': 'Quarter-final',
    'SEMI_FINALS': 'Semi-final',
    'THIRD_PLACE': 'Third place',
    'FINAL': 'Final',
  }
  return map[stage] ?? stage
}

function extractCity(venue: string): string {
  const cityMap: Record<string, string> = {
    'MetLife Stadium': 'New York',
    'AT&T Stadium': 'Dallas',
    'SoFi Stadium': 'Los Angeles',
    'Hard Rock Stadium': 'Miami',
    'Levi\'s Stadium': 'San Francisco',
    'Gillette Stadium': 'Boston',
    'Estadio Azteca': 'Mexico City',
    'BMO Field': 'Toronto',
    'Arrowhead Stadium': 'Kansas City',
    'Lumen Field': 'Seattle',
    'BC Place': 'Vancouver',
    'Estadio BBVA': 'Monterrey',
  }
  return cityMap[venue] ?? venue
}

function getFallbackMatches(): Match[] {
  // Import static matches as fallback if API fails
  const { WC2026_MATCHES } = require('@/lib/matches')
  return WC2026_MATCHES
}
