import { Link } from 'react-router-dom'
import type { Pet } from '../../../../models/pet'
import { API_ORIGIN } from '../../../../api/httpClient'
import { SIZE_LABELS, AGE_UNIT_LABELS } from '../petForm/PetForm.data'
import './PetCard.css'

interface PetCardProps {
  pet: Pet
}

export function PetCard({ pet }: PetCardProps) {
  const photoUrl = pet.photo ? (pet.photo.startsWith('http') ? pet.photo : `${API_ORIGIN}${pet.photo}`) : null

  return (
    <article className="pet-card">
      {photoUrl ? (
        <img src={photoUrl} alt={pet.name} className="pet-card-photo" />
      ) : (
        <div className="pet-card-photo-placeholder" aria-hidden="true">
          🐾
        </div>
      )}
      <div className="pet-card-body">
        <h3>{pet.name}</h3>
        <p className="pet-card-meta">
          {pet.species.name} · {pet.age} {AGE_UNIT_LABELS[pet.ageUnit].toLowerCase()} ·{' '}
          {SIZE_LABELS[pet.characteristic.size]}
        </p>
        <p className="pet-card-temperament">{pet.characteristic.temperament}</p>
        <Link to={`/applications/new?pet=${pet.id}`} className="btn btn-primary">
          Solicitar adopción
        </Link>
      </div>
    </article>
  )
}