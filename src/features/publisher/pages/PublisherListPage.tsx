import { usePublisherList, useDeletePublisher } from '../usePublishers'
import { PublisherTable } from '../components/PublisherTable'
import { ApiError } from '@/shared/api/httpClient'

export function PublisherListPage() {
  const { data: publishers = [], isLoading, error } = usePublisherList()
  const deletePublisher = useDeletePublisher()

  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar este publicador?')) return
    deletePublisher.mutate(id, {
      onError: (err) => window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el publicador'),
    })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar los publicadores' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header con soporte dark mode */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Publicadores
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Refugios, rescatistas y hogares de tránsito.
        </p>
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
        <PublisherTable publishers={publishers} onDelete={handleDelete} />
      )}
    </section>
  )
}