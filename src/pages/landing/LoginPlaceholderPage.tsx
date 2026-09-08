import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fluffyLogo from '../../assets/fluffy-logo.png'
import { useAuth } from '../../api/AuthContext'
import { ApiError } from '../../api/httpClient'
import './LandingPage.css'
import './SimplePage.css'

// A dónde entra cada rol después de loguearse.
function destinoSegunRol(tipo: string) {
  if (tipo === 'Admin') return '/publicadores'
  if (tipo === 'Publicador') return '/mascotas'
  return '/adoptar'
}

export function LoginPlaceholderPage() {
  // Un estado por cada campo del formulario, más uno para el error.
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  // Permite redirigir a otra pantalla por código (después del login exitoso).
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // evita que el navegador recargue la página al enviar
    setError(null)
    setCargando(true)
    try {
      const usuario = await login(email, contrasena)
      // Login exitoso: la cookie ya quedó guardada por el navegador.
      // Cada rol entra por la pantalla que le sirve.
      navigate(destinoSegunRol(usuario.tipoUsuario), { replace: true })
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
        <label className="form-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="form-field">
          <span>Contraseña</span>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

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