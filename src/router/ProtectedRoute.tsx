import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuthContext } from '../api/auth'
import { UserRole } from '../api/types'
import { MainLayout } from '../components/MainLayout'
import * as routes from './routes'

type Props = RouteProps & {
  userRole?: UserRole
}

export function ProtectedRoute({ component: Component, userRole, ...props }: Props) {
  const { currentUser } = useAuthContext()

  if (!currentUser) {
    return <Redirect to={{ pathname: routes.login, state: { redirectTo: props.location } }} />
  }

  if (userRole && currentUser.attributes["custom:roles"] !== userRole) {
    return <div>This page can only be accessed by {userRole} role</div>
  }

  return (
    <Route
      {...props}
      render={(routeProps) => (
        <MainLayout>
          {/* @ts-ignore */}
          <Component {...routeProps} />
        </MainLayout>
      )}
    />
  )
}
