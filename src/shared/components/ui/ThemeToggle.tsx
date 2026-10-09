import { useTheme } from '@/shared/context/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
      title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      aria-label="Alternar tema"
    >
      {theme === 'dark' ? (
        // Icono Sol
        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.78a1 1 0 011.42 0l.7.7a1 1 0 11-1.42 1.42l-.7-.7a1 1 0 010-1.42zm3.78 6.22a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-2.06 4.78a1 1 0 010 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7a1 1 0 011.42 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.78-1.06a1 1 0 01-1.42 0l-.7-.7a1 1 0 011.42-1.42l.7.7a1 1 0 010 1.42zm-3.22-4.94a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm2.78-4.78a1 1 0 010-1.42l.7-.7a1 1 0 011.42 1.42l-.7.7a1 1 0 01-1.42 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd" />
        </svg>
      ) : (
        // Icono Luna
        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}