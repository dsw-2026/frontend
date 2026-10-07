import { httpClient } from '../api/httpClient'

interface LoginInput {
  email: string
  password: string
}

interface LoginResponse {
  id: number
  username: string
}

export type UserType = 'Publisher' | 'Adopter' | 'Admin'

export interface CurrentUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  userType: UserType
}

export const authService = {
  login: (input: LoginInput) => httpClient.post<LoginResponse>('/auth/login', input),
  getProfile: () => httpClient.get<CurrentUser>('/auth/me'),
}