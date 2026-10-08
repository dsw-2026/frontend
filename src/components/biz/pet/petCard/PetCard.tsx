import { Link } from 'react-router-dom'
import type { Pet } from '../../../../models/pet'
import { API_ORIGIN } from '../../../../api/httpClient'
import { SIZE_LABELS, AGE_UNIT_LABELS, SEX_LABELS, ENERGY_LEVEL_LABELS } from '../petForm/PetForm.data'
import './PetCard.css'

interface PetCardProps {
  pet: Pet
}

export function PetCard({ pet }: PetCardProps) {
  const photoUrl = pet.photo ? (pet.photo.startsWith('http') ? pet.photo : `${API_ORIGIN}${pet.photo}`) : null
  const detailPath = `/adopt/${pet.id}`
  const { vaccinated, neutered, energyLevel } = pet.characteristic
  const isFemale = pet.sex === 'FEMALE'

  return (
    <article className="pet-card">
      <Link to={detailPath} className="pet-card-photo-link" aria-label={`Ver detalle de ${pet.name}`}>
        {photoUrl ? (
          <img src={photoUrl} alt={pet.name} className="pet-card-photo" />
        ) : (
          <div className="pet-card-photo-placeholder" aria-hidden="true">
            🐾
          </div>
        )}
      </Link>
      <div className="pet-card-body">
        <h3>
          <Link to={detailPath}>{pet.name}</Link>
        </h3>
        <p className="pet-card-meta">
          {pet.species.name} · {pet.age} {AGE_UNIT_LABELS[pet.ageUnit].toLowerCase()} ·{' '}
          {SIZE_LABELS[pet.characteristic.size]}
        </p>
        <p className="pet-card-temperament">{pet.characteristic.temperament}</p>

        <ul className="pet-card-tags">
          <li>{SEX_LABELS[pet.sex]}</li>
          <li>Energía {ENERGY_LEVEL_LABELS[energyLevel].toLowerCase()}</li>
          <li className={vaccinated ? '' : 'pet-tag-muted'}>
            {vaccinated ? (isFemale ? 'Vacunada' : 'Vacunado') : isFemale ? 'Sin vacunar' : 'Sin vacunar'}
          </li>
          <li className={neutered ? '' : 'pet-tag-muted'}>
            {neutered ? (isFemale ? 'Castrada' : 'Castrado') : 'Sin castrar'}
          </li>
        </ul>

        <div className="pet-card-actions">
          <Link to={detailPath}>Ver detalle</Link>
          <Link to={`/applications/new?pet=${pet.id}`} className="btn btn-primary">
            Solicitar adopción
          </Link>
        </div>
      </div>
    </article>
  )
}