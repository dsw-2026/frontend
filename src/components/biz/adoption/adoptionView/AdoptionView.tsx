import { useEffect, useState } from 'react'
import type { Pet } from '../../../../models/pet'
import type { Species } from '../../../../models/species'
import { ApiError } from '../../../../api/httpClient'
import { PetCard } from '../../pet/petCard/PetCard'
import { loadAvailablePets, loadSpecies } from './AdoptionView.server'
import './AdoptionView.css'

export function AdoptionView() {
  const [pets, setPets] = useState<Pet[]>([])
  const [species, setSpecies] = useState<Species[]>([])
  const [speciesId, setSpeciesId] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSpecies()
      .then(setSpecies)
      .catch(() => {
        // Without species the filter just shows "All species"; the list still works.
      })
  }, [])

  useEffect(() => {
    let cancelled = false

    loadAvailablePets(speciesId)
      .then((data) => {
        if (!cancelled) setPets(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las mascotas')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [speciesId])

  function handleSpeciesChange(value: string) {
    setLoading(true)
    setError(null)
    setSpeciesId(value ? Number(value) : undefined)
  }

  return (
    <section>
      <div className="page-header">
        <h1>Mascotas en adopción</h1>
      </div>

      <label className="form-field pets-filter">
        Especie
        <select value={speciesId ?? ''} onChange={(e) => handleSpeciesChange(e.target.value)}>
          <option value="">Todas las especies</option>
          {species.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && pets.length === 0 && (
        <p className="empty-state">
          {speciesId
            ? 'No hay mascotas disponibles de esta especie en este momento.'
            : 'No hay mascotas disponibles para adopción en este momento.'}
        </p>
      )}
      {!loading && !error && pets.length > 0 && (
        <div className="pets-grid">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </section>
  )
}