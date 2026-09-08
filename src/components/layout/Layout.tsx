import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Paw } from '../ui/Paw'
import { useAuth } from '../../api/AuthContext'
import './Layout.css'

// Un solo Layout para toda la app: define header/nav una vez, y cada
// página (ver App.tsx) se renderiza adentro vía <Outlet />.
export function Layout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-logo">
          {/* Reemplaza el emoji 🐾: el emoji lo pinta el sistema operativo
              con SUS colores (no controlables por CSS) — con Paw usamos
              los colores reales de la marca. */}
          <span className="app-logo-paws" aria-hidden="true">
            <Paw size={16} toeColor="#8fc5e8" padColor="#2d8fc4" style={{ position: 'relative' }} />
            <Paw size={16} toeColor="#f5c130" padColor="#f5c130" style={{ position: 'relative' }} />
          </span>
          Fluffy
        </Link>
        <nav className="app-nav">
          <NavLink to="/adoptar" className={({ isActive }) => (isActive ? 'active' : '')}>
            Adoptar
          </NavLink>
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
          <NavLink to="/mascotas" className={({ isActive }) => (isActive ? 'active' : '')}>
            Mascotas
          </NavLink>
          <NavLink to="/solicitudes" className={({ isActive }) => (isActive ? 'active' : '')}>
            Solicitudes
          </NavLink>
        </nav>

        {/* Sección de sesión: muestra quién está logueado y permite salir.
            Solo aparece si hay un usuario en el context (usuario !== null). */}
        {usuario && (
          <div className="app-session">
            <span>{usuario.nombreUsuario} ({usuario.tipoUsuario})</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Cerrar sesión
            </button>
          </div>
        )}
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}