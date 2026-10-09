import { Link } from 'react-router-dom'
import { ApplicationStatus, type Application } from '../application.model'
import { calculateBreakdown, totalCompatibility } from '../compatibility'

interface ApplicationTableProps {
  applications: Application[]
  canResolve: boolean
  canDelete: boolean
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onDelete: (id: number) => void
}

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}

const STATUS_CLASS: Record<ApplicationStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/40',
  APPROVED: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800/40',
  REJECTED: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
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
    return (
      <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 font-medium">Todavía no hay solicitudes.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-300">
        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-4 sm:px-6 py-3">Mascota</th>
            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Adoptante</th>
            <th className="px-4 sm:px-6 py-3 hidden md:table-cell">Compatibilidad</th>
            <th className="px-4 sm:px-6 py-3 hidden sm:table-cell">Estado</th>
            <th className="px-4 sm:px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {applications.map((app) => {
            const { points, total, percentage } = totalCompatibility(calculateBreakdown(app))
            return (
              <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-4 sm:px-6 py-3">
                  <div className="font-medium text-slate-900 dark:text-slate-100">{app.pet.name}</div>
                  <div className="sm:hidden text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {app.adopter.firstName} {app.adopter.lastName} • {percentage}%
                  </div>
                </td>

                <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell text-slate-700 dark:text-slate-300">
                  {app.adopter.firstName} {app.adopter.lastName}
                </td>

                <td className="px-4 sm:px-6 py-3.5 hidden md:table-cell">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{percentage}%</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">{points}/{total} pts</span>
                </td>

                <td className="px-4 sm:px-6 py-3.5 hidden sm:table-cell whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border border-transparent ${STATUS_CLASS[app.status]}`}>
                    {STATUS_LABELS[app.status]}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center justify-end gap-1.5">
                    <Link
                      to={`/applications/${app.id}`}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                      Detalle
                    </Link>
                    {canResolve && app.status === ApplicationStatus.PENDING && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(app.id)}
                          className="px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-md transition-colors"
                        >
                          Aprobar
                        </button>
                        <button
                          type="button"
                          onClick={() => onReject(app.id)}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(app.id)}
                        className="px-2.5 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}