import { useEffect, useState } from 'react'
import { authService, type CurrentUser } from '@/features/auth/auth.service'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService
      .getProfile()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(email: string, password: string) {
    await authService.login({ email, password })
    const u = await authService.getProfile()
    setUser(u)
    return u
  }

  async function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}