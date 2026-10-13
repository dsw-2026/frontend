import { Link } from 'react-router-dom'
import { useApplicationList, useApproveApplication, useRejectApplication, useDeleteApplication } from '../useApplications'
import { ApplicationTable } from '../components/ApplicationTable'
import { ApiError } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'
import { ApplicationStatus } from '../application.model.ts'
import { useState } from 'react'

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  REJECTED: 'Rechazada',
}

export function ApplicationListPage() {
  const { user } = useAuth()
  const isAdopter = user?.userType === 'Adopter'
  const isPublisher = user?.userType === 'Publisher'
  const isAdmin = user?.userType === 'Admin'
  const [status, setStatus] = useState<ApplicationStatus | undefined>()

  const { data: applications = [], isLoading, error } = useApplicationList()
  const filtered = status ? applications.filter((a) => a.status === status) : applications
  const approve = useApproveApplication()
  const reject = useRejectApplication()
  const remove = useDeleteApplication()

  const alertError = (err: unknown, fallback: string) =>
    window.alert(err instanceof ApiError ? err.message : fallback)

  function handleApprove(id: number) {
    approve.mutate(id, { onError: (err) => alertError(err, 'No se pudo aprobar la solicitud') })
  }
  function handleReject(id: number) {
    reject.mutate(id, { onError: (err) => alertError(err, 'No se pudo rechazar la solicitud') })
  }
  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta solicitud?')) return
    remove.mutate(id, { onError: (err) => alertError(err, 'No se pudo eliminar la solicitud') })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las solicitudes' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Solicitudes
        </h1>
        {isAdopter && (
          <Link
            to="/applications/new"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
          >
            + Nueva solicitud
          </Link>
          
        )}
      </div>
        <select
          value={status ?? ''}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          className="px-3 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700"
        >
          <option value="">Todos los estados</option>
          {Object.values(ApplicationStatus).map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      {isLoading && (
        <div className="text-center py-10 text-slate-500 dark:text-slate-400 font-medium">
          Cargando…
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-sm rounded-lg font-medium">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && (
        <ApplicationTable
          applications={filtered}
          canResolve={isPublisher}
          canDelete={!isAdmin}
          onApprove={handleApprove}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}