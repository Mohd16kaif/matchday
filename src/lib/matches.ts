export interface Match {
  id: string
  date: string
  homeTeam: string
  awayTeam: string
  group?: string
  stage: string
  venue: string
  city: string
  score?: string | null
  status?: string
}

export const WC2026_MATCHES: Match[] = [
  { id: "m1", date: "2026-06-11T20:00:00-05:00", homeTeam: "Mexico", awayTeam: "TBD", stage: "Group A", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m2", date: "2026-06-12T17:00:00-04:00", homeTeam: "USA", awayTeam: "TBD", stage: "Group B", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m3", date: "2026-06-12T20:00:00-04:00", homeTeam: "Canada", awayTeam: "TBD", stage: "Group C", venue: "BMO Field", city: "Toronto" },
  { id: "m4", date: "2026-06-13T14:00:00-04:00", homeTeam: "Brazil", awayTeam: "TBD", stage: "Group D", venue: "MetLife Stadium", city: "New York" },
  { id: "m5", date: "2026-06-13T17:00:00-04:00", homeTeam: "Argentina", awayTeam: "TBD", stage: "Group E", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m6", date: "2026-06-13T20:00:00-04:00", homeTeam: "France", awayTeam: "TBD", stage: "Group F", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m7", date: "2026-06-14T14:00:00-04:00", homeTeam: "England", awayTeam: "TBD", stage: "Group G", venue: "Gillette Stadium", city: "Boston" },
  { id: "m8", date: "2026-06-14T17:00:00-04:00", homeTeam: "Germany", awayTeam: "TBD", stage: "Group H", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m9", date: "2026-06-14T20:00:00-04:00", homeTeam: "Spain", awayTeam: "TBD", stage: "Group I", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: "m10", date: "2026-06-15T14:00:00-04:00", homeTeam: "Portugal", awayTeam: "TBD", stage: "Group J", venue: "Lumen Field", city: "Seattle" },
  { id: "m11", date: "2026-06-15T17:00:00-04:00", homeTeam: "Netherlands", awayTeam: "TBD", stage: "Group K", venue: "BC Place", city: "Vancouver" },
  { id: "m12", date: "2026-06-15T20:00:00-04:00", homeTeam: "Belgium", awayTeam: "TBD", stage: "Group L", venue: "Estadio BBVA", city: "Monterrey" },
  { id: "m13", date: "2026-06-16T14:00:00-04:00", homeTeam: "Italy", awayTeam: "TBD", stage: "Group A", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m14", date: "2026-06-16T17:00:00-04:00", homeTeam: "Croatia", awayTeam: "TBD", stage: "Group B", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m15", date: "2026-06-16T20:00:00-04:00", homeTeam: "Morocco", awayTeam: "TBD", stage: "Group C", venue: "MetLife Stadium", city: "New York" },
  { id: "m16", date: "2026-06-17T14:00:00-04:00", homeTeam: "Japan", awayTeam: "TBD", stage: "Group D", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m17", date: "2026-06-17T17:00:00-04:00", homeTeam: "South Korea", awayTeam: "TBD", stage: "Group E", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m18", date: "2026-06-17T20:00:00-04:00", homeTeam: "Senegal", awayTeam: "TBD", stage: "Group F", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m19", date: "2026-06-18T14:00:00-04:00", homeTeam: "Australia", awayTeam: "TBD", stage: "Group G", venue: "Gillette Stadium", city: "Boston" },
  { id: "m20", date: "2026-06-18T17:00:00-04:00", homeTeam: "Uruguay", awayTeam: "TBD", stage: "Group H", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: "m21", date: "2026-06-18T20:00:00-04:00", homeTeam: "Colombia", awayTeam: "TBD", stage: "Group I", venue: "Lumen Field", city: "Seattle" },
  { id: "m22", date: "2026-06-19T14:00:00-04:00", homeTeam: "Denmark", awayTeam: "TBD", stage: "Group J", venue: "BC Place", city: "Vancouver" },
  { id: "m23", date: "2026-06-19T17:00:00-04:00", homeTeam: "Switzerland", awayTeam: "TBD", stage: "Group K", venue: "BMO Field", city: "Toronto" },
  { id: "m24", date: "2026-06-19T20:00:00-04:00", homeTeam: "Nigeria", awayTeam: "TBD", stage: "Group L", venue: "Estadio BBVA", city: "Monterrey" },
  { id: "m25", date: "2026-06-20T14:00:00-04:00", homeTeam: "Mexico", awayTeam: "TBD", stage: "Group A", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m26", date: "2026-06-20T17:00:00-04:00", homeTeam: "USA", awayTeam: "TBD", stage: "Group B", venue: "MetLife Stadium", city: "New York" },
  { id: "m27", date: "2026-06-20T20:00:00-04:00", homeTeam: "Canada", awayTeam: "TBD", stage: "Group C", venue: "BMO Field", city: "Toronto" },
  { id: "m28", date: "2026-06-21T14:00:00-04:00", homeTeam: "Brazil", awayTeam: "TBD", stage: "Group D", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m29", date: "2026-06-21T17:00:00-04:00", homeTeam: "Argentina", awayTeam: "TBD", stage: "Group E", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m30", date: "2026-06-21T20:00:00-04:00", homeTeam: "France", awayTeam: "TBD", stage: "Group F", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m31", date: "2026-06-22T14:00:00-04:00", homeTeam: "England", awayTeam: "TBD", stage: "Group G", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m32", date: "2026-06-22T17:00:00-04:00", homeTeam: "Germany", awayTeam: "TBD", stage: "Group H", venue: "Gillette Stadium", city: "Boston" },
  { id: "m33", date: "2026-06-22T20:00:00-04:00", homeTeam: "Spain", awayTeam: "TBD", stage: "Group I", venue: "Estadio BBVA", city: "Monterrey" },
  { id: "m34", date: "2026-06-23T14:00:00-04:00", homeTeam: "Portugal", awayTeam: "TBD", stage: "Group J", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: "m35", date: "2026-06-23T17:00:00-04:00", homeTeam: "Netherlands", awayTeam: "TBD", stage: "Group K", venue: "Lumen Field", city: "Seattle" },
  { id: "m36", date: "2026-06-23T20:00:00-04:00", homeTeam: "Belgium", awayTeam: "TBD", stage: "Group L", venue: "BC Place", city: "Vancouver" },
  { id: "m37", date: "2026-06-24T14:00:00-04:00", homeTeam: "Italy", awayTeam: "TBD", stage: "Group A", venue: "MetLife Stadium", city: "New York" },
  { id: "m38", date: "2026-06-24T17:00:00-04:00", homeTeam: "Croatia", awayTeam: "TBD", stage: "Group B", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m39", date: "2026-06-24T20:00:00-04:00", homeTeam: "Morocco", awayTeam: "TBD", stage: "Group C", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m40", date: "2026-06-25T14:00:00-04:00", homeTeam: "Japan", awayTeam: "TBD", stage: "Group D", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m41", date: "2026-06-25T17:00:00-04:00", homeTeam: "South Korea", awayTeam: "TBD", stage: "Group E", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m42", date: "2026-06-25T20:00:00-04:00", homeTeam: "Senegal", awayTeam: "TBD", stage: "Group F", venue: "Gillette Stadium", city: "Boston" },
  { id: "m43", date: "2026-06-26T14:00:00-04:00", homeTeam: "Australia", awayTeam: "TBD", stage: "Group G", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m44", date: "2026-06-26T17:00:00-04:00", homeTeam: "Uruguay", awayTeam: "TBD", stage: "Group H", venue: "BMO Field", city: "Toronto" },
  { id: "m45", date: "2026-06-26T20:00:00-04:00", homeTeam: "Colombia", awayTeam: "TBD", stage: "Group I", venue: "Estadio BBVA", city: "Monterrey" },
  { id: "m46", date: "2026-06-27T14:00:00-04:00", homeTeam: "Denmark", awayTeam: "TBD", stage: "Group J", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: "m47", date: "2026-06-27T17:00:00-04:00", homeTeam: "Switzerland", awayTeam: "TBD", stage: "Group K", venue: "Lumen Field", city: "Seattle" },
  { id: "m48", date: "2026-06-27T20:00:00-04:00", homeTeam: "Nigeria", awayTeam: "TBD", stage: "Group L", venue: "BC Place", city: "Vancouver" },
  { id: "m49", date: "2026-07-01T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "MetLife Stadium", city: "New York" },
  { id: "m50", date: "2026-07-01T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m51", date: "2026-07-02T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m52", date: "2026-07-02T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m53", date: "2026-07-03T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m54", date: "2026-07-03T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Gillette Stadium", city: "Boston" },
  { id: "m55", date: "2026-07-04T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m56", date: "2026-07-04T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "BMO Field", city: "Toronto" },
  { id: "m57", date: "2026-07-05T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Arrowhead Stadium", city: "Kansas City" },
  { id: "m58", date: "2026-07-05T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Lumen Field", city: "Seattle" },
  { id: "m59", date: "2026-07-06T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "BC Place", city: "Vancouver" },
  { id: "m60", date: "2026-07-06T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Estadio BBVA", city: "Monterrey" },
  { id: "m61", date: "2026-07-07T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "MetLife Stadium", city: "New York" },
  { id: "m62", date: "2026-07-07T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m63", date: "2026-07-08T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m64", date: "2026-07-08T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 32", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m65", date: "2026-07-11T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "MetLife Stadium", city: "New York" },
  { id: "m66", date: "2026-07-11T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m67", date: "2026-07-12T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m68", date: "2026-07-12T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m69", date: "2026-07-13T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "Levi's Stadium", city: "San Francisco" },
  { id: "m70", date: "2026-07-13T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "Gillette Stadium", city: "Boston" },
  { id: "m71", date: "2026-07-14T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "Estadio Azteca", city: "Mexico City" },
  { id: "m72", date: "2026-07-14T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Round of 16", venue: "BMO Field", city: "Toronto" },
  { id: "m73", date: "2026-07-17T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Quarter-final", venue: "MetLife Stadium", city: "New York" },
  { id: "m74", date: "2026-07-17T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Quarter-final", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m75", date: "2026-07-18T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Quarter-final", venue: "SoFi Stadium", city: "Los Angeles" },
  { id: "m76", date: "2026-07-18T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Quarter-final", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m77", date: "2026-07-21T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Semi-final", venue: "MetLife Stadium", city: "New York" },
  { id: "m78", date: "2026-07-22T19:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Semi-final", venue: "AT&T Stadium", city: "Dallas" },
  { id: "m79", date: "2026-07-25T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Third place", venue: "Hard Rock Stadium", city: "Miami" },
  { id: "m80", date: "2026-07-19T15:00:00-04:00", homeTeam: "TBD", awayTeam: "TBD", stage: "Final", venue: "MetLife Stadium", city: "New York" },
]

export function formatMatchDate(dateStr: string, timezone?: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: timezone || 'UTC',
    })
  } catch {
    return dateStr
  }
}

export function formatMatchTime(dateStr: string, timezone?: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone || 'UTC',
      timeZoneName: 'short',
    })
  } catch {
    return ''
  }
}

export function getUpcomingMatches(limit = 10): Match[] {
  const now = new Date()
  return WC2026_MATCHES
    .filter(m => new Date(m.date) > now)
    .slice(0, limit)
}

export function getAllMatches(): Match[] {
  return WC2026_MATCHES
}
