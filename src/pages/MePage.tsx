import React from 'react'
import { useQuery } from 'react-query'
import { UserProfile } from '../components/UserProfile'
import { useAPI } from '../api/useAPI'

export function MePage() {
  const { me } = useAPI()
  const { data, isLoading, error } = useQuery('me', me)

  if (isLoading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>error</div>
  }

  return data ? <UserProfile user={data} /> : null
}
