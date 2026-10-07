// components/biz/publisher/publisherTable/PublisherTable.tsx
import { Link } from 'react-router-dom'
import type { Publisher } from '../../../../models/publisher'
import { Button } from '../../../shared/ui/button/Button'
import { AvatarZoom } from '../../../shared/ui/avatarZoom/AvatarZoom'

interface PublisherTableProps {
  publishers: Publisher[]
  onDelete: (id: number) => void
}

export function PublisherTable({ publishers, onDelete }: PublisherTableProps) {
  if (publishers.length === 0) {
    return <p className="empty-state">Todavía no hay publicadores cargados.</p>
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
          {publishers.map((publisher) => (
            <tr key={publisher.id}>
              <td>
                <AvatarZoom
                  src={publisher.profilePhoto}
                  alt={`${publisher.firstName} ${publisher.lastName}`}
                  fallbackText={publisher.firstName.charAt(0).toUpperCase()}
                />
              </td>
              <td>
                {publisher.firstName} {publisher.lastName}
              </td>
              <td>{publisher.email}</td>
              <td>
                {publisher.verified ? (
                  <span className="badge badge-success">Sí</span>
                ) : (
                  <span className="badge badge-pending">No</span>
                )}
              </td>
              <td className="data-table-actions">
                <Link to={`/publishers/${publisher.id}/edit`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(publisher.id)}>
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