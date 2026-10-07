// ApplicationTable.tsx
import { Link } from 'react-router-dom'
import { ApplicationStatus, type Application } from '../../../../models/application'
import { Button } from '../../../shared/ui/button/Button'
import { calculateBreakdown, totalCompatibility } from '../compatibility/compatibility'
import { STATUS_BADGE_CLASS, STATUS_LABELS } from './ApplicationTable.data'

interface ApplicationTableProps {
  applications: Application[]
  // La tabla es "tonta": no consulta el rol, lo recibe ya resuelto.
  canResolve: boolean
  canDelete: boolean
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onDelete: (id: number) => void
}

export function ApplicationTable({
  applications,
  canResolve,
  canDelete,
  onApprove,
  onReject,
  onDelete,
}: ApplicationTableProps) {
  if (applications.length === 0) {
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
          {applications.map((application) => {
            // No hay ningún puntaje guardado: se recalcula acá mismo, por
            // cada fila, comparando los datos actuales.
            const { points, total, percentage } = totalCompatibility(calculateBreakdown(application))
            return (
              <tr key={application.id}>
                <td>
                  {application.pet.name} ({application.pet.species.name})
                </td>
                <td>
                  {application.adopter.firstName} {application.adopter.lastName}
                </td>
                <td>
                  {points}/{total} ({percentage}%)
                </td>
                <td>
                  <span className={`badge ${STATUS_BADGE_CLASS[application.status]}`}>
                    {STATUS_LABELS[application.status]}
                  </span>
                </td>
                <td className="data-table-actions">
                  <Link to={`/applications/${application.id}`}>Ver detalle</Link>
                  {canResolve && application.status === ApplicationStatus.PENDING && (
                    <>
                      <Button variant="primary" onClick={() => onApprove(application.id)}>
                        Aprobar
                      </Button>
                      <Button variant="secondary" onClick={() => onReject(application.id)}>
                        Rechazar
                      </Button>
                    </>
                  )}
                  {canDelete && (
                    <Button variant="danger" onClick={() => onDelete(application.id)}>
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