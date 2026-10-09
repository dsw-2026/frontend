import { createContext } from 'react'
import type { CurrentUser } from '@/features/auth/auth.service'

export interface AuthContextType {
  user: CurrentUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<CurrentUser>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)