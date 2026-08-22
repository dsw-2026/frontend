import { Link } from 'react-router-dom'
import './LandingPage.css'

// Placeholder honesto: no hay backend de login todavía (ver pendiente de
// autenticación en /areas/fluffy.md). Mejor decirlo claro que simular un
// formulario que no hace nada.
export function LoginPlaceholderPage() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-logo">🐾 Fluffy</div>
        <h1>Iniciar sesión</h1>
        <p className="landing-description">
          Esta pantalla todavía no está conectada: el login real depende de que el equipo
          implemente autenticación en el backend. Mientras tanto, podés seguir usando el panel
          interno para probar la aplicación.
        </p>
        <div className="landing-actions">
          <Link to="/especies" className="btn btn-primary">
            Ir al panel interno
          </Link>
          <Link to="/" className="btn btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
