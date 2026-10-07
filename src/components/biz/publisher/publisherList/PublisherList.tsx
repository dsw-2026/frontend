import { useEffect, useState } from 'react'
import type { Publisher } from '../../../../models/publisher'
import { ApiError } from '../../../../api/httpClient'
import { PublisherTable } from '../publisherTable/PublisherTable'
import { loadAllPublishers, deletePublisher } from './PublisherList.server'

export function PublisherList() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAllPublishers()
      .then((data) => {
        if (!cancelled) setPublishers(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los publicadores')
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
    if (!window.confirm('¿Eliminar este publicador?')) return
    try {
      await deletePublisher(id)
      setPublishers((prev) => prev.filter((publisher) => publisher.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el publicador')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Publicadores</h1>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <PublisherTable publishers={publishers} onDelete={handleDelete} />}
    </section>
  )
}