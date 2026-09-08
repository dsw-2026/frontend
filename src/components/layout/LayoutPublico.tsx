import { Link, Outlet } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import './LayoutPublico.css'

// Contenedor de las pantallas públicas que reutilizan formularios del
// panel (el registro). Aporta lo que da <Layout /> puertas adentro: un
// ancho máximo, centrado y aire — pero sin el menú de navegación, que
// no tiene sentido para alguien que todavía no tiene cuenta.
export function LayoutPublico() {
  return (
    <div className="publico-shell">
      <header className="publico-header">
        <Link to="/">
          <img src={fluffyLogo} alt="Fluffy" />
        </Link>
      </header>
      <main className="publico-content">
        <Outlet />
      </main>
    </div>
  )
}