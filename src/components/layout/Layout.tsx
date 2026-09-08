import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Paw } from '../ui/Paw'
import { useAuth } from '../../api/AuthContext'
import './Layout.css'
import { Button } from '../ui/Button'

export function Layout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  // Definimos qué links puede ver cada rol. Es la fuente única de verdad
  // del menú: cambiar acá cambia lo que ve cada tipo de usuario.
  const tipo = usuario?.tipoUsuario

  const esAdmin = tipo === 'Admin'
  const esPublicador = tipo === 'Publicador'
  const esAdoptante = tipo === 'Adoptante'

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to={esAdmin ? '/publicadores' : esPublicador ? '/mascotas' : '/adoptar'} className="app-logo">
          <span className="app-logo-paws" aria-hidden="true">
            <Paw size={16} toeColor="#8fc5e8" padColor="#2d8fc4" style={{ position: 'relative' }} />
            <Paw size={16} toeColor="#f5c130" padColor="#f5c130" style={{ position: 'relative' }} />
          </span>
          Fluffy
        </Link>
        <nav className="app-nav">
          {/* Adoptar: solo Adoptante. Es el catálogo desde el que se pide una
              adopción, y solo un Adoptante puede crear una solicitud. */}
          {esAdoptante && (
            <NavLink to="/adoptar" className={({ isActive }) => (isActive ? 'active' : '')}>
              Adoptar
            </NavLink>
          )}

          {/* Catálogo administrativo (Especies, Provincias, Localidades): solo Admin. */}
          {esAdmin && (
            <>
              <NavLink to="/especies" className={({ isActive }) => (isActive ? 'active' : '')}>
                Especies
              </NavLink>
              <NavLink to="/provincias" className={({ isActive }) => (isActive ? 'active' : '')}>
                Provincias
              </NavLink>
              <NavLink to="/localidades" className={({ isActive }) => (isActive ? 'active' : '')}>
                Localidades
              </NavLink>
              <NavLink to="/publicadores" className={({ isActive }) => (isActive ? 'active' : '')}>
                Publicadores
              </NavLink>
              <NavLink to="/adoptantes" className={({ isActive }) => (isActive ? 'active' : '')}>
                Adoptantes
              </NavLink>
            </>
          )}

          {/* Mascotas: Publicador (gestiona las suyas) y Admin. */}
          {(esPublicador || esAdmin) && (
            <NavLink to="/mascotas" className={({ isActive }) => (isActive ? 'active' : '')}>
              Mascotas
            </NavLink>
          )}

          {/* Solicitudes: todos los roles (cada uno ve las que le corresponden, filtrado en el backend). */}
          {(esAdoptante || esPublicador || esAdmin) && (
            <NavLink to="/solicitudes" className={({ isActive }) => (isActive ? 'active' : '')}>
              Solicitudes
            </NavLink>
          )}
        </nav>

        {usuario && (
          <div className="app-session">
            <span>{usuario.nombreUsuario} ({usuario.tipoUsuario})</span>
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