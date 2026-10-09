import { httpClient } from '@/shared/api/httpClient'
interface LoginInput {
  email: string
  password: string
}
interface LoginResponse {
  id: number
  username: string
}
export interface CurrentUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  userType: string
}

export const authService = {
  login: (input: LoginInput) => httpClient.post<LoginResponse>('/auth/login', input),
  getProfile: () => httpClient.get<CurrentUser>('/auth/me'),
}