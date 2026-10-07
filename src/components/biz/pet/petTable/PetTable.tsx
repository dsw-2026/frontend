import { Link } from 'react-router-dom'
import type { Pet } from '../../../../models/pet'
import { Button } from '../../../shared/ui/button/Button'
import { AvatarZoom } from '../../../shared/ui/avatarZoom/AvatarZoom'
import { STATUS_LABELS } from '../petForm/PetForm.data'
import { STATUS_BADGE_CLASS } from './PetTable.data'

interface PetTableProps {
  pets: Pet[]
  showPublisher: boolean
  onDelete: (id: number) => void
}

export function PetTable({ pets, showPublisher, onDelete }: PetTableProps) {
  if (pets.length === 0) {
    return <p className="empty-state">Todavía no hay mascotas cargadas.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th aria-label="Foto" />
            <th>Nombre</th>
            <th>Especie</th>
            {showPublisher && <th>Publicador</th>}
            <th>Estado</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>
                <AvatarZoom src={pet.photo} alt={pet.name} fallbackText={pet.name.charAt(0).toUpperCase()} />
              </td>
              <td>{pet.name}</td>
              <td>{pet.species.name}</td>
              {showPublisher && (
                <td>
                  {pet.publisher.firstName} {pet.publisher.lastName}
                </td>
              )}
              <td>
                <span className={`badge ${STATUS_BADGE_CLASS[pet.status]}`}>{STATUS_LABELS[pet.status]}</span>
              </td>
              <td className="data-table-actions">
                <Link to={`/pets/${pet.id}/edit`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(pet.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}