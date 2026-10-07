import { useEffect, useState } from 'react'
import { API_ORIGIN } from '../../../../api/httpClient'
import './AvatarZoom.css'

interface AvatarZoomProps {
  src?: string
  alt: string
  fallbackText?: string
}

export function AvatarZoom({ src, alt, fallbackText }: AvatarZoomProps) {
  const [enlarged, setEnlarged] = useState(false)

  useEffect(() => {
    if (!enlarged) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setEnlarged(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enlarged])

  if (!src) {
    return (
      <div className="avatar-zoom-placeholder" aria-hidden="true">
        {fallbackText ?? '?'}
      </div>
    )
  }

  const resolvedSrc = src.startsWith('http') ? src : `${API_ORIGIN}${src}`

  return (
    <>
      <button
        type="button"
        className="avatar-zoom-trigger"
        onClick={() => setEnlarged(true)}
        aria-label={`Ver foto de ${alt} en grande`}
      >
        <img src={resolvedSrc} alt={alt} className="avatar-zoom" />
      </button>

      {enlarged && (
        <div className="avatar-zoom-overlay" onClick={() => setEnlarged(false)}>
          <button
            type="button"
            className="avatar-zoom-close"
            onClick={() => setEnlarged(false)}
            aria-label="Cerrar"
          >
            ×
          </button>
          <img
            src={resolvedSrc}
            alt={alt}
            className="avatar-zoom-full"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}