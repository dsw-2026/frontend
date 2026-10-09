import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Paw } from '@/shared/components/ui/Paw'
import { useAuth } from '@/shared/api/useAuth'
import { Button } from '@/shared/components/ui/Button'
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const type = user?.userType
  const isAdmin = type === 'Admin'
  const isPublisher = type === 'Publisher'
  const isAdopter = type === 'Adopter'

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold tracking-wide transition-colors py-2 px-3 rounded-lg block md:inline-block ${
      isActive
        ? 'bg-blue-50 text-blue-600 border-b-2 md:border-b-2 border-blue-600 md:bg-transparent rounded-b-none dark:bg-slate-800 dark:text-blue-400 dark:border-blue-400'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 md:hover:bg-transparent dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 md:dark:hover:bg-transparent'
    }`

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link 
            to={isAdmin ? '/species' : isPublisher ? '/pets' : '/adopt'} 
            className="flex items-center gap-2 text-xl font-black text-slate-900 dark:text-white tracking-tight shrink-0 select-none"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center justify-center w-6 h-6 shrink-0" aria-hidden="true">
              <Paw size={22} toeColor="#60a5fa" padColor="#2563eb" />
            </div>
            <span>Fluffy</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-4 flex-grow justify-center">
            {isAdopter && <NavLink to="/adopt" className={navLinkStyle}>Adoptar</NavLink>}
            
            {isAdmin && (
              <>
                <NavLink to="/species" className={navLinkStyle}>Especies</NavLink>
                <NavLink to="/provinces" className={navLinkStyle}>Provincias</NavLink>
                <NavLink to="/localities" className={navLinkStyle}>Localidades</NavLink>
                <NavLink to="/publishers" className={navLinkStyle}>Publicadores</NavLink>
                <NavLink to="/adopters" className={navLinkStyle}>Adoptantes</NavLink>
              </>
            )}

            {(isPublisher || isAdmin) && <NavLink to="/pets" className={navLinkStyle}>Mascotas</NavLink>}
            {(isAdopter || isPublisher || isAdmin) && <NavLink to="/applications" className={navLinkStyle}>Solicitudes</NavLink>}
          </nav>

          {/* Controles y Sesión Desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <ThemeToggle />

            {user && (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{user.username}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">{user.userType.toLowerCase()}</p>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout} 
                  className="!py-2 !px-4 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  Cerrar sesión
                </Button>
              </div>
            )}
          </div>

          {/* Botón Móvil */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Alternar menú de navegación"
            >
              <span className="text-2xl font-bold">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-inner">
          <div className="px-3 pt-3 pb-4 space-y-1 sm:px-4">
            {isAdopter && <NavLink to="/adopt" className={navLinkStyle} onClick={() => setIsOpen(false)}>Adoptar</NavLink>}
            
            {isAdmin && (
              <>
                <NavLink to="/species" className={navLinkStyle} onClick={() => setIsOpen(false)}>Especies</NavLink>
                <NavLink to="/provinces" className={navLinkStyle} onClick={() => setIsOpen(false)}>Provincias</NavLink>
                <NavLink to="/localities" className={navLinkStyle} onClick={() => setIsOpen(false)}>Localidades</NavLink>
                <NavLink to="/publishers" className={navLinkStyle} onClick={() => setIsOpen(false)}>Publicadores</NavLink>
                <NavLink to="/adopters" className={navLinkStyle} onClick={() => setIsOpen(false)}>Adoptantes</NavLink>
              </>
            )}

            {(isPublisher || isAdmin) && <NavLink to="/pets" className={navLinkStyle} onClick={() => setIsOpen(false)}>Mascotas</NavLink>}
            {(isAdopter || isPublisher || isAdmin) && <NavLink to="/applications" className={navLinkStyle} onClick={() => setIsOpen(false)}>Solicitudes</NavLink>}
            
            {user && (
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3 px-3">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.username}</p>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 capitalize">{user.userType.toLowerCase()}</p>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => { handleLogout(); setIsOpen(false); }} 
                  className="w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-sm transition-colors"
                >
                  Cerrar sesión
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}