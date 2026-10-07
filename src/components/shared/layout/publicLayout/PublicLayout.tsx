import { Link, Outlet } from 'react-router-dom'
import fluffyLogo from '../../../../assets/fluffy-logo.png'
import './PublicLayout.css'

// Contenedor de las pantallas públicas que reutilizan formularios del
// panel (el registro). Aporta lo que da <Layout /> puertas adentro: un
// ancho máximo, centrado y aire — pero sin el menú de navegación, que
// no tiene sentido para alguien que todavía no tiene cuenta.
export function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="public-header">
        <Link to="/">
          <img src={fluffyLogo} alt="Fluffy" />
        </Link>
      </header>
      <main className="public-content">
        <Outlet />
      </main>
    </div>
  )
}