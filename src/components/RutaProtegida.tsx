import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../api/AuthContext'

// "Guardián" de rutas: envuelve las pantallas que requieren estar logueado.
// - Mientras se verifica la sesión (cargando), no decide nada todavía.
// - Si hay usuario, deja pasar (muestra la pantalla via <Outlet />).
// - Si no hay usuario, redirige al login.
export function RutaProtegida() {
  const { usuario, cargando } = useAuth()

  // Importante: mientras el AuthProvider todavía está consultando /me al
  // arrancar, no sabemos aún si hay sesión. Si no esperáramos, redirigiría
  // al login por error en cada recarga de página.
  if (cargando) {
    return <p>Cargando…</p>
  }

  // Si no hay usuario logueado, lo mandamos al login.
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Hay sesión: renderiza la pantalla que corresponda.
  return <Outlet />
}