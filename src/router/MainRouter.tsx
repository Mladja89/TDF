import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { ProtectedRoute } from './ProtectedRoute'
import * as routes from './routes'
import { ProfilePage } from '../pages/ProfilePage'

export function MainRouter() {
  console.log('main router rendering')
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path={routes.home} component={HomePage} />
        <Route path={routes.login} exact component={LoginPage} />
        <ProtectedRoute path={routes.profile(':id')} userRole="COACH" component={ProfilePage} />
      </Switch>
    </BrowserRouter>
  )
}
