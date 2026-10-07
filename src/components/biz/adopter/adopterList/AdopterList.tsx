import { useEffect, useState } from 'react'
import type { Adopter } from '../../../../models/adopter'
import { ApiError } from '../../../../api/httpClient'
import { AdopterTable } from '../adopterTable/AdopterTable'
import { loadAllAdopters, deleteAdopter } from './AdopterList.server'

export function AdopterList() {
  const [adopters, setAdopters] = useState<Adopter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAllAdopters()
      .then((data) => {
        if (!cancelled) setAdopters(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los adoptantes')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar este adoptante?')) return
    try {
      await deleteAdopter(id)
      setAdopters((prev) => prev.filter((adopter) => adopter.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el adoptante')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Adoptantes</h1>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <AdopterTable adopters={adopters} onDelete={handleDelete} />}
    </section>
  )
}