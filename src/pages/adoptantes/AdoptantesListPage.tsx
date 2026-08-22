import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adoptanteService } from '../../services/adoptante.service'
import type { Adoptante } from '../../models/adoptante'
import { AdoptanteTable } from './AdoptanteTable'
import { ApiError } from '../../api/httpClient'

export function AdoptantesListPage() {
  const [adoptantes, setAdoptantes] = useState<Adoptante[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    adoptanteService
      .getAll()
      .then((data) => {
        if (!cancelado) setAdoptantes(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los adoptantes')
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar este adoptante?')) return
    try {
      await adoptanteService.remove(id)
      setAdoptantes((prev) => prev.filter((adoptante) => adoptante.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el adoptante')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Adoptantes</h1>
        <Link to="/adoptantes/nuevo" className="btn btn-primary">
          + Nuevo adoptante
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <AdoptanteTable adoptantes={adoptantes} onDelete={handleDelete} />}
    </section>
  )
}
