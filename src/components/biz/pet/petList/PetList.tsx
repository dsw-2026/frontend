import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Pet } from '../../../../models/pet'
import { ApiError } from '../../../../api/httpClient'
import { useAuth } from '../../../../api/AuthContext'
import { PetTable } from '../petTable/PetTable'
import { loadPets, deletePet } from './PetList.server'

export function PetList() {
  const { user } = useAuth()
  const isPublisher = user?.userType === 'Publisher'
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    
    loadPets(isPublisher ? user?.id : undefined)
    
      .then((data) => {
        if (!cancelled) setPets(isPublisher ? data.filter((pet) => pet.publisher.id === user?.id) : data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar las mascotas')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isPublisher, user?.id])

  async function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta mascota?')) return
    try {
      await deletePet(id)
      setPets((prev) => prev.filter((pet) => pet.id !== id))
    } catch (err) {
      window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la mascota')
    }
  }

  return (
    <section>
      <div className="page-header">
        <h1>Mascotas</h1>
        {isPublisher && (
          <Link to="/pets/new" className="btn btn-primary">
            + Nueva mascota
          </Link>
        )}
      </div>

      {loading && <p>Cargando…</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <PetTable pets={pets} showPublisher={!isPublisher} onDelete={handleDelete} />}
    </section>
  )
}