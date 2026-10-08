import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fluffyLogo from '../../../assets/fluffy-logo.png'
import { useAuth } from '../../../api/AuthContext'
import { ApiError } from '../../../api/httpClient'
import { getDestinationByRole } from './Login.data'
import { PasswordInput } from '../../shared/ui/passwordInput/PasswordInput'
import '../../landing/Landing.css'
import '../SimplePage.css'
import './Login.css'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(getDestinationByRole(user.userType), { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
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
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="form-field">
            <span>Contraseña</span>
            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="landing-btn landing-btn-primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <Link to="/register" className="back-link">
          ¿No tenés cuenta? Registrate
        </Link>
      </div>
    </div>
  )
}