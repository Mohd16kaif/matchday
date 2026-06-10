'use server'

import { createClient } from '@/lib/supabase/server'
import { generateInviteCode } from '@/lib/utils'
import { redirect } from 'next/navigation'

export async function createGroup(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const location_label = formData.get('location_label') as string

  if (!name || name.trim().length === 0) {
    return { error: 'Group name is required' }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('id', user.id)
    .single()

  if (!profile?.is_pro) {
    const { count } = await supabase
      .from('groups')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id)

    if (count && count >= 1) {
      return { error: 'upgrade_required' }
    }
  }

  const invite_code = generateInviteCode()

  const { data: group, error } = await supabase
    .from('groups')
    .insert({
      name: name.trim(),
      owner_id: user.id,
      invite_code,
      location_label: location_label?.trim() || null,
    })
    .select()
    .single()

  if (error) {
    return { error: 'Failed to create group. Please try again.' }
  }

  await supabase.from('group_members').insert({
    group_id: group.id,
    user_id: user.id,
    role: 'owner',
  })

  redirect(`/dashboard/groups/${group.id}`)
}
