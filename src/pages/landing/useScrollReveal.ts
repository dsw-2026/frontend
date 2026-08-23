import { useEffect, useRef } from 'react'

// Reemplaza la lógica de scroll-reveal que traía el export de Claude
// Design (basada en su propio "DCLogic", que no existe fuera de esa
// herramienta) por un IntersectionObserver real. Se deja de observar en
// cuanto aparece una vez — no vuelve a ocultarse si se sale de pantalla.
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    if (!('IntersectionObserver' in window)) {
      nodo.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          nodo.classList.add('is-visible')
          observer.unobserve(nodo)
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(nodo)

    return () => observer.disconnect()
  }, [])

  return ref
}
