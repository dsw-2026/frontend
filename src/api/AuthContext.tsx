import { createContext, useContext, useEffect, useState } from 'react'
import { authService, type UsuarioActual } from '../services/auth.service'

// Lo que el Context va a ofrecer a toda la app: el usuario actual (o null
// si nadie está logueado), si todavía está cargando, y funciones para
// login y logout.
interface AuthContextType {
  usuario: UsuarioActual | null
  cargando: boolean
  login: (email: string, contrasena: string) => Promise<void>
  logout: () => Promise<void>
}

// El "depósito" en sí. Arranca indefinido; se llena con el Provider.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Componente que envuelve la app y provee el estado de autenticación.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioActual | null>(null)
  const [cargando, setCargando] = useState(true)

  // Al arrancar la app (o recargar la página), preguntamos al backend
  // "¿hay una sesión activa?" usando la cookie. Si la hay, recuperamos el
  // usuario; si no (401), queda en null.
  useEffect(() => {
    authService
      .getPerfil()
      .then((u) => setUsuario(u))
      .catch(() => setUsuario(null))
      .finally(() => setCargando(false))
  }, [])

  async function login(email: string, contrasena: string) {
    await authService.login({ email, contrasena })
    // Tras el login, recuperamos el perfil completo para tener todos los
    // datos (nombre, rol, etc.), no solo lo que devuelve el login.
    const u = await authService.getPerfil()
    setUsuario(u)
  }

  async function logout() {
    // Por ahora, logout local: limpiamos el usuario del estado.
    // (Más adelante, si el backend agrega un endpoint de logout que borre
    //  la cookie, se llamaría acá.)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Atajo para que cualquier componente acceda al contexto fácilmente,
// con un chequeo de que se use dentro del Provider.
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}