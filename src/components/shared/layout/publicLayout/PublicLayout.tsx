import { Link, Outlet } from 'react-router-dom'
import fluffyLogo from '../../../../assets/fluffy-logo.png'
import './PublicLayout.css'

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