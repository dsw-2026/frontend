import { Link } from 'react-router-dom'
import type { Adopter } from '../../../../models/adopter'
import { Button } from '../../../shared/ui/button/Button'
import { AvatarZoom } from '../../../shared/ui/avatarZoom/AvatarZoom'

interface AdopterTableProps {
  adopters: Adopter[]
  onDelete: (id: number) => void
}

export function AdopterTable({ adopters, onDelete }: AdopterTableProps) {
  if (adopters.length === 0) {
    return <p className="empty-state">Todavía no hay adoptantes cargados.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th aria-label="Foto" />
            <th>Nombre</th>
            <th>Email</th>
            <th>Verificado</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {adopters.map((adopter) => (
            <tr key={adopter.id}>
              <td>
                <AvatarZoom
                  src={adopter.profilePhoto}
                  alt={`${adopter.firstName} ${adopter.lastName}`}
                  fallbackText={adopter.firstName.charAt(0).toUpperCase()}
                />
              </td>
              <td>
                {adopter.firstName} {adopter.lastName}
              </td>
              <td>{adopter.email}</td>
              <td>
                {adopter.verified ? (
                  <span className="badge badge-success">Sí</span>
                ) : (
                  <span className="badge badge-pending">No</span>
                )}
              </td>
              <td className="data-table-actions">
                <Link to={`/adopters/${adopter.id}/edit`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(adopter.id)}>
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