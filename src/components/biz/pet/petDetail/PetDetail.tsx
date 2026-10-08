import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Pet } from '../../../../models/pet'
import { PetStatus } from '../../../../models/pet'
import { API_ORIGIN, ApiError } from '../../../../api/httpClient'
import {
  SEX_LABELS,
  AGE_UNIT_LABELS,
  SIZE_LABELS,
  ENERGY_LEVEL_LABELS,
  TOLERANCE_LABELS,
} from '../../pet/petForm/PetForm.data'
import { loadPet } from './PetDetail.server'
import './PetDetail.css'

export function PetDetail() {
  const { id } = useParams()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    loadPet(Number(id))
      .then((data) => {
        if (!cancelled) setPet(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'No se pudo cargar la mascota')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const backLink = (
    <Link to="/adopt" className="back-link">
      ← Volver a mascotas en adopción
    </Link>
  )

  if (loading) return <p>Cargando…</p>

  if (error || !pet) {
    return (
      <section>
        {backLink}
        <p className="error-message">{error ?? 'No se encontró la mascota'}</p>
      </section>
    )
  }

  const { characteristic } = pet
  const photoUrl = pet.photo ? (pet.photo.startsWith('http') ? pet.photo : `${API_ORIGIN}${pet.photo}`) : null
  const isAvailable = pet.status === PetStatus.AVAILABLE

  return (
    <section>
      {backLink}
      <h1>{pet.name}</h1>

      <div className="pet-detail">
        {photoUrl ? (
          <img src={photoUrl} alt={pet.name} className="pet-detail-photo" />
        ) : (
          <div className="pet-detail-photo pet-detail-photo-placeholder" aria-hidden="true">
            🐾
          </div>
        )}

        <div className="pet-detail-info">
          <p className="pet-detail-temperament">{characteristic.temperament}</p>

          <dl className="pet-detail-facts">
            <dt>Especie</dt>
            <dd>{pet.species.name}</dd>
            <dt>Sexo</dt>
            <dd>{SEX_LABELS[pet.sex]}</dd>
            <dt>Edad</dt>
            <dd>
              {pet.age} {AGE_UNIT_LABELS[pet.ageUnit].toLowerCase()}
            </dd>
            <dt>Tamaño</dt>
            <dd>{SIZE_LABELS[characteristic.size]}</dd>
            <dt>Energía</dt>
            <dd>{ENERGY_LEVEL_LABELS[characteristic.energyLevel]}</dd>
            <dt>Vacunación</dt>
            <dd>{characteristic.vaccinated ? 'Sí' : 'No'}</dd>
            <dt>Castración</dt>
            <dd>{characteristic.neutered ? 'Sí' : 'No'}</dd>
            <dt>Tolera niños</dt>
            <dd>{TOLERANCE_LABELS[characteristic.toleratesChildren]}</dd>
            <dt>Tolera otros animales</dt>
            <dd>{TOLERANCE_LABELS[characteristic.toleratesOtherAnimals]}</dd>
            <dt>Tolera encierro</dt>
            <dd>{TOLERANCE_LABELS[characteristic.toleratesConfinement]}</dd>
            <dt>Publicada por</dt>
            <dd>
              {pet.publisher.firstName} {pet.publisher.lastName}
            </dd>
          </dl>

          {characteristic.additionalNotes && (
            <>
              <h2 className="pet-detail-subtitle">Notas adicionales</h2>
              <p>{characteristic.additionalNotes}</p>
            </>
          )}

          {isAvailable ? (
            <Link to={`/applications/new?pet=${pet.id}`} className="btn btn-primary">
              Solicitar adopción
            </Link>
          ) : (
            <p className="empty-state">Esta mascota ya no está disponible para adopción.</p>
          )}
        </div>
      </div>
    </section>
  )
}