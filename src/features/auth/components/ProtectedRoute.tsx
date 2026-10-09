import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/shared/api/useAuth'

interface ProtectedRouteProps {
  allowedRoles?: string[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to={user.userType === 'Publisher' ? '/pets' : '/adopt'} replace />
  }

  return <Outlet />
}
