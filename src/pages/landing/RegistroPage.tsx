import { Link } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import './SimplePage.css'

// Reutiliza los formularios de creación de Adoptante/Publicador que ya
// existen (son, funcionalmente, el alta de cada uno) — no se duplica el
// formulario. Ver nota en el chat sobre un detalle de navegación
// pendiente: esos formularios hoy vuelven a la lista interna después de
// guardar, que no es el lugar correcto para alguien que se está
// registrando por primera vez (queda para cuando se separen los dos
// flujos junto con auth).
export function RegistroPage() {
  return (
    <div className="simple-page">
      <div className="simple-page-content">
        <img src={fluffyLogo} alt="Fluffy" className="simple-page-logo" />
        <h1>Registrarme</h1>
        <p className="simple-page-description">¿Cómo querés usar Fluffy?</p>
      </div>

      <div className="simple-page-registro">
        <Link to="/adoptantes/nuevo" className="simple-page-card">
          <h2>Quiero adoptar</h2>
          <p>Buscá una mascota y enviá solicitudes de adopción.</p>
        </Link>
        <Link to="/publicadores/nuevo" className="simple-page-card">
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
