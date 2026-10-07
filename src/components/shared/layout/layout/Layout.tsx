import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Paw } from '../../ui/paw/Paw'
import { Button } from '../../ui/button/Button'
import { useAuth } from '../../../../api/AuthContext'
import './Layout.css'

export function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const userType = user?.userType

  const isAdmin = userType === 'Admin'
  const isPublisher = userType === 'Publisher'
  const isAdopter = userType === 'Adopter'

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to={isAdmin ? '/publishers' : isPublisher ? '/pets' : '/adopt'} className="app-logo">
          <span className="app-logo-paws" aria-hidden="true">
            <Paw size={16} toeColor="#8fc5e8" padColor="#2d8fc4" style={{ position: 'relative' }} />
            <Paw size={16} toeColor="#f5c130" padColor="#f5c130" style={{ position: 'relative' }} />
          </span>
          Fluffy
        </Link>
        <nav className="app-nav">

          {isAdopter && (
            <NavLink to="/adopt" className={({ isActive }) => (isActive ? 'active' : '')}>
              Adoptar
            </NavLink>
          )}

          {isAdmin && (
            <>
              <NavLink to="/species" className={({ isActive }) => (isActive ? 'active' : '')}>
                Especies
              </NavLink>
              <NavLink to="/provinces" className={({ isActive }) => (isActive ? 'active' : '')}>
                Provincias
              </NavLink>
              <NavLink to="/localities" className={({ isActive }) => (isActive ? 'active' : '')}>
                Localidades
              </NavLink>
              <NavLink to="/publishers" className={({ isActive }) => (isActive ? 'active' : '')}>
                Publicadores
              </NavLink>
              <NavLink to="/adopters" className={({ isActive }) => (isActive ? 'active' : '')}>
                Adoptantes
              </NavLink>
            </>
          )}

          {(isPublisher || isAdmin) && (
            <NavLink to="/pets" className={({ isActive }) => (isActive ? 'active' : '')}>
              Mascotas
            </NavLink>
          )}

          {(isAdopter || isPublisher || isAdmin) && (
            <NavLink to="/applications" className={({ isActive }) => (isActive ? 'active' : '')}>
              Solicitudes
            </NavLink>
          )}
        </nav>

        {user && (
          <div className="app-session">
            <span>{user.username} ({user.userType})</span>
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}