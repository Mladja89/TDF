
export type UserRole = 'COACH' | 'FREELANCER'
export type UserStatus = 'INVITED' | 'CONTRACT_PENDING'

export type User = {
  active: boolean
  coach_first_name: string
  coach_id: string
  coach_last_name: string
  email: string
  first_name: string
  id: string
  last_name: string
  phone: string
  role: UserRole
  status: UserStatus
}
