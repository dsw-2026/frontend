import { Link, Outlet } from 'react-router-dom'
import fluffyLogo from '@/assets/fluffy-logo.png'

export function LayoutPublico() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <header className="py-6 px-4 flex justify-center">
        <Link to="/" className="inline-block transition-transform hover:scale-105">
          <img src={fluffyLogo} alt="Fluffy" className="h-10 w-auto object-contain" />
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-md mx-auto">
        <Outlet />
      </main>
    </div>
  )
}