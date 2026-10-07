import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Province } from '../../../../models/province'
import { ApiError } from '../../../../api/httpClient'
import { ProvinceTable } from '../provinceTable/ProvinceTable'
import { loadAllProvinces, deleteProvince } from './ProvinceList.server'

export function ProvinceList() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAllProvinces()
      .then((data) => {
        if (!cancelled) setProvinces(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las provincias')
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
    if (!window.confirm('¿Eliminar esta provincia?')) return
    try {
      await deleteProvince(id)
      setProvinces((prev) => prev.filter((province) => province.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la provincia')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Provincias</h1>
        <Link to="/provinces/new" className="btn btn-primary">
          + Nueva provincia
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <ProvinceTable provinces={provinces} onDelete={handleDelete} />}
    </section>
  )
}