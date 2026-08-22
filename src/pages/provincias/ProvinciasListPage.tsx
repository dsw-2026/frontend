import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { provinciaService } from '../../services/provincia.service'
import type { Provincia } from '../../models/provincia'
import { ProvinciaTable } from './ProvinciaTable'
import { ApiError } from '../../api/httpClient'

export function ProvinciasListPage() {
  const [provincias, setProvincias] = useState<Provincia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    provinciaService
      .getAll()
      .then((data) => {
        if (!cancelado) setProvincias(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las provincias')
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
    if (!window.confirm('¿Eliminar esta provincia?')) return
    try {
      await provinciaService.remove(id)
      setProvincias((prev) => prev.filter((provincia) => provincia.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la provincia')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Provincias</h1>
        <Link to="/provincias/nueva" className="btn btn-primary">
          + Nueva provincia
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ProvinciaTable provincias={provincias} onDelete={handleDelete} />}
    </section>
  )
}
