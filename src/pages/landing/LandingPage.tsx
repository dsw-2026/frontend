import { Link } from 'react-router-dom'
import { Paw } from '../../components/ui/Paw'
import { useScrollReveal } from './useScrollReveal'
import fluffyLogo from '../../assets/fluffy-logo.png'
import './LandingPage.css'

// Página pública: fuera del <Layout> de la app interna (sin el nav de
// gestión) — es lo primero que ve cualquiera al entrar a la URL de
// Fluffy, sin necesidad de estar logueado.
export function LandingPage() {
  const descripcionRef = useScrollReveal<HTMLDivElement>()
  const contactoRef = useScrollReveal<HTMLDivElement>()

  return (
    <div className="landing-page">
      <section className="landing-hero">
        {/* Resplandor de fondo, decorativo, sin contenido semántico */}
        <div className="landing-glow" aria-hidden="true" />

        {/* Patitas flotantes decorativas — puramente visuales */}
        <div className="landing-paws" aria-hidden="true">
          <Paw size={44} toeColor="#8fc5e8" opacity={0.5} rotation={-18} style={{ left: '6%', top: '18%', animation: 'fl-float 8s ease-in-out infinite' }} />
          <Paw size={34} toeColor="#f5c130" opacity={0.55} rotation={16} style={{ right: '8%', top: '26%', animation: 'fl-float 7.4s ease-in-out infinite', animationDelay: '-2.2s' }} />
          <Paw size={28} toeColor="#8fc5e8" opacity={0.4} rotation={8} style={{ left: '12%', bottom: '12%', animation: 'fl-float 8.6s ease-in-out infinite', animationDelay: '-4.5s' }} />
          <Paw size={38} toeColor="#8fc5e8" opacity={0.35} rotation={-12} style={{ right: '14%', bottom: '18%', animation: 'fl-float 9.2s ease-in-out infinite', animationDelay: '-1.1s' }} />
        </div>

        <div className="landing-hero-content">
          <img src={fluffyLogo} alt="Fluffy" className="landing-logo" />

          <h1 className="landing-title">
            Conectá<span className="landing-title-dot">.</span> Rescatá<span className="landing-title-dot">.</span>{' '}
            Adoptá<span className="landing-title-dot">.</span>
          </h1>

          <p className="landing-tagline">
            Fluffy conecta refugios, rescatistas y hogares de tránsito con personas que buscan adoptar una mascota.
          </p>

          <div className="landing-actions">
            <Link to="/registro" className="landing-btn landing-btn-primary">
              Registrarme
            </Link>
            <Link to="/login" className="landing-btn landing-btn-secondary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-description-band">
        <div ref={descripcionRef} className="landing-reveal landing-description">
          <div className="landing-divider" />
          <p>
            Publicá animales en adopción, encontrá compañeros según su compatibilidad con tu hogar, y seguí todo el
            proceso de adopción en un solo lugar.
          </p>
        </div>
      </section>

      <footer className="landing-footer">
        <div ref={contactoRef} className="landing-reveal landing-contact-block">
          <div className="landing-contact-grid">
            <div className="landing-contact-item">
              <span className="landing-contact-label">Email</span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=fluffydsw@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                fluffydsw@gmail.com
              </a>
            </div>
            <div className="landing-contact-item">
              <span className="landing-contact-label">Instagram</span>
              <a href="#">@fluffy.adopciones</a>
            </div>
            <div className="landing-contact-item">
              <span className="landing-contact-label">Ubicación</span>
              <span className="landing-contact-value">Rosario, Santa Fe, Argentina</span>
            </div>
          </div>

          <div className="landing-footer-brand">
            <Paw size={22} toeColor="#8fc5e8" padColor="#f5c130" />
            <span className="landing-footer-name">Fluffy</span>
            <span className="landing-footer-slogan">— Conectá. Rescatá. Adoptá.</span>
          </div>
        </div>

        <Link to="/especies" className="landing-internal-link">
          → Acceder al panel interno (temporal, hasta que exista login)
        </Link>
      </footer>
    </div>
  )
}
