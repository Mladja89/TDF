import React from 'react'
import { useAuthContext } from '../api/auth'
import { UsersTablePage } from './UsersTablePage'
import { MePage } from './MePage'

export function HomePage() {
  const { userRole } = useAuthContext()

  if (userRole === 'COACH') {
    return <UsersTablePage />
  }
  if (userRole === 'FREELANCER') {
    return <MePage />
  }

  return <div>Error</div>
}
