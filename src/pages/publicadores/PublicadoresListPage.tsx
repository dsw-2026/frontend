import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { publicadorService } from '../../services/publicador.service'
import type { Publicador } from '../../models/publicador'
import { PublicadorTable } from './PublicadorTable'
import { ApiError } from '../../api/httpClient'

export function PublicadoresListPage() {
  const [publicadores, setPublicadores] = useState<Publicador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    publicadorService
      .getAll()
      .then((data) => {
        if (!cancelado) setPublicadores(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los publicadores')
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
    if (!window.confirm('¿Eliminar este publicador?')) return
    try {
      await publicadorService.remove(id)
      setPublicadores((prev) => prev.filter((publicador) => publicador.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el publicador')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Publicadores</h1>
        <Link to="/publicadores/nuevo" className="btn btn-primary">
          + Nuevo publicador
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <PublicadorTable publicadores={publicadores} onDelete={handleDelete} />}
    </section>
  )
}
