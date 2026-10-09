import { Link } from 'react-router-dom'
import { useApplicationList, useApproveApplication, useRejectApplication, useDeleteApplication } from '../useApplications'
import { ApplicationTable } from '../components/ApplicationTable'
import { ApiError } from '@/shared/api/httpClient'
import { useAuth } from '@/shared/api/useAuth'

export function ApplicationListPage() {
  const { user } = useAuth()
  const isAdopter = user?.userType === 'Adopter'
  const isPublisher = user?.userType === 'Publisher'
  const isAdmin = user?.userType === 'Admin'

  const { data: applications = [], isLoading, error } = useApplicationList()
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
          applications={applications}
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