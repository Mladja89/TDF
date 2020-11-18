import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { useAuthContext } from './api/auth'
import { MainRouter } from './router/MainRouter'
import Amplify from 'aws-amplify'

Amplify.configure({ Auth: {
  mandatorySignIn: true,
  region: "eu-west2",
  userPoolId: "eu-west-2_RuHOkAQoR", userPoolWebClientId: "3reofosmas4al0fci45n222aro"
  }, })

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { setCurrentUser } = useAuthContext()

  async function checkAuth() {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoading ? <div>Loading...</div> : <MainRouter />
}

export default App
