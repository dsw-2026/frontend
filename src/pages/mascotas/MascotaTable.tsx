import { Link } from 'react-router-dom'
import { EstadoMascota, type Mascota } from '../../models/mascota'
import { Button } from '../../components/ui/Button'
import { AvatarZoom } from '../../components/ui/AvatarZoom'

interface MascotaTableProps {
  mascotas: Mascota[]
  // Falso cuando la lista ya está filtrada a las mascotas de un solo
  // publicador: la columna diría siempre el mismo nombre.
  mostrarPublicador: boolean
  onDelete: (id: number) => void
}

const ESTADO_BADGE_CLASS: Record<EstadoMascota, string> = {
  DISPONIBLE: 'badge-success',
  EN_PROCESO: 'badge-pending',
  ADOPTADA: 'badge-pending',
  NO_DISPONIBLE: 'badge-pending',
}

const ESTADO_LABELS: Record<EstadoMascota, string> = {
  DISPONIBLE: 'Disponible',
  EN_PROCESO: 'En proceso',
  ADOPTADA: 'Adoptada',
  NO_DISPONIBLE: 'No disponible',
}

export function MascotaTable({ mascotas, mostrarPublicador, onDelete }: MascotaTableProps) {
  if (mascotas.length === 0) {
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
            {mostrarPublicador && <th>Publicador</th>}
            <th>Estado</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {mascotas.map((mascota) => (
            <tr key={mascota.id}>
              <td>
                <AvatarZoom src={mascota.foto} alt={mascota.nombre} fallbackText={mascota.nombre.charAt(0).toUpperCase()} />
              </td>
              <td>{mascota.nombre}</td>
              <td>{mascota.especie.nombre}</td>
              {mostrarPublicador && (
                <td>
                  {mascota.publicador.nombre} {mascota.publicador.apellido}
                </td>
              )}
              <td>
                <span className={`badge ${ESTADO_BADGE_CLASS[mascota.estado]}`}>
                  {ESTADO_LABELS[mascota.estado]}
                </span>
              </td>
              <td className="data-table-actions">
                <Link to={`/mascotas/${mascota.id}/editar`}>Editar</Link>
                <Button variant="danger" onClick={() => onDelete(mascota.id)}>
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
