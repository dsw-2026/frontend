import { Link } from 'react-router-dom'
import { EstadoSolicitud, type Solicitud } from '../../models/solicitud'
import { Button } from '../../components/ui/Button'
import { calcularDesglose } from './calcularDesglose'
import { totalCompatibilidad } from './compatibilidad'

interface SolicitudTableProps {
  solicitudes: Solicitud[]
  // La tabla es "tonta": no consulta el rol, lo recibe ya resuelto.
  puedeResolver: boolean
  puedeEliminar: boolean
  onAprobar: (id: number) => void
  onRechazar: (id: number) => void
  onDelete: (id: number) => void
}

const ESTADO_BADGE_CLASS: Record<EstadoSolicitud, string> = {
  PENDIENTE: 'badge-pending',
  APROBADA: 'badge-success',
  RECHAZADA: 'badge-pending',
}

const ESTADO_LABELS: Record<EstadoSolicitud, string> = {
  PENDIENTE: 'Pendiente',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada',
}

export function SolicitudTable({
  solicitudes,
  puedeResolver,
  puedeEliminar,
  onAprobar,
  onRechazar,
  onDelete,
}: SolicitudTableProps) {
  if (solicitudes.length === 0) {
    return <p className="empty-state">Todavía no hay solicitudes.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Adoptante</th>
            <th>Compatibilidad</th>
            <th>Estado</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => {
            // No hay ningún puntaje guardado: se recalcula acá mismo,
            // por cada fila, comparando los datos actuales.
            const { puntos, total, porcentaje } = totalCompatibilidad(calcularDesglose(solicitud))
            return (
              <tr key={solicitud.id}>
                <td>
                  {solicitud.mascota.nombre} ({solicitud.mascota.especie.nombre})
                </td>
                <td>
                  {solicitud.adoptante.nombre} {solicitud.adoptante.apellido}
                </td>
                <td>
                  {puntos}/{total} ({porcentaje}%)
                </td>
                <td>
                  <span className={`badge ${ESTADO_BADGE_CLASS[solicitud.estado]}`}>
                    {ESTADO_LABELS[solicitud.estado]}
                  </span>
                </td>
                <td className="data-table-actions">
                  <Link to={`/solicitudes/${solicitud.id}`}>Ver detalle</Link>
                  {puedeResolver && solicitud.estado === EstadoSolicitud.PENDIENTE && (
                    <>
                      <Button variant="primary" onClick={() => onAprobar(solicitud.id)}>
                        Aprobar
                      </Button>
                      <Button variant="secondary" onClick={() => onRechazar(solicitud.id)}>
                        Rechazar
                      </Button>
                    </>
                  )}
                  {puedeEliminar && (
                    <Button variant="danger" onClick={() => onDelete(solicitud.id)}>
                      Eliminar
                    </Button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
