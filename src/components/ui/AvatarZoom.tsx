import { useEffect, useState } from 'react'
import { API_ORIGIN } from '../../api/httpClient'
import './AvatarZoom.css'

interface AvatarZoomProps {
  src?: string
  alt: string
  // Se muestra en el círculo cuando no hay foto (ej: la inicial del nombre).
  fallbackText?: string
}

// Componente "dumb" y genérico: no sabe nada de mascotas ni de ninguna
// otra entidad — solo recibe una URL y un texto alternativo. Pensado para
// reutilizarse en cualquier tabla con fotos (Mascota, Publicador, Adoptante...).
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
      <div className="avatar-zoom-placeholder" aria-hidden="true">
        {fallbackText ?? '?'}
      </div>
    )
  }

  // Las fotos subidas con FotoUpload guardan una URL relativa
  // ("/uploads/x.png", servida por el backend) — hay que resolverla
  // contra el origin del backend, no el del frontend donde corre esta
  // página. Una URL absoluta (http...) queda intacta.
  const resolvedSrc = src.startsWith('http') ? src : `${API_ORIGIN}${src}`

  return (
    <>
      <button
        type="button"
        className="avatar-zoom-trigger"
        onClick={() => setAmpliada(true)}
        aria-label={`Ver foto de ${alt} en grande`}
      >
        <img src={resolvedSrc} alt={alt} className="avatar-zoom" />
      </button>

      {ampliada && (
        <div className="avatar-zoom-overlay" onClick={() => setAmpliada(false)}>
          <button
            type="button"
            className="avatar-zoom-close"
            onClick={() => setAmpliada(false)}
            aria-label="Cerrar"
          >
            ×
          </button>
          {/* stopPropagation: clickear la imagen en sí no debe cerrar el
              lightbox, solo clickear afuera (el fondo oscuro) o la X. */}
          <img src={resolvedSrc} alt={alt} className="avatar-zoom-full" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  )
}
