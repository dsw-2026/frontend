import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import { authService } from '../../services/auth.service'
import { ApiError } from '../../api/httpClient'
import './LandingPage.css'
import './SimplePage.css'

export function LoginPlaceholderPage() {
  // Un estado por cada campo del formulario, más uno para el error.
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  // Permite redirigir a otra pantalla por código (después del login exitoso).
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // evita que el navegador recargue la página al enviar
    setError(null)
    setCargando(true)
    try {
      await authService.login({ email, contrasena })
      // Login exitoso: la cookie ya quedó guardada por el navegador.
      // Redirigimos al panel interno (más adelante se puede ajustar el destino).
      navigate('/especies')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="simple-page">
      <div className="simple-page-content">
        <img src={fluffyLogo} alt="Fluffy" className="simple-page-logo" />
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="landing-btn landing-btn-primary" disabled={cargando}>
            {cargando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <Link to="/registro" className="back-link">
          ¿No tenés cuenta? Registrate
        </Link>
      </div>
    </div>
  )
}