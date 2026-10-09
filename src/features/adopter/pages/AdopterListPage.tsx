import { useAdopterList, useDeleteAdopter } from '../useAdopters'
import { AdopterTable } from '../components/AdopterTable'
import { ApiError } from '@/shared/api/httpClient'

export function AdopterListPage() {
  const { data: adopters = [], isLoading, error } = useAdopterList()
  const deleteAdopter = useDeleteAdopter()

  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar este adoptante?')) return
    deleteAdopter.mutate(id, {
      onError: (err) => window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar el adoptante'),
    })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar los adoptantes' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Adoptantes
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Personas que buscan adoptar.
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

      {!isLoading && !errorMessage && <AdopterTable adopters={adopters} onDelete={handleDelete} />}
    </section>
  )
}