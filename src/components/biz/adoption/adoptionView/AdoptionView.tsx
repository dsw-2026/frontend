import { useEffect, useState } from 'react'
import type { Pet } from '../../../../models/pet'
import { ApiError } from '../../../../api/httpClient'
import { PetCard } from '../../pet/petCard/PetCard'
import { loadAvailablePets } from './AdoptionView.server'
import './AdoptionView.css'

export function AdoptionView() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadAvailablePets()
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
  }, [])

  return (
    <section>
      <div className="page-header">
        <h1>Mascotas en adopción</h1>
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && pets.length === 0 && (
        <p className="empty-state">No hay mascotas disponibles para adopción en este momento.</p>
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