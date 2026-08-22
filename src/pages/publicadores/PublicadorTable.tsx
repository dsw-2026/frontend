import { Link } from 'react-router-dom'
import type { Publicador } from '../../models/publicador'
import { Button } from '../../components/ui/Button'
import { AvatarZoom } from '../../components/ui/AvatarZoom'

interface PublicadorTableProps {
  publicadores: Publicador[]
  onDelete: (id: number) => void
}

export function PublicadorTable({ publicadores, onDelete }: PublicadorTableProps) {
  if (publicadores.length === 0) {
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
          {publicadores.map((publicador) => (
            <tr key={publicador.id}>
              <td>
                <AvatarZoom
                  src={publicador.fotoPerfil}
                  alt={`${publicador.nombre} ${publicador.apellido}`}
                  fallbackText={publicador.nombre.charAt(0).toUpperCase()}
                />
              </td>
              <td>
                {publicador.nombre} {publicador.apellido}
              </td>
              <td>{publicador.email}</td>
              <td>
                {publicador.verificacion ? (
                  <span className="badge badge-success">Sí</span>
                ) : (
                  <span className="badge badge-pending">No</span>
                )}
              </td>
              <td className="data-table-actions">
                <Link to={`/publicadores/${publicador.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(publicador.id)}>
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
