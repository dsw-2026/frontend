import { Link } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import './SimplePage.css'

// Reutiliza los formularios de creación de Adoptante/Publicador, pero a
// través de rutas públicas dedicadas (/registro/adoptante y
// /registro/publicador, ver App.tsx) — así alguien SIN cuenta puede
// registrarse, sin toparse con la protección de rutas que cubre el panel
// interno de gestión.
export function RegistroPage() {
  return (
    <div className="simple-page">
      <div className="simple-page-content">
        <img src={fluffyLogo} alt="Fluffy" className="simple-page-logo" />
        <h1>Registrarme</h1>
        <p className="simple-page-description">¿Cómo querés usar Fluffy?</p>
      </div>

      <div className="simple-page-registro">
        <Link to="/registro/adoptante" className="simple-page-card">
          <h2>Quiero adoptar</h2>
          <p>Buscá una mascota y enviá solicitudes de adopción.</p>
        </Link>
        <Link to="/registro/publicador" className="simple-page-card">
          <h2>Quiero publicar mascotas</h2>
          <p>Soy un refugio, rescatista u hogar de tránsito.</p>
        </Link>
      </div>

      <Link to="/login" className="back-link">
        ¿Ya tenés cuenta? Iniciar sesión
      </Link>
    </div>
  )
}