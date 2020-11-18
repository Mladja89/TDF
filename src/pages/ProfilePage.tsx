import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useAPI } from '../api/useAPI'
import { UserProfile } from '../components/UserProfile'

export function ProfilePage() {
  const { id } = useParams<{ id: string }>()
  const { getUser, updateUser } = useAPI()
  const { data, isLoading, error, refetch } = useQuery([id, 'getUser'], getUser)

  async function handleSave(values: any) {
    try {
      await updateUser(id, values)
      refetch()
    } catch (e) {
      console.error(e)
    }
  
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error!</div>
  }

  return data ? <UserProfile isLoading={isLoading} user={data} isEditable onSave={handleSave} /> : null
}
