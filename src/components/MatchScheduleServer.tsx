import { fetchWC2026Matches } from '@/lib/api/matches'
import MatchSchedule from '@/components/MatchSchedule'

interface Props {
  groupId: string
  userId: string
  initialRsvps: any[]
  initialVotes: any[]
  memberCount: number
}

export default async function MatchScheduleServer(props: Props) {
  const matches = await fetchWC2026Matches()

  return (
    <MatchSchedule
      {...props}
      liveMatches={matches}
    />
  )
}
