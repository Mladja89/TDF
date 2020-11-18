import axios from 'axios'
import { useAuthContext } from './auth'
import { User } from './types'

export function useAPI() {
  const { currentUser } = useAuthContext()

  if (!currentUser) {
    throw Error('Not authorized to invoke API')
  }

  const api = axios.create({
    baseURL: 'https://api.hiway.projects.tdf.dev/v1',
    headers: { Authorization: `Bearer ${currentUser?.getSignInUserSession()?.getIdToken().getJwtToken()}` },
  })

  async function listUsers(): Promise<User[]> {
    const response = await api.get('/users')
    return response.data
  }

  async function getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`)
    return response.data
  }

  async function updateUser(id: string, data: any): Promise<User> {
    const response = await api.put(`/users/${id}`, data)
    return response.data
  }

  async function me(): Promise<User> {
    return getUser('me')
  }

  return { listUsers, getUser, updateUser, me }
}
