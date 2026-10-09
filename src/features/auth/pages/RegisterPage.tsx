import { Link } from 'react-router-dom'
import fluffyLogo from '@/assets/fluffy-logo.png'

export function RegistroPage() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
      <div className="flex flex-col items-center mb-8">
        <Link to="/" className="mb-4 inline-block transition-transform hover:scale-105">
          <img src={fluffyLogo} alt="Fluffy" className="h-12 w-auto object-contain" />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Registrarme
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          ¿Cómo querés usar Fluffy?
        </p>
      </div>

      <div className="w-full flex flex-col gap-4 mb-8">
        <Link
          to="/register/adopter"
          className="group block p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Quiero adoptar
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Buscá una mascota y enviá solicitudes de adopción.
          </p>
        </Link>

        <Link
          to="/register/publisher"
          className="group block p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Quiero publicar mascotas
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Soy un refugio, rescatista u hogar de tránsito.
          </p>
        </Link>
      </div>

      <Link
        to="/login"
        className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        ¿Ya tenés cuenta? Iniciar sesión
      </Link>
    </div>
  )
}