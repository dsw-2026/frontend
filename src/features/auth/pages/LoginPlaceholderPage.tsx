import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fluffyLogo from '@/assets/fluffy-logo.png'
import { useAuth } from '@/shared/api/useAuth'
import { ApiError } from '@/shared/api/httpClient'

function destinationByRole(type: string) {
  if (type === 'Admin') return '/publishers'
  if (type === 'Publisher') return '/pets'
  return '/adopt'
}

export function LoginPlaceholderPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const user = await login(email, password)
      navigate(destinationByRole(user.userType), { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
        
        {/* Header con el Logo */}
        <div className="flex flex-col items-center justify-center">
          <img src={fluffyLogo} alt="Fluffy" className="h-20 w-auto object-contain mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-gray-500">Ingresá a tu cuenta para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            
            {/* Input Email con bordes negros explícitos */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border-2 border-gray-400 bg-white px-3 py-2.5 text-gray-900 shadow-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                placeholder="ejemplo@fluffy.com"
              />
            </div>

            {/* Input Contraseña con bordes negros explícitos */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border-2 border-gray-400 bg-white pl-3 pr-11 py-2.5 text-gray-900 shadow-sm outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  placeholder="••••••••"
                />
                {/* Lógica del emoji invertida: Oculto muestra Ojo Abierto, Visible muestra Mono Tapado */}
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xl rounded-md text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 border border-red-200">
              <p className="text-sm font-medium text-red-600">{error}</p>
            </div>
          )}

          {/* Botón de Submit con Fondo Azul Sólido para evitar que quede invisible */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <Link
            to="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors underline"
          >
            ¿No tenés cuenta? Registrate
          </Link>
        </div>

      </div>
    </div>
  )
}
