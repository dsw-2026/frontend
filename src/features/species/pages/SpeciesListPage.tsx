import { Link } from 'react-router-dom'
import { useSpeciesList, useDeleteSpecies } from '../useSpecies'
import { SpeciesTable } from '../components/SpeciesTable'
import { ApiError } from '@/shared/api/httpClient'

export function SpeciesListPage() {
  const { data: species = [], isLoading, error } = useSpeciesList()
  const deleteSpecies = useDeleteSpecies()

  function handleDelete(id: number) {
    if (!window.confirm('¿Eliminar esta especie?')) return
    deleteSpecies.mutate(id, {
      onError: (err) => {
        window.alert(err instanceof ApiError ? err.message : 'No se pudo eliminar la especie')
      },
    })
  }

  const errorMessage = error instanceof ApiError ? error.message : error ? 'No se pudieron cargar las especies' : null

  return (
    <section className="space-y-6 p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Especies
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestiona las clasificaciones de animales de la plataforma.
          </p>
        </div>
        <Link
          to="/species/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          + Nueva especie
        </Link>
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

      {!isLoading && !errorMessage && <SpeciesTable species={species} onDelete={handleDelete} />}
    </section>
  )
}