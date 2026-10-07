import { useEffect, useRef } from 'react'

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
