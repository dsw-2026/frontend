import { useEffect, useState } from 'react'
import { API_ORIGIN } from '@/shared/api/httpClient'

interface AvatarZoomProps {
  src?: string
  alt: string
  fallbackText?: string
}

export function AvatarZoom({ src, alt, fallbackText }: AvatarZoomProps) {
  const [ampliada, setAmpliada] = useState(false)

  useEffect(() => {
    if (!ampliada) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setAmpliada(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ampliada])

  if (!src) {
    return (
      <div
        className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs text-slate-500 dark:text-slate-400 select-none shrink-0"
        aria-hidden="true"
      >
        {fallbackText ?? '?'}
      </div>
    )
  }

  const resolvedSrc = src.startsWith('http') ? src : `${API_ORIGIN}${src}`

  return (
    <>
      <button
        type="button"
        className="p-0 m-0 border-0 bg-transparent cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 block shrink-0"
        onClick={() => setAmpliada(true)}
        aria-label={`Ver foto de ${alt} en grande`}
      >
        <img
          src={resolvedSrc}
          alt={alt}
          className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 transition-transform hover:scale-105"
        />
      </button>

      {ampliada && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setAmpliada(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:text-slate-300 text-3xl font-light leading-none p-2 focus:outline-none"
            onClick={() => setAmpliada(false)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <img
            src={resolvedSrc}
            alt={alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-slate-700/50"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}