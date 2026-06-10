'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function setRsvp(groupId: string, matchId: string, status: 'going' | 'maybe' | 'out') {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('rsvps')
    .upsert({
      group_id: groupId,
      match_id: matchId,
      user_id: user.id,
      status,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'group_id,match_id,user_id'
    })

  if (error) {
    console.error('RSVP error:', error)
    return { error: error.message }
  }

  revalidatePath(`/dashboard/groups/${groupId}`)
  return { success: true }
}

export async function toggleVote(groupId: string, matchId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: existing } = await supabase
    .from('votes')
    .select('id')
    .eq('group_id', groupId)
    .eq('match_id', matchId)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    await supabase
      .from('votes')
      .delete()
      .eq('id', existing.id)
  } else {
    await supabase
      .from('votes')
      .insert({
        group_id: groupId,
        match_id: matchId,
        user_id: user.id,
      })
  }

  revalidatePath(`/dashboard/groups/${groupId}`)
  return { success: true }
}
