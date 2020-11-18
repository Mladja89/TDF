import React, {  useState } from 'react'
import { CognitoUser } from '@aws-amplify/auth'
import { UserRole } from './types'

export type AuthUser = CognitoUser & {
  attributes: {
    'custom:roles': UserRole
    email: string
    sub: string
  }
}

type ContextType = {
  currentUser?: AuthUser
  setCurrentUser: (user?: AuthUser) => void
  userRole?: UserRole
}

export const AuthContext = React.createContext<ContextType>({
  currentUser: undefined,
  setCurrentUser: () => {
    throw Error('`setCurrentUser` must be called from inside `AuthContext`')
  },
})

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser>()
  const userRole = currentUser?.attributes['custom:roles'] as UserRole

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, userRole }}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  return React.useContext(AuthContext)
}
