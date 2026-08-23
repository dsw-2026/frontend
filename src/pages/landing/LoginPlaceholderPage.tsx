import { Link } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import './LandingPage.css'
import './SimplePage.css'

// Placeholder honesto: no hay backend de login todavía (ver pendiente de
// autenticación en /areas/fluffy.md). Mejor decirlo claro que simular un
// formulario que no hace nada.
export function LoginPlaceholderPage() {
  return (
    <div className="simple-page">
      <div className="simple-page-content">
        <img src={fluffyLogo} alt="Fluffy" className="simple-page-logo" />
        <h1>Iniciar sesión</h1>
        <p className="simple-page-description">
          El login real todavia no está programado. Mientras tanto, podés seguir usando el panel interno para probar la aplicación.
        </p>
        <div className="simple-page-actions">
          <Link to="/especies" className="landing-btn landing-btn-primary">
            Ir al panel interno
          </Link>
          <Link to="/" className="landing-btn landing-btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
