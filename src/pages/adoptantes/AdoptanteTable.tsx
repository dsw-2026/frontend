import { Link } from 'react-router-dom'
import type { Adoptante } from '../../models/adoptante'
import { Button } from '../../components/ui/Button'
import { AvatarZoom } from '../../components/ui/AvatarZoom'

interface AdoptanteTableProps {
  adoptantes: Adoptante[]
  onDelete: (id: number) => void
}

export function AdoptanteTable({ adoptantes, onDelete }: AdoptanteTableProps) {
  if (adoptantes.length === 0) {
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
          {adoptantes.map((adoptante) => (
            <tr key={adoptante.id}>
              <td>
                <AvatarZoom
                  src={adoptante.fotoPerfil}
                  alt={`${adoptante.nombre} ${adoptante.apellido}`}
                  fallbackText={adoptante.nombre.charAt(0).toUpperCase()}
                />
              </td>
              <td>
                {adoptante.nombre} {adoptante.apellido}
              </td>
              <td>{adoptante.email}</td>
              <td>
                {adoptante.verificacion ? (
                  <span className="badge badge-success">Sí</span>
                ) : (
                  <span className="badge badge-pending">No</span>
                )}
              </td>
              <td className="data-table-actions">
                <Link to={`/adoptantes/${adoptante.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(adoptante.id)}>
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
