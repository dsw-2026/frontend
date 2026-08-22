import { Link } from 'react-router-dom'
import './LandingPage.css'

// Página pública: fuera del <Layout> de la app interna (sin el nav de
// gestión) — es lo primero que ve cualquiera al entrar a la URL de
// Fluffy, sin necesidad de estar logueado.
export function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-logo">🐾 Fluffy</div>
        <p className="landing-tagline">Conectá. Rescatá. Adoptá.</p>
        <p className="landing-description">
          Fluffy conecta refugios, rescatistas y hogares de tránsito con personas que buscan
          adoptar una mascota. Publicá animales en adopción, encontrá compañeros según su
          compatibilidad con tu hogar, y seguí todo el proceso de adopción en un solo lugar.
        </p>
        <div className="landing-actions">
          <Link to="/registro" className="btn btn-primary">
            Registrarme
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Iniciar sesión
          </Link>
        </div>
      </div>

      <section className="landing-contact">
        <h2>Contacto</h2>
        {/* TODO: reemplazar por los datos reales de contacto del equipo/organización */}
        <ul>
          <li>contacto@fluffy.com.ar</li>
          <li>Instagram: @fluffy.adopta</li>
          <li>Rosario, Santa Fe, Argentina</li>
        </ul>
      </section>

      <footer className="landing-footer">
        <Link to="/especies" className="landing-internal-link">
          → Acceder al panel interno (temporal, hasta que exista login)
        </Link>
      </footer>
    </div>
  )
}
