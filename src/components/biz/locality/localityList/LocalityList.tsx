import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Locality } from '../../../../models/locality'
import { ApiError } from '../../../../api/httpClient'
import { LocalityTable } from '../localityTable/LocalityTable'
import { loadAllLocalities, deleteLocality } from './LocalityList.server'

export function LocalityList() {
  const [localities, setLocalities] = useState<Locality[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAllLocalities()
      .then((data) => {
        if (!cancelled) setLocalities(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las localidades')
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
    if (!window.confirm('¿Eliminar esta localidad?')) return
    try {
      await deleteLocality(id)
      setLocalities((prev) => prev.filter((locality) => locality.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la localidad')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Localidades</h1>
        <Link to="/localities/new" className="btn btn-primary">
          + Nueva localidad
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <LocalityTable localities={localities} onDelete={handleDelete} />}
    </section>
  )
}