import { Outlet } from 'react-router-dom'
import { Navbar } from './NavBar'

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}