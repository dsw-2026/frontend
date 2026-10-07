
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Species } from '../../../../models/species'
import { ApiError } from '../../../../api/httpClient'
import { SpeciesTable } from '../speciesTable/SpeciesTable'
import { loadAllSpecies, deleteSpecies } from './SpeciesList.server'

export function SpeciesList() {
  const [speciesList, setSpeciesList] = useState<Species[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAllSpecies()
      .then((data) => {
        if (!cancelled) setSpeciesList(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las especies')
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
    if (!window.confirm('¿Eliminar esta especie?')) return
    try {
      await deleteSpecies(id)
      setSpeciesList((prev) => prev.filter((species) => species.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la especie')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Especies</h1>
        <Link to="/species/new" className="btn btn-primary">
          + Nueva especie
        </Link>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <SpeciesTable speciesList={speciesList} onDelete={handleDelete} />}
    </section>
  )
}