import { Link, NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

// Un solo Layout para toda la app: define header/nav una vez, y cada
// página (ver App.tsx) se renderiza adentro vía <Outlet />.
export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="app-logo">
          🐾 Fluffy
        </Link>
        <nav className="app-nav">
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
        </nav>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
