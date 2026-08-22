import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { especieService } from '../../services/especie.service'
import type { Especie } from '../../models/especie'
import { EspecieTable } from './EspecieTable'
import { ApiError } from '../../api/httpClient'

// Componente "smart": conoce el service, maneja loading/error, y le pasa
// datos ya resueltos al componente dumb (EspecieTable).
export function EspeciesListPage() {
  const [especies, setEspecies] = useState<Especie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // "cancelado" evita hacer setState si el componente se desmonta antes
    // de que la petición termine (por ejemplo, si el usuario navega rápido
    // a otra página).
    let cancelado = false

    especieService
      .getAll()
      .then((data) => {
        if (!cancelado) setEspecies(data)
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las especies')
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
    if (!window.confirm('¿Eliminar esta especie?')) return
    try {
      await especieService.remove(id)
      setEspecies((prev) => prev.filter((especie) => especie.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la especie')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Especies</h1>
        <Link to="/especies/nueva" className="btn btn-primary">
          + Nueva especie
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <EspecieTable especies={especies} onDelete={handleDelete} />}
    </section>
  )
}
