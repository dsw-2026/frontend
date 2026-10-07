import { Link } from 'react-router-dom'
import fluffyLogo from '../../../assets/fluffy-logo.png'
import '../SimplePage.css'
import './Register.css'

export function Register() {
  return (
    <div className="simple-page">
      <div className="simple-page-content">
        <img src={fluffyLogo} alt="Fluffy" className="simple-page-logo" />
        <h1>Registrarme</h1>
        <p className="simple-page-description">¿Cómo querés usar Fluffy?</p>
      </div>

      <div className="simple-page-register">
        <Link to="/register/adopter" className="simple-page-card">
          <h2>Quiero adoptar</h2>
          <p>Buscá una mascota y enviá solicitudes de adopción.</p>
        </Link>
        <Link to="/register/publisher" className="simple-page-card">
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