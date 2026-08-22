import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { localidadService } from '../../services/localidad.service'
import type { Localidad } from '../../models/localidad'
import { LocalidadTable } from './LocalidadTable'
import { ApiError } from '../../api/httpClient'

export function LocalidadesListPage() {
  const [localidades, setLocalidades] = useState<Localidad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    localidadService
      .getAll()
      .then((data) => {
        if (!cancelado) setLocalidades(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las localidades')
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
    if (!window.confirm('¿Eliminar esta localidad?')) return
    try {
      await localidadService.remove(id)
      setLocalidades((prev) => prev.filter((localidad) => localidad.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la localidad')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Localidades</h1>
        <Link to="/localidades/nueva" className="btn btn-primary">
          + Nueva localidad
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <LocalidadTable localidades={localidades} onDelete={handleDelete} />}
    </section>
  )
}
